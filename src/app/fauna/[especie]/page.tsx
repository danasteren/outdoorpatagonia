import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, MapPin, Calendar, Eye } from "lucide-react"
import {
  FAUNA_CATALOG,
  getFaunaEntry,
  CATEGORY_LABELS,
} from "@/lib/fauna/catalog"
import {
  fetchSpeciesDetail,
  fetchSpeciesSightingsPatagonia,
  fetchSpeciesMonthlyHistogram,
} from "@/lib/apis/inaturalist"
import { FaunaSightingsMapClient } from "@/components/data/FaunaSightingsMapClient"
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"

export const revalidate = 3600
// On-demand rendering for species not pre-built
export const dynamicParams = true

// ─── generateStaticParams: pre-build known species ───────────────────────────

export function generateStaticParams() {
  return FAUNA_CATALOG.map((e) => ({ especie: e.slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ especie: string }>
}): Promise<Metadata> {
  const { especie } = await params
  const entry = getFaunaEntry(especie)
  const name = entry?.commonNameEs ?? especie.replace(/-/g, " ")
  const sci = entry?.scientificName ?? ""

  return {
    title: `${name} — Fauna de la Patagonia | Outdoor Patagonia`,
    description: `Dónde ver ${name} (${sci}) en la Patagonia: avistamientos recientes, temporada y parques nacionales.`,
    alternates: {
      canonical: `https://outdoorpatagonia.com/fauna/${especie}`,
    },
    openGraph: {
      title: `${name} en la Patagonia`,
      description: `Avistamientos recientes, temporada y dónde ver ${name} en parques de la Patagonia.`,
      type: "article",
    },
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
]

const CONSERVATION_LABELS: Record<string, { label: string; color: string }> = {
  lc: { label: "Preocupación menor", color: "text-green-600" },
  nt: { label: "Casi amenazada", color: "text-yellow-600" },
  vu: { label: "Vulnerable", color: "text-orange-500" },
  en: { label: "En peligro", color: "text-red-500" },
  cr: { label: "En peligro crítico", color: "text-red-700" },
  ew: { label: "Extinta en estado silvestre", color: "text-gray-500" },
  ex: { label: "Extinta", color: "text-gray-700" },
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function FaunaEspeciePage({
  params,
}: {
  params: Promise<{ especie: string }>
}) {
  const { especie } = await params
  const entry = getFaunaEntry(especie)

  // Fetch species detail (use catalog taxonId if known, else slug as search query)
  const detail = entry
    ? await fetchSpeciesDetail(entry.taxonId)
    : null

  if (!detail && !entry) notFound()

  const resolvedDetail = detail
  const commonName =
    resolvedDetail?.commonNameEs ?? entry?.commonNameEs ?? especie.replace(/-/g, " ")
  const scientificName =
    resolvedDetail?.scientificName ?? entry?.scientificName ?? especie
  const taxonId = resolvedDetail?.taxonId ?? entry?.taxonId

  // Parallel data fetches — sightings and histogram
  const [sightings, histogram] = await Promise.all([
    taxonId ? fetchSpeciesSightingsPatagonia(taxonId, 20) : Promise.resolve([]),
    taxonId ? fetchSpeciesMonthlyHistogram(taxonId) : Promise.resolve({} as Record<string, number>),
  ])

  const heroImage = resolvedDetail?.largeImageUrl ?? resolvedDetail?.imageUrl
  const categoryLabel = entry
    ? CATEGORY_LABELS[entry.category]
    : null
  const conservation = resolvedDetail?.conservationStatusCode
    ? CONSERVATION_LABELS[resolvedDetail.conservationStatusCode.toLowerCase()]
    : null

  // Month histogram data (1-12 keys)
  const maxCount = Math.max(...Object.values(histogram), 1)
  const monthBars = MONTHS_ES.map((label, i) => ({
    label,
    count: histogram[String(i + 1)] ?? 0,
  }))

  const lastSighting = sightings[0]?.observedOn ?? null
  const totalSightings = sightings.length

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt={commonName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-forest)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {categoryLabel && (
                <Badge variant="category" size="sm">
                  {categoryLabel}
                </Badge>
              )}
              {conservation && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 ${conservation.color}`}
                >
                  {conservation.label}
                </span>
              )}
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {commonName}
            </h1>
            <p className="text-white/70 italic text-lg mt-1">{scientificName}</p>
          </div>
        </div>
      </div>

      {/* Quick stats strip */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 opacity-60" />
            <span className="opacity-60">Avistamientos en Patagonia:</span>
            <span className="font-bold">{totalSightings > 0 ? `${totalSightings}+` : "Sin datos recientes"}</span>
          </div>
          {lastSighting && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-60" />
              <span className="opacity-60">Último avistamiento:</span>
              <span className="font-bold">{formatDate(lastSighting)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: description + parks + links */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            {resolvedDetail?.description && (
              <section>
                <h2 className="text-xl font-bold mb-3">
                  Sobre el {commonName.toLowerCase()}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {resolvedDetail.description}
                </p>
                {resolvedDetail.wikipediaUrl && (
                  <a
                    href={resolvedDetail.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-teal)] hover:underline mt-2"
                  >
                    Leer más en Wikipedia
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </section>
            )}

            {/* Parks */}
            {entry && entry.parquesRelacionados.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">
                  Dónde verlo en la Patagonia
                </h2>
                <div className="space-y-2">
                  {entry.parquesRelacionados.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/parques/${p.slug}`}
                      className="flex items-center gap-2 group"
                    >
                      <MapPin className="w-4 h-4 text-[var(--color-terracotta)] shrink-0" />
                      <span className="text-sm group-hover:text-[var(--color-terracotta)] transition-colors">
                        {p.nombre}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* External links */}
            {taxonId && (
              <section>
                <h2 className="text-xl font-bold mb-3">Más información</h2>
                <div className="space-y-2">
                  <a
                    href={`https://www.inaturalist.org/taxa/${taxonId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    iNaturalist — observaciones globales
                  </a>
                  {entry?.gbifKey && (
                    <a
                      href={`https://www.gbif.org/species/${entry.gbifKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      GBIF — distribución global
                    </a>
                  )}
                  {resolvedDetail?.wikipediaUrl && (
                    <a
                      href={resolvedDetail.wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Wikipedia
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Season chart */}
            {Object.keys(histogram).length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-1">Temporada de avistamiento</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Observaciones registradas en la Patagonia por mes
                </p>
                <div className="flex items-end gap-1 h-16">
                  {monthBars.map(({ label, count }) => {
                    const heightPct = Math.round((count / maxCount) * 100)
                    return (
                      <div
                        key={label}
                        className="flex flex-col items-center flex-1 gap-1"
                      >
                        <div
                          className="w-full rounded-t-sm transition-all duration-300"
                          style={{
                            height: `${Math.max(heightPct, 4)}%`,
                            backgroundColor:
                              heightPct > 60
                                ? "var(--color-teal)"
                                : heightPct > 30
                                  ? "var(--color-forest)"
                                  : "var(--color-forest, #2d5a3d)",
                            opacity: Math.max(0.3, heightPct / 100),
                          }}
                          title={`${label}: ${count} avistamientos`}
                        />
                        <span className="text-[9px] text-muted-foreground">
                          {label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right: map + recent sightings */}
          <div className="lg:col-span-3 space-y-8">

            {/* Sightings map */}
            <section>
              <h2 className="text-xl font-bold mb-3">
                Avistamientos recientes
              </h2>
              <div className="h-72 rounded-xl overflow-hidden border border-border">
                <FaunaSightingsMapClient sightings={sightings} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Observaciones con grado de investigación en iNaturalist · Patagonia argentina y chilena
              </p>
            </section>

            {/* Sightings list */}
            {sightings.length > 0 ? (
              <section>
                <h2 className="text-xl font-bold mb-3">Últimas observaciones</h2>
                <div className="space-y-3">
                  {sightings.slice(0, 8).map((s) => (
                    <Card key={s.id} variant="default">
                      <CardBody className="p-3 flex gap-3 items-start">
                        {s.imageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.imageUrl}
                            alt={s.commonName ?? s.speciesName}
                            className="w-14 h-14 object-cover rounded-lg shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              {s.placeGuess && (
                                <p className="text-sm font-medium leading-snug truncate">
                                  {s.placeGuess}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {formatDate(s.observedOn)} · @{s.observerLogin}
                              </p>
                            </div>
                            <a
                              href={s.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 text-muted-foreground hover:text-foreground"
                              aria-label="Ver en iNaturalist"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
                {taxonId && (
                  <a
                    href={`https://www.inaturalist.org/observations?taxon_id=${taxonId}&place_id=7161`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm text-[var(--color-teal)] hover:underline"
                  >
                    Ver todas las observaciones en Patagonia
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </section>
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm">
                <p>No hay avistamientos recientes registrados en la Patagonia.</p>
                {taxonId && (
                  <a
                    href={`https://www.inaturalist.org/taxa/${taxonId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-teal)] hover:underline mt-2 inline-block"
                  >
                    Ver en iNaturalist
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: "https://outdoorpatagonia.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Fauna",
                item: "https://outdoorpatagonia.com/fauna",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: commonName,
                item: `https://outdoorpatagonia.com/fauna/${especie}`,
              },
            ],
          }),
        }}
      />
    </div>
  )
}
