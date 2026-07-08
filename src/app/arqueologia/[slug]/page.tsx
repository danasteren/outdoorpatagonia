import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Bone, Footprints, HandMetal, Layers, ExternalLink, ChevronLeft } from "lucide-react"
import {
  ARQUEOLOGIA_CATALOG,
  getArqueologiaEntry,
  CATEGORIA_LABELS,
  type ArqueologiaCategoria,
} from "@/lib/arqueologia/catalog"
import { fetchWikipediaLeadImage } from "@/lib/apis/wikipedia"
import { Card, CardBody } from "@/components/primitives/Card"
import { DetailHero } from "@/components/DetailHero"

export const revalidate = 86400
export const dynamicParams = false

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ARQUEOLOGIA_CATALOG.map((e) => ({ slug: e.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getArqueologiaEntry(slug)
  if (!entry) return {}

  const firstSentence = entry.descripcion[0].split(". ")[0]
  const description = `${firstSentence}. ${entry.provincia} (${entry.pais === "CL" ? "Chile" : entry.pais === "CL/AR" ? "Chile/Argentina" : "Argentina"}), ${entry.era}.`.slice(0, 160)

  return {
    title: `${entry.nombre} — ${CATEGORIA_LABELS[entry.categoria]} de la Patagonia`,
    description,
    alternates: {
      canonical: `https://outdoorpatagonia.com/arqueologia/${slug}`,
    },
    openGraph: {
      title: `${entry.nombre} | Outdoor Patagonia`,
      description,
      url: `https://outdoorpatagonia.com/arqueologia/${slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  }
}

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIA_ICON: Record<ArqueologiaCategoria, typeof Bone> = {
  dinosaurio: Bone,
  fosil: Layers,
  humano: Footprints,
  petroglifo: HandMetal,
}

const CATEGORIA_HERO: Record<ArqueologiaCategoria, string> = {
  dinosaurio: "linear-gradient(135deg, #3d2200 0%, #6b3a00 60%, #3d2200 100%)",
  fosil: "linear-gradient(135deg, #1a1f2e 0%, #2d3a52 60%, #1a1f2e 100%)",
  humano: "linear-gradient(135deg, #0a2e2e 0%, #0d4040 60%, #0a2e2e 100%)",
  petroglifo: "linear-gradient(135deg, #1e0a3d 0%, #3a1670 60%, #1e0a3d 100%)",
}

const CATEGORIA_BADGE: Record<ArqueologiaCategoria, string> = {
  dinosaurio: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  fosil: "bg-slate-500/10 text-slate-700 border-slate-500/30",
  humano: "bg-[var(--color-teal)]/10 text-[var(--color-teal)] border-[var(--color-teal)]/30",
  petroglifo: "bg-violet-500/10 text-violet-700 border-violet-500/30",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArqueologiaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getArqueologiaEntry(slug)
  if (!entry) notFound()

  const wikiImage = await fetchWikipediaLeadImage(entry.wikipediaTitle)

  const CatIcon = CATEGORIA_ICON[entry.categoria]
  const heroGradient = CATEGORIA_HERO[entry.categoria]
  const badgeClass = CATEGORIA_BADGE[entry.categoria]

  const paisLabel =
    entry.pais === "CL/AR" ? "Chile / Argentina" :
    entry.pais === "CL" ? "Chile" : "Argentina"

  const isTouristSite = entry.categoria === "humano" || entry.categoria === "petroglifo"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isTouristSite ? "TouristDestination" : "Article",
    name: entry.nombre,
    description: entry.descripcion[0],
    url: `https://outdoorpatagonia.com/arqueologia/${slug}`,
    ...(isTouristSite && {
      geo: { "@type": "GeoCoordinates", latitude: entry.lat, longitude: entry.lng },
      touristType: { "@type": "Audience", audienceType: "cultural tourism, paleontology" },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: entry.provincia,
        containedInPlace: { "@type": "Country", name: entry.pais === "CL" ? "Chile" : "Argentina" },
      },
    }),
    ...(!isTouristSite && {
      about: {
        "@type": "Thing",
        name: entry.nombreCientifico ?? entry.nombre,
        description: `${CATEGORIA_LABELS[entry.categoria]} de la Patagonia — ${entry.era}`,
      },
      spatialCoverage: {
        "@type": "Place",
        name: entry.provincia,
        geo: { "@type": "GeoCoordinates", latitude: entry.lat, longitude: entry.lng },
      },
    }),
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faq.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  }

  const relatedEntries = ARQUEOLOGIA_CATALOG.filter(
    (e) => e.categoria === entry.categoria && e.slug !== slug
  ).slice(0, 3)

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <DetailHero
        image={wikiImage ? { url: wikiImage.url, alt: entry.nombre, credit: "Wikipedia", creditUrl: wikiImage.pageUrl } : null}
        fallbackGradient={heroGradient}
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Arqueología", href: "/arqueologia" },
          { label: entry.nombre },
        ]}
        icon={CatIcon}
        eyebrow={CATEGORIA_LABELS[entry.categoria]}
        title={entry.nombre}
        subtitle={
          <>
            {entry.nombreCientifico && <p className="italic">{entry.nombreCientifico}</p>}
            <p className="mt-1">{paisLabel} · {entry.provincia} · {entry.era}</p>
          </>
        }
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">

            {/* Descripción */}
            <div className="prose prose-sm max-w-none space-y-4">
              {entry.descripcion.map((p, i) => (
                <p key={i} className="text-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* FAQ */}
            {entry.faq.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Preguntas frecuentes</h2>
                <div className="space-y-4">
                  {entry.faq.map((f, i) => (
                    <Card key={i} variant="default">
                      <CardBody>
                        <p className="font-semibold text-sm mb-2">{f.pregunta}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.respuesta}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Otros en la misma categoría */}
            {relatedEntries.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4">
                  Más {CATEGORIA_LABELS[entry.categoria].toLowerCase()}s
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedEntries.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/arqueologia/${r.slug}`}
                      className="p-4 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all group"
                    >
                      <p className="font-semibold text-sm group-hover:text-[var(--color-teal)] transition-colors">
                        {r.nombre}
                      </p>
                      {r.nombreCientifico && (
                        <p className="text-xs text-muted-foreground italic mt-0.5">{r.nombreCientifico}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{r.era}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Categoría badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${badgeClass}`}>
              <CatIcon size={12} strokeWidth={2} />
              {CATEGORIA_LABELS[entry.categoria]}
            </div>

            {/* Datos clave */}
            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-bold mb-3">Datos clave</h3>
                <dl className="space-y-2.5">
                  {entry.datosExtra.map((d) => (
                    <div key={d.label}>
                      <dt className="text-[11px] text-muted-foreground uppercase tracking-widest">
                        {d.label}
                      </dt>
                      <dd className="text-sm font-medium mt-0.5">{d.valor}</dd>
                    </div>
                  ))}
                </dl>
              </CardBody>
            </Card>

            {/* Ubicación */}
            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5">
                  <MapPin size={14} />
                  Ubicación
                </h3>
                <p className="text-sm text-muted-foreground">{entry.provincia}</p>
                <p className="text-sm text-muted-foreground">{paisLabel}</p>
                {entry.lat && (
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {entry.lat.toFixed(4)}°, {entry.lng.toFixed(4)}°
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Museo */}
            {entry.museo && (
              <Card variant="elevated">
                <CardBody>
                  <h3 className="text-sm font-bold mb-1.5">Dónde verlo</h3>
                  <p className="text-sm text-muted-foreground">{entry.museo}</p>
                </CardBody>
              </Card>
            )}

            {/* Fuente */}
            {entry.urlFuente && (
              <a
                href={entry.urlFuente}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={12} />
                Fuente oficial
              </a>
            )}

            {/* Volver */}
            <Link
              href={`/arqueologia?cat=${entry.categoria}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={14} />
              Volver a {CATEGORIA_LABELS[entry.categoria]}s
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
