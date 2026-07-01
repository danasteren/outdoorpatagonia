import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, MapPin, Calendar, Eye } from "lucide-react"
import { cache } from "react"
import { createClient as createBuildClient } from "@supabase/supabase-js"
import {
  FAUNA_CATALOG,
  getFaunaEntry,
  CATEGORY_LABELS,
} from "@/lib/fauna/catalog"
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
import { Breadcrumb } from "@/components/primitives/Breadcrumb"
import { ArticleLayout } from "@/components/ArticleLayout"
import { toCategorySlug } from "@/lib/category"

export const revalidate = 3600
// On-demand rendering for species not pre-built
export const dynamicParams = true

// ─── Fauna article helpers ────────────────────────────────────────────────────

function buildClient() {
  return createBuildClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const getFaunaArticle = cache(async (slug: string) => {
  const { data } = await buildClient()
    .from("articles")
    .select(
      "title, excerpt, content, category, tags, reading_time_min, published_at, cover_image_url, language, slug, seo_title, seo_description"
    )
    .eq("slug", slug)
    .eq("language", "es")
    .eq("status", "published")
    .maybeSingle()
  if (!data || toCategorySlug(data.category ?? "") !== "fauna") return null
  return data
})

async function getAltLangFaunaArticle(slug: string) {
  const { data } = await buildClient()
    .from("articles")
    .select("slug, category")
    .eq("slug", slug)
    .eq("language", "en")
    .eq("status", "published")
    .maybeSingle()
  return data
}

// ─── generateStaticParams: pre-build known species + fauna articles ───────────

export async function generateStaticParams() {
  const { data } = await buildClient()
    .from("articles")
    .select("slug, category")
    .eq("language", "es")
    .eq("status", "published")

  const faunaArticleSlugs = (data ?? [])
    .filter((a) => toCategorySlug(a.category ?? "") === "fauna")
    .map((a) => ({ especie: a.slug }))

  return [
    ...FAUNA_CATALOG.map((e) => ({ especie: e.slug })),
    ...faunaArticleSlugs,
  ]
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ especie: string }>
}): Promise<Metadata> {
  const { especie } = await params

  const faunaArticle = await getFaunaArticle(especie)
  if (faunaArticle) {
    const canonicalUrl = `https://outdoorpatagonia.com/fauna/${especie}`
    return {
      title: faunaArticle.seo_title || faunaArticle.title,
      description: faunaArticle.seo_description || faunaArticle.excerpt || undefined,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: faunaArticle.seo_title || faunaArticle.title,
        description: faunaArticle.seo_description || faunaArticle.excerpt || undefined,
        url: canonicalUrl,
        images: faunaArticle.cover_image_url ? [faunaArticle.cover_image_url] : [],
        locale: "es_AR",
        type: "article",
      },
    }
  }

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

  // Catalog species always get the live data page — never fall back to old articles
  const isCatalogSpecies = !!getFaunaEntry(especie)

  // Only check for a Supabase article when the slug is NOT a known catalog entry
  const faunaArticle = isCatalogSpecies ? null : await getFaunaArticle(especie)
  if (faunaArticle) {
    const altLang = await getAltLangFaunaArticle(especie)
    const altLangHref = altLang
      ? `/en/${toCategorySlug(altLang.category ?? "")}/${especie}`
      : null
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: faunaArticle.title,
      description: faunaArticle.excerpt ?? undefined,
      image: faunaArticle.cover_image_url ?? undefined,
      datePublished: faunaArticle.published_at ?? undefined,
      inLanguage: "es",
      author: { "@type": "Organization", name: "Outdoor Patagonia" },
      publisher: { "@type": "Organization", name: "Outdoor Patagonia", url: "https://outdoorpatagonia.com" },
      url: `https://outdoorpatagonia.com/fauna/${especie}`,
    }
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ArticleLayout article={faunaArticle} altLangHref={altLangHref} />
      </>
    )
  }

  const entry = getFaunaEntry(especie)

  // Fetch species detail: by taxonId from catalog, or by name search for on-demand slugs
  const detail = entry
    ? await fetchSpeciesDetail(entry.taxonId)
    : await fetchSpeciesByName(especie.replace(/-/g, " "))

  if (!detail && !entry) notFound()

  const resolvedDetail = detail
  const commonName =
    resolvedDetail?.commonNameEs ?? entry?.commonNameEs ?? especie.replace(/-/g, " ")
  const scientificName =
    resolvedDetail?.scientificName ?? entry?.scientificName ?? especie
  const taxonId = resolvedDetail?.taxonId ?? entry?.taxonId

  // Parallel data fetches — sightings, histogram, and GBIF taxonomy
  const [sightings, histogram, gbif] = await Promise.all([
    taxonId ? fetchSpeciesSightingsPatagonia(taxonId, 20) : Promise.resolve([]),
    taxonId ? fetchSpeciesMonthlyHistogram(taxonId) : Promise.resolve({} as Record<string, number>),
    fetchGbifByScientificName(scientificName),
  ])

  const heroImage = resolvedDetail?.largeImageUrl ?? resolvedDetail?.imageUrl
  const categoryLabel = entry
    ? CATEGORY_LABELS[entry.category]
    : null

  // IUCN: prefer iNaturalist (more granular), fall back to GBIF
  const conservationCode =
    resolvedDetail?.conservationStatusCode ??
    gbif?.iucnRedListCategory?.toLowerCase() ??
    null
  const conservation = conservationCode
    ? CONSERVATION_LABELS[conservationCode]
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
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Fauna", href: "/fauna" },
                { label: commonName },
              ]}
            />
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
                <p
                  className="text-muted-foreground leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: resolvedDetail.description }}
                />
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

            {/* Taxonomy from GBIF */}
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
                <div className="flex items-end gap-1.5 h-20 bg-[var(--color-cream)] rounded-md px-2 pt-3">
                  {monthBars.map(({ label, count }) => {
                    const heightPct = Math.round((count / maxCount) * 100)
                    return (
                      <div
                        key={label}
                        className="flex-1 h-full flex flex-col justify-end"
                        title={`${label}: ${count} avistamientos`}
                      >
                        <div
                          className="w-full rounded-t-sm transition-all duration-300"
                          style={{
                            height: `${Math.max(heightPct, count > 0 ? 6 : 2)}%`,
                            backgroundColor: "var(--color-teal)",
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

          {/* Right: map + recent sightings */}
          <div className="lg:col-span-3 space-y-8">

            {/* Sightings map */}
            <section>
              <h2 className="text-xl font-bold mb-3">
                Avistamientos recientes
              </h2>
              <div className="h-72 rounded-xl overflow-hidden border border-border isolate">
                <FaunaSightingsMapClient sightings={sightings} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Observaciones con grado de investigación en iNaturalist · Patagonia argentina y chilena
              </p>
            </section>

            {/* Sightings list */}
            <FaunaSightingsClient sightings={sightings} taxonId={taxonId} />
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
