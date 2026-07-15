import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Droplets, ExternalLink, ChevronLeft, Thermometer } from "lucide-react"
import { TERMAS_CATALOG, getTermaEntry } from "@/lib/termas/catalog"
import { fetchWikipediaLeadImage } from "@/lib/apis/wikipedia"
import { Card, CardBody } from "@/components/primitives/Card"
import { DetailHero } from "@/components/DetailHero"
import { RelacionadosSection } from "@/components/RelacionadosSection"

export const revalidate = 86400
export const dynamicParams = false

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return TERMAS_CATALOG.map((t) => ({ slug: t.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getTermaEntry(slug)
  if (!entry) return {}

  const description = `${entry.nombre}, en ${entry.region}. Agua termal a ${entry.temperaturaAgua}. Ubicación, cómo llegar y datos verificados con fuente oficial.`.slice(0, 160)

  return {
    title: `${entry.nombre} — Termas en Patagonia`,
    description,
    alternates: {
      canonical: `https://outdoorpatagonia.com/termas/${slug}`,
    },
    openGraph: {
      title: `${entry.nombre} | Outdoor Patagonia`,
      description,
      url: `https://outdoorpatagonia.com/termas/${slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TermaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getTermaEntry(slug)
  if (!entry) notFound()

  const wikiImage = entry.wikipediaTitle ? await fetchWikipediaLeadImage(entry.wikipediaTitle) : null

  const paisLabel = entry.pais === "CL" ? "Chile" : "Argentina"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: entry.nombre,
    description: entry.descripcion[0],
    url: `https://outdoorpatagonia.com/termas/${slug}`,
    ...(entry.lat != null && entry.lng != null && {
      geo: { "@type": "GeoCoordinates", latitude: entry.lat, longitude: entry.lng },
    }),
    touristType: { "@type": "Audience", audienceType: "outdoor enthusiasts, wellness tourism" },
    containedInPlace: { "@type": "Country", name: paisLabel },
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

  const others = TERMAS_CATALOG.filter((t) => t.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <DetailHero
        image={wikiImage ? { url: wikiImage.url, alt: entry.nombre, credit: "Wikipedia", creditUrl: wikiImage.pageUrl } : null}
        fallbackGradient="linear-gradient(135deg, #0a2233 0%, #103a4d 60%, #0a2233 100%)"
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Termas", href: "/termas" },
          { label: entry.nombre },
        ]}
        icon={Droplets}
        eyebrow="Termas"
        title={entry.nombre}
        subtitle={`${paisLabel} · ${entry.region}`}
        save={{ slug: entry.slug, title: entry.nombre, category: "termas" }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">

            <div className="space-y-4">
              {entry.descripcion.map((p, i) => (
                <p key={i} className="text-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {entry.faq.map((f, i) => (
                  <div key={i} className="border-b border-border pb-4 last:border-0">
                    <p className="font-semibold text-foreground mb-1">{f.pregunta}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.respuesta}</p>
                  </div>
                ))}
              </div>
            </div>

            <RelacionadosSection items={entry.relacionados} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Datos de la terma
                </h2>
                <dl className="space-y-2.5">
                  {entry.datosExtra.map((d) => (
                    <div key={d.label} className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground/70 uppercase tracking-wider">{d.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{d.valor}</dd>
                    </div>
                  ))}
                </dl>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Thermometer size={14} strokeWidth={1.5} />
                  Temperatura del agua
                </h2>
                <p className="text-sm text-foreground">{entry.temperaturaAgua}</p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Ubicación
                </h2>
                <div className="flex items-start gap-2">
                  <MapPin size={16} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    {entry.lat != null && entry.lng != null
                      ? `${Math.abs(entry.lat).toFixed(3)}°S, ${Math.abs(entry.lng).toFixed(3)}°O`
                      : entry.region}
                  </p>
                </div>
                {entry.lat != null && entry.lng != null && (
                  <a
                    href={`https://www.google.com/maps?q=${entry.lat},${entry.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <ExternalLink size={11} strokeWidth={1.5} />
                    Ver en Google Maps
                  </a>
                )}
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Fuente oficial
                </h2>
                <a
                  href={entry.urlFuente}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink size={14} strokeWidth={1.5} />
                  Sitio oficial
                </a>
              </CardBody>
            </Card>

          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                Más termas patagónicas
              </h2>
              <Link
                href="/termas"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Ver todas
                <ChevronLeft size={12} strokeWidth={1.5} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {others.map((t) => (
                <Link key={t.slug} href={`/termas/${t.slug}`} className="group block">
                  <Card variant="elevated" className="p-4 h-full transition-colors group-hover:border-primary/30">
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {t.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.region}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
