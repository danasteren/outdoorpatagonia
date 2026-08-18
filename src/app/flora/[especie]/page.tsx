import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, MapPin, Calendar, Eye, Leaf } from "lucide-react"
import { DetailHero } from "@/components/DetailHero"
import {
  FLORA_CATALOG,
  type FloraCategory,
  getFloraEntry,
  CATEGORY_LABELS,
} from "@/lib/flora/catalog"
import { RelatedContent } from "@/components/RelatedContent"
import { ProductosRecomendados } from "@/components/ProductosRecomendados"
import { truncateAtWord } from "@/lib/text"
import {
  fetchSpeciesDetail,
  fetchSpeciesByName,
  fetchSpeciesSightingsPatagonia,
  fetchSpeciesMonthlyHistogram,
} from "@/lib/apis/inaturalist"
import { fetchGbifByScientificName } from "@/lib/apis/gbif"
import { FaunaSightingsMapClient } from "@/components/data/FaunaSightingsMapClient"
import { FaunaSightingsClient } from "@/components/data/FaunaSightingsClient"
import { Badge } from "@/components/primitives/Badge"

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return FLORA_CATALOG.map((e) => ({ especie: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ especie: string }>
}): Promise<Metadata> {
  const { especie } = await params
  const entry = getFloraEntry(especie)
  const name = entry?.commonNameEs ?? especie.replace(/-/g, " ")
  const sci = entry?.scientificName ?? ""
  const parksText = entry && entry.parquesRelacionados.length > 0
    ? entry.parquesRelacionados.map((p) => p.nombre).join(", ")
    : null

  const description = truncateAtWord(
    parksText
      ? `Dónde encontrar ${name} (${sci}) en la Patagonia: en ${parksText}. Observaciones recientes y temporada de floración.`
      : `Dónde encontrar ${name} (${sci}) en la Patagonia: observaciones recientes, temporada de floración y parques nacionales.`,
    160
  )

  return {
    title: `${name} — Flora de la Patagonia | Outdoor Patagonia`,
    description,
    alternates: {
      canonical: `https://outdoorpatagonia.com/flora/${especie}`,
    },
    openGraph: {
      title: `${name} en la Patagonia`,
      description: `Observaciones recientes, temporada y dónde encontrar ${name} en la Patagonia.`,
      type: "article",
    },
  }
}

const FLORA_CATEGORY_PLURAL: Record<FloraCategory, string> = {
  arbol: "Árboles",
  arbusto: "Arbustos",
  "herbácea": "Herbáceas",
  enredadera: "Enredaderas",
}

const FLORA_CATEGORY_ARTICLE: Record<FloraCategory, string> = {
  arbol: "un árbol",
  arbusto: "un arbusto",
  "herbácea": "una herbácea",
  enredadera: "una enredadera",
}

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

export default async function FloraEspeciePage({
  params,
}: {
  params: Promise<{ especie: string }>
}) {
  const { especie } = await params
  const entry = getFloraEntry(especie)

  const detail = entry?.taxonId
    ? await fetchSpeciesDetail(entry.taxonId)
    : await fetchSpeciesByName(entry?.scientificName ?? especie.replace(/-/g, " "))

  if (!detail && !entry) notFound()

  const commonName = entry?.commonNameEs ?? detail?.commonNameEs ?? especie.replace(/-/g, " ")
  const scientificName = detail?.scientificName ?? entry?.scientificName ?? especie
  const taxonId = detail?.taxonId ?? entry?.taxonId

  const [sightings, histogram, gbif] = await Promise.all([
    taxonId ? fetchSpeciesSightingsPatagonia(taxonId, 20) : Promise.resolve([]),
    taxonId ? fetchSpeciesMonthlyHistogram(taxonId) : Promise.resolve({} as Record<string, number>),
    fetchGbifByScientificName(scientificName),
  ])

  const heroImage = detail?.largeImageUrl ?? detail?.imageUrl
  const categoryLabel = entry ? CATEGORY_LABELS[entry.category] : null

  const conservationCode =
    detail?.conservationStatusCode ??
    gbif?.iucnRedListCategory?.toLowerCase() ??
    null
  const conservation = conservationCode ? CONSERVATION_LABELS[conservationCode] : null

  const maxCount = Math.max(...Object.values(histogram), 1)
  const monthBars = MONTHS_ES.map((label, i) => ({
    label,
    count: histogram[String(i + 1)] ?? 0,
  }))

  const lastSighting = sightings[0]?.observedOn ?? null
  const totalSightings = sightings.length

  const faqItems: Array<{ question: string; answer: string }> = []
  if (entry && entry.parquesRelacionados.length > 0) {
    const parksText = entry.parquesRelacionados.map((p) => p.nombre).join(", ")
    faqItems.push({
      question: `¿Dónde encontrar ${commonName} en la Patagonia?`,
      answer: `${commonName} se puede encontrar en ${parksText}.`,
    })
  }
  faqItems.push({
    question: `¿Cuál es el nombre científico de ${commonName}?`,
    answer: `El nombre científico de ${commonName} es ${scientificName}.`,
  })
  if (entry && categoryLabel) {
    faqItems.push({
      question: `¿Qué tipo de planta es ${commonName}?`,
      answer: `${commonName} es ${FLORA_CATEGORY_ARTICLE[entry.category]} nativo de la Patagonia.`,
    })
  }
  if (conservation) {
    faqItems.push({
      question: `¿Está ${commonName} en peligro?`,
      answer: `Según la Lista Roja de la UICN, ${commonName} (${scientificName}) está clasificado como "${conservation.label}".`,
    })
  }

  const relatedEntries = entry
    ? FLORA_CATALOG.filter((e) => e.slug !== especie && e.category === entry.category).slice(0, 6)
    : []

  return (
    <div className="min-h-screen">
      <DetailHero
        image={heroImage ? { url: heroImage, alt: commonName } : null}
        fallbackGradient="var(--color-forest)"
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Flora", href: "/flora" },
          { label: commonName },
        ]}
        icon={Leaf}
        eyebrow={categoryLabel ?? "Flora"}
        title={commonName}
        subtitle={<p className="italic">{scientificName}</p>}
        save={{ slug: especie, title: commonName, category: "flora" }}
      />

      {/* Quick stats */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 opacity-60" />
            <span className="opacity-60">Observaciones en Patagonia:</span>
            <span className="font-bold">{totalSightings > 0 ? `${totalSightings}+` : "Sin datos recientes"}</span>
          </div>
          {lastSighting && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-60" />
              <span className="opacity-60">Última observación:</span>
              <span className="font-bold">{formatDate(lastSighting)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {(categoryLabel || conservation) && (
              <div className="flex flex-wrap items-center gap-2">
                {categoryLabel && (
                  <Badge variant="category" size="sm">
                    {categoryLabel}
                  </Badge>
                )}
                {conservation && (
                  <Badge variant="outline" size="sm" className={conservation.color}>
                    {conservation.label}
                  </Badge>
                )}
              </div>
            )}

            {detail?.description && (
              <section>
                <h2 className="text-xl font-bold mb-3">
                  Sobre {entry?.genero === "f" ? "la" : "el"} {commonName}
                </h2>
                <p
                  className="text-muted-foreground leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: detail.description }}
                />
                {detail.wikipediaUrl && (
                  <a
                    href={detail.wikipediaUrl}
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

            {gbif && (gbif.order ?? gbif.family ?? gbif.class) && (
              <section>
                <h2 className="text-xl font-bold mb-3">Clasificación</h2>
                <dl className="space-y-1.5 text-sm">
                  {gbif.class && (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-20 shrink-0">Clase</dt>
                      <dd className="font-medium italic">{gbif.class}</dd>
                    </div>
                  )}
                  {gbif.order && (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-20 shrink-0">Orden</dt>
                      <dd className="font-medium italic">{gbif.order}</dd>
                    </div>
                  )}
                  {gbif.family && (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-20 shrink-0">Familia</dt>
                      <dd className="font-medium italic">{gbif.family}</dd>
                    </div>
                  )}
                </dl>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Fuente: GBIF · usageKey {gbif.usageKey}
                </p>
              </section>
            )}

            {entry && entry.parquesRelacionados.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">Dónde encontrarla</h2>
                <div className="space-y-2">
                  {entry.parquesRelacionados.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/parques/${p.slug}`}
                      className="flex items-center gap-2 group"
                    >
                      <MapPin className="w-4 h-4 text-[var(--color-teal)] shrink-0" />
                      <span className="text-sm group-hover:text-[var(--color-teal)] transition-colors">
                        {p.nombre}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {entry?.productosRecomendados && (
              <ProductosRecomendados items={entry.productosRecomendados} />
            )}

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
                  {gbif?.usageKey && (
                    <a
                      href={`https://www.gbif.org/species/${gbif.usageKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      GBIF — distribución global
                    </a>
                  )}
                  {detail?.wikipediaUrl && (
                    <a
                      href={detail.wikipediaUrl}
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

            {Object.keys(histogram).length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-1">Temporada</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Observaciones registradas en la Patagonia por mes
                </p>
                <div className="flex items-end gap-1.5 h-20 bg-[var(--color-cream)] rounded-md px-2 pt-3">
                  {monthBars.map(({ label, count }) => {
                    const heightPct = Math.round((count / maxCount) * 100)
                    return (
                      <div
                        key={label}
                        className="flex-1 h-full flex flex-col justify-end"
                        title={`${label}: ${count} observaciones`}
                      >
                        <div
                          className="w-full rounded-t-sm transition-all duration-300"
                          style={{
                            height: `${Math.max(heightPct, count > 0 ? 6 : 2)}%`,
                            backgroundColor:
                              heightPct > 60
                                ? "var(--color-teal)"
                                : "var(--color-forest)",
                            opacity: count > 0 ? Math.max(0.35, heightPct / 100) : 0.15,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-1.5 px-2 mt-1">
                  {monthBars.map(({ label }) => (
                    <span
                      key={label}
                      className="flex-1 text-center text-[9px] text-muted-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right column: map + observations */}
          <div className="lg:col-span-3 space-y-8">

            <section>
              <h2 className="text-xl font-bold mb-3">Observaciones recientes</h2>
              <div className="h-72 rounded-xl overflow-hidden border border-border isolate">
                <FaunaSightingsMapClient sightings={sightings} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Observaciones con grado de investigación en iNaturalist · Patagonia argentina y chilena
              </p>
            </section>

            <FaunaSightingsClient sightings={sightings} taxonId={taxonId} />
          </div>
        </div>
      </div>

      {/* Related flora (same category) */}
      {entry && relatedEntries.length > 0 && (
        <RelatedContent
          heading={`Más ${FLORA_CATEGORY_PLURAL[entry.category]} en la Patagonia`}
          items={relatedEntries.map((e) => ({
            name: e.commonNameEs,
            scientificName: e.scientificName,
            categoryLabel: CATEGORY_LABELS[e.category],
            href: `/flora/${e.slug}`,
          }))}
          seeAllHref="/flora"
          seeAllLabel="Ver toda la flora"
        />
      )}

      {/* FAQPage JSON-LD */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://outdoorpatagonia.com" },
              { "@type": "ListItem", position: 2, name: "Flora", item: "https://outdoorpatagonia.com/flora" },
              { "@type": "ListItem", position: 3, name: commonName, item: `https://outdoorpatagonia.com/flora/${especie}` },
            ],
          }),
        }}
      />
    </div>
  )
}
