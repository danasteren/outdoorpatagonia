import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Mountain, Flame, TriangleAlert, CircleAlert, CheckCircle, ExternalLink, ChevronLeft, Thermometer, Wind } from "lucide-react"
import { VOLCANES_CATALOG, getVolcanEntry } from "@/lib/volcanes/catalog"
import { fetchVolcanes } from "@/lib/apis/sernageomin"
import { fetchWikipediaLeadImage } from "@/lib/apis/wikipedia"
import { fetchWeatherForLocation } from "@/lib/apis/openmeteo"
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"
import { Breadcrumb } from "@/components/primitives/Breadcrumb"
import type { NivelAlerta } from "@/lib/apis/sernageomin"

export const revalidate = 3600
export const dynamicParams = false

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return VOLCANES_CATALOG.map((v) => ({ slug: v.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getVolcanEntry(slug)
  if (!entry) return {}

  const pais = entry.pais === "CL/AR" ? "Chile y Argentina" : entry.pais === "CL" ? "Chile" : "Argentina"
  const description = `${entry.tipoVolcan} de ${entry.elevacion.toLocaleString("es-AR")} m en ${pais}. Última erupción: ${entry.ultimaErupcion}. Alertas volcánicas SERNAGEOMIN en tiempo real.`

  return {
    title: `Volcán ${entry.nombre} — ${entry.tipoVolcan} en Patagonia`,
    description,
    alternates: {
      canonical: `https://outdoorpatagonia.com/volcanes/${slug}`,
    },
    openGraph: {
      title: `Volcán ${entry.nombre} | Outdoor Patagonia`,
      description,
      url: `https://outdoorpatagonia.com/volcanes/${slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  }
}

// ─── Nivel config ─────────────────────────────────────────────────────────────

const NIVEL_CONFIG: Record<NivelAlerta, { label: string; color: string; bg: string; icon: typeof Mountain }> = {
  Verde:    { label: "Verde",    color: "text-green-600",  bg: "bg-green-500/10 border-green-500/30",   icon: CheckCircle },
  Amarillo: { label: "Amarillo", color: "text-yellow-600", bg: "bg-yellow-400/10 border-yellow-400/30", icon: CircleAlert },
  Naranja:  { label: "Naranja",  color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30", icon: TriangleAlert },
  Rojo:     { label: "Rojo",     color: "text-red-500",    bg: "bg-red-500/10 border-red-500/30",       icon: TriangleAlert },
}

function nivelDescripcion(nivel: NivelAlerta, verificado: boolean): string {
  if (!verificado) return "Sin comunicados de alerta recientes de SERNAGEOMIN"
  if (nivel === "Verde")    return "Sin actividad volcánica anómala"
  if (nivel === "Amarillo") return "Intranquilidad menor — monitoreo activo"
  if (nivel === "Naranja")  return "Intranquilidad elevada — posible erupción"
  return "Erupción en curso o inminente — seguí las instrucciones de las autoridades"
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VolcanPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getVolcanEntry(slug)
  if (!entry) notFound()

  const [volcanes, weather, wikiImage] = await Promise.all([
    fetchVolcanes(),
    fetchWeatherForLocation(entry.lat, entry.lng, entry.nombre),
    fetchWikipediaLeadImage(entry.wikipediaTitle ?? `Volcán ${entry.nombre}`),
  ])

  const volcanData = volcanes.find((v) => v.slug === slug)
  const nivel: NivelAlerta = volcanData?.nivel ?? "Verde"
  const nivelVerificado = volcanData?.nivelVerificado ?? false
  const fechaPost = volcanData?.fechaPost ?? null
  const nivelCfg = NIVEL_CONFIG[nivel]
  const NivelIcon = nivelCfg.icon

  const paisLabel =
    entry.pais === "CL/AR" ? "Chile / Argentina" :
    entry.pais === "CL" ? "Chile" : "Argentina"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `Volcán ${entry.nombre}`,
    description: entry.descripcion[0],
    url: `https://outdoorpatagonia.com/volcanes/${slug}`,
    geo: { "@type": "GeoCoordinates", latitude: entry.lat, longitude: entry.lng },
    touristType: { "@type": "Audience", audienceType: "outdoor enthusiasts, geology, volcano tourism" },
    containedInPlace: {
      "@type": "Country",
      name: entry.pais === "AR" ? "Argentina" : "Chile",
    },
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

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="relative h-72 md:h-96 flex flex-col justify-end overflow-hidden">
        {wikiImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={wikiImage.url}
            alt={`Volcán ${entry.nombre}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: wikiImage
              ? "linear-gradient(135deg, rgba(60,10,0,0.55) 0%, rgba(30,10,5,0.5) 60%, rgba(60,10,0,0.75) 100%)"
              : "linear-gradient(135deg, #3c0a00 0%, #6b1a05 60%, #3c0a00 100%)",
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative px-6 md:px-10 pb-8">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Volcanes", href: "/volcanes" },
                { label: entry.nombre },
              ]}
              className="mb-3 text-white/60"
            />
            <div className="flex items-end gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Flame size={16} className="text-orange-400" strokeWidth={1.5} />
                  <span className="text-xs text-white/70 uppercase tracking-widest">Volcán</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  {entry.nombre}
                </h1>
                <p className="text-white/70 mt-1 text-sm">{paisLabel} · {entry.elevacion.toLocaleString("es-AR")} m s. n. m.</p>
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

            {/* Alerta en vivo */}
            <Card variant="elevated" className={`border ${nivelCfg.bg}`}>
              <CardBody className="flex items-start gap-4 p-5">
                <NivelIcon size={28} strokeWidth={1.5} className={nivelCfg.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-foreground">Alerta SERNAGEOMIN</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${nivelCfg.bg} ${nivelCfg.color}`}>
                      {nivelCfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{nivelDescripcion(nivel, nivelVerificado)}</p>
                  {nivelVerificado && fechaPost && (
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Último comunicado: {new Date(fechaPost).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                  )}
                  {!nivelVerificado && (
                    <p className="text-xs text-muted-foreground/60 mt-1">Actualizado cada 24 h desde SERNAGEOMIN</p>
                  )}
                </div>
                <a
                  href={entry.urlFuente}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-xs text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} strokeWidth={1.5} />
                  SERNAGEOMIN
                </a>
              </CardBody>
            </Card>

            {/* Descripción editorial */}
            <div className="space-y-4">
              {entry.descripcion.map((p, i) => (
                <p key={i} className="text-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* FAQ */}
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

          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Datos técnicos */}
            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Datos del volcán
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

            {/* Clima actual */}
            {weather && (
              <Card variant="elevated">
                <CardBody className="p-5">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    Clima en la zona
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} strokeWidth={1.5} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {weather.temperature != null ? `${Math.round(weather.temperature)} °C` : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind size={16} strokeWidth={1.5} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {weather.windSpeed != null ? `${Math.round(weather.windSpeed)} km/h` : "—"}
                      </span>
                    </div>
                    {weather.condition && (
                      <p className="text-xs text-muted-foreground capitalize">{weather.condition}</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Ubicación */}
            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Ubicación
                </h2>
                <div className="flex items-start gap-2">
                  <MapPin size={16} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    {Math.abs(entry.lat).toFixed(3)}°S, {Math.abs(entry.lng).toFixed(3)}°O
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${entry.lat},${entry.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  <ExternalLink size={11} strokeWidth={1.5} />
                  Ver en Google Maps
                </a>
              </CardBody>
            </Card>

            {/* Fuente */}
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
                  SERNAGEOMIN — reportes de alerta
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  El Servicio Nacional de Geología y Minería de Chile es el organismo oficial para el monitoreo volcánico en la Patagonia chilena.
                </p>
              </CardBody>
            </Card>

          </div>
        </div>

        {/* Volver */}
        <div className="mt-10 pt-6 border-t border-border">
          <Link
            href="/volcanes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
            Ver todos los volcanes patagónicos
          </Link>
        </div>
      </div>
    </div>
  )
}
