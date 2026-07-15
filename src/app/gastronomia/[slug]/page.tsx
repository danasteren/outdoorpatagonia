import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChefHat, ExternalLink, ChevronLeft, Tag } from "lucide-react"
import { GASTRONOMIA_CATALOG, getGastronomiaEntry } from "@/lib/gastronomia/catalog"
import { fetchWikipediaLeadImage } from "@/lib/apis/wikipedia"
import { Card, CardBody } from "@/components/primitives/Card"
import { DetailHero } from "@/components/DetailHero"
import { RelacionadosSection } from "@/components/RelacionadosSection"

export const revalidate = 86400
export const dynamicParams = false

const PAIS_LABEL: Record<string, string> = {
  AR: "Argentina",
  CL: "Chile",
  "AR/CL": "Argentina y Chile",
}

const CATEGORIA_LABEL: Record<string, string> = {
  plato: "Plato",
  bebida: "Bebida",
  postre: "Postre",
  condimento: "Condimento",
  conserva: "Conserva",
  ingrediente: "Ingrediente",
}

export function generateStaticParams() {
  return GASTRONOMIA_CATALOG.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getGastronomiaEntry(slug)
  if (!entry) return {}

  const description = entry.descripcion[0].slice(0, 160)

  return {
    title: `${entry.nombre} — Gastronomía Patagónica`,
    description,
    alternates: {
      canonical: `https://outdoorpatagonia.com/gastronomia/${slug}`,
    },
    openGraph: {
      title: `${entry.nombre} | Outdoor Patagonia`,
      description,
      url: `https://outdoorpatagonia.com/gastronomia/${slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function GastronomiaEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getGastronomiaEntry(slug)
  if (!entry) notFound()

  const wikiImage =
    !entry.coverImageUrl && entry.wikipediaTitle
      ? await fetchWikipediaLeadImage(entry.wikipediaTitle)
      : null

  const heroImage = entry.coverImageUrl
    ? { url: entry.coverImageUrl, alt: entry.nombre }
    : wikiImage
      ? { url: wikiImage.url, alt: entry.nombre, credit: "Wikipedia", creditUrl: wikiImage.pageUrl }
      : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.nombre,
    description: entry.descripcion[0],
    image: heroImage?.url,
    about: { "@type": "Thing", name: entry.nombre },
    author: { "@type": "Organization", name: "Outdoor Patagonia" },
    publisher: {
      "@type": "Organization",
      name: "Outdoor Patagonia",
      url: "https://outdoorpatagonia.com",
    },
    url: `https://outdoorpatagonia.com/gastronomia/${slug}`,
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

  const others = GASTRONOMIA_CATALOG.filter((e) => e.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <DetailHero
        image={heroImage}
        fallbackGradient="linear-gradient(135deg, #2a1508 0%, #4d2e10 60%, #2a1508 100%)"
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Gastronomía", href: "/gastronomia" },
          { label: entry.nombre },
        ]}
        icon={ChefHat}
        eyebrow="Gastronomía"
        title={entry.nombre}
        subtitle={`${PAIS_LABEL[entry.pais]} · ${CATEGORIA_LABEL[entry.categoria]}`}
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
                  Datos
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
                  <Tag size={14} strokeWidth={1.5} />
                  Categoría
                </h2>
                <p className="text-sm text-foreground">{CATEGORIA_LABEL[entry.categoria]} · {PAIS_LABEL[entry.pais]}</p>
              </CardBody>
            </Card>

            {entry.urlFuente && (
              <Card variant="elevated">
                <CardBody className="p-5">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Fuente
                  </h2>
                  <a
                    href={entry.urlFuente}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    Ver fuente
                  </a>
                </CardBody>
              </Card>
            )}

          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                Más gastronomía patagónica
              </h2>
              <Link
                href="/gastronomia"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Ver todo
                <ChevronLeft size={12} strokeWidth={1.5} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {others.map((e) => (
                <Link key={e.slug} href={`/gastronomia/${e.slug}`} className="group block">
                  <Card variant="elevated" className="p-4 h-full transition-colors group-hover:border-primary/30">
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {e.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{CATEGORIA_LABEL[e.categoria]}</p>
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
