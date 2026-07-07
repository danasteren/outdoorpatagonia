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
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"
import { Breadcrumb } from "@/components/primitives/Breadcrumb"

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

  const description = `${CATEGORIA_LABELS[entry.categoria]} de la Patagonia. ${entry.era}${entry.edadAnios ? ` — ${entry.edadAnios}` : ""}. ${entry.descripcion[0].slice(0, 120)}...`

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

  const jsonLd = entry.lat
    ? {
        "@context": "https://schema.org",
        "@type": entry.categoria === "humano" || entry.categoria === "petroglifo"
          ? "TouristDestination"
          : "Article",
        name: entry.nombre,
        description: entry.descripcion[0],
        url: `https://outdoorpatagonia.com/arqueologia/${slug}`,
        ...(entry.lat && {
          geo: { "@type": "GeoCoordinates", latitude: entry.lat, longitude: entry.lng },
        }),
        about: {
          "@type": "Thing",
          name: entry.nombreCientifico ?? entry.nombre,
          description: `${CATEGORIA_LABELS[entry.categoria]} de la Patagonia — ${entry.era}`,
        },
      }
    : null

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
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="relative h-72 md:h-96 flex flex-col justify-end overflow-hidden">
        {wikiImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={wikiImage.url}
            alt={entry.nombre}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: wikiImage
              ? "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)"
              : heroGradient,
          }}
        />
        {!wikiImage && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.08) 30px, rgba(255,255,255,0.08) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="relative px-6 md:px-10 pb-8">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Arqueología", href: "/arqueologia" },
                { label: entry.nombre },
              ]}
              className="mb-3 text-white/60"
            />
            <div className="flex items-end gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CatIcon size={16} className="text-white/70" strokeWidth={1.5} />
                  <span className="text-xs text-white/70 uppercase tracking-widest">
                    {CATEGORIA_LABELS[entry.categoria]}
                  </span>
                </div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {entry.nombre}
                </h1>
                {entry.nombreCientifico && (
                  <p className="text-white/60 mt-1 text-sm italic">{entry.nombreCientifico}</p>
                )}
                <p className="text-white/70 mt-1 text-sm">
                  {paisLabel} · {entry.provincia} · {entry.era}
                </p>
              </div>
              {wikiImage && (
                <a
                  href={wikiImage.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-white/40 hover:text-white/70 transition-colors flex-shrink-0"
                >
                  Foto: Wikipedia
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

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
