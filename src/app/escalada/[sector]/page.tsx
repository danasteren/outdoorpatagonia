import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import {
  Mountain,
  Wind,
  Thermometer,
  MapPin,
  AlertTriangle,
  Tent,
  Flag,
  Clock,
  Layers,
  Ticket,
  ExternalLink,
} from "lucide-react"
import {
  ESCALADA_CATALOG,
  getSectorEntry,
  ESTILO_LABELS,
  PAIS_LABELS,
  totalVias,
} from "@/lib/escalada/catalog"
import { gygSearchUrl } from "@/lib/affiliates/getyourguide"
import { fetchWeatherForLocation } from "@/lib/apis/openmeteo"
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"
import { Breadcrumb } from "@/components/primitives/Breadcrumb"
import { SectorMapClient } from "./SectorMapClient"
import { RoutesTable } from "./RoutesTable"

export const revalidate = 3600
export const dynamicParams = true

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ESCALADA_CATALOG.map((s) => ({ sector: s.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>
}): Promise<Metadata> {
  const { sector } = await params
  const entry = getSectorEntry(sector)
  if (!entry) return {}

  const vias = totalVias(entry)
  const estilosStr = entry.estilos.map((e) => ESTILO_LABELS[e]).join(", ")
  const title = `Escalada ${entry.nombre} — rutas, grados y temporada | Outdoor Patagonia`
  const description = `${entry.nombre} (${entry.region}): ${estilosStr}${vias > 0 ? `, ${vias}+ vías` : ""}. Grados ${entry.gradosMin}–${entry.gradosMax}, ${entry.altitud} msnm. Cómo llegar, permisos y condiciones en vivo.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://outdoorpatagonia.com/escalada/${sector}`,
    },
    openGraph: {
      title: `${entry.nombre} — Escalada en Patagonia`,
      description: entry.descripcion.slice(0, 155),
      url: `https://outdoorpatagonia.com/escalada/${sector}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  }
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

function buildJsonLd(entry: Awaited<ReturnType<typeof getSectorEntry>>) {
  if (!entry) return null
  const url = `https://outdoorpatagonia.com/escalada/${entry.slug}`
  const vias = totalVias(entry)

  const location = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: `Escalada ${entry.nombre}`,
    description: entry.descripcion,
    url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: entry.lat,
      longitude: entry.lon,
      elevation: entry.altitud,
    },
    sport: "Rock Climbing",
    address: {
      "@type": "PostalAddress",
      addressCountry: entry.pais === "AR" ? "AR" : "CL",
      addressRegion: entry.region,
    },
    containedInPlace: {
      "@type": "Country",
      name: entry.pais === "AR" ? "Argentina" : "Chile",
    },
  }

  const meses: Record<string, string> = {
    ene: "enero", feb: "febrero", mar: "marzo", abr: "abril",
    may: "mayo", jun: "junio", jul: "julio", ago: "agosto",
    sep: "septiembre", oct: "octubre", nov: "noviembre", dic: "diciembre",
  }
  const temporadaStr = entry.temporada.map((m) => meses[m] ?? m).join(", ")
  const estilosStr = entry.estilos.map((e) => ESTILO_LABELS[e]).join(", ")

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Cuándo es la temporada de escalada en ${entry.nombre}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La temporada recomendada para escalar en ${entry.nombre} es ${temporadaStr}. Las condiciones climáticas en la Patagonia pueden cambiar rápidamente; verificar el pronóstico local antes de salir.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Qué nivel se necesita para escalar en ${entry.nombre}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${entry.nombre} tiene vías desde grado ${entry.gradosMin} hasta ${entry.gradosMax} (escala francesa). Los estilos disponibles son: ${estilosStr}. ${entry.estilos.includes("clasica") ? "Las rutas clásicas requieren experiencia en glaciar y técnica en hielo o mixta." : "Hay opciones para escaladores de todos los niveles."}`,
        },
      },
      ...(entry.permisos
        ? [
            {
              "@type": "Question",
              name: `¿Se necesitan permisos para escalar en ${entry.nombre}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: entry.permisos,
              },
            },
          ]
        : []),
      {
        "@type": "Question",
        name: `¿Cómo llegar a ${entry.nombre}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.acceso,
        },
      },
      ...(vias > 0
        ? [
            {
              "@type": "Question",
              name: `¿Cuántas rutas hay en ${entry.nombre}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${entry.nombre} cuenta con más de ${vias} vías documentadas en grados ${entry.gradosMin}–${entry.gradosMax}. El tipo de roca es ${entry.tipoRoca.join(" y ")}.`,
              },
            },
          ]
        : []),
    ],
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://outdoorpatagonia.com" },
      { "@type": "ListItem", position: 2, name: "Escalada", item: "https://outdoorpatagonia.com/escalada" },
      { "@type": "ListItem", position: 3, name: entry.nombre, item: url },
    ],
  }

  return [location, faq, breadcrumb]
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sector: string }>
}) {
  const { sector } = await params
  const entry = getSectorEntry(sector)
  if (!entry) notFound()

  const weather = await fetchWeatherForLocation(entry.lat, entry.lon, entry.nombre)
  const windAlert = weather && weather.windSpeed > 50
  const vias = totalVias(entry)
  const hasFullRoutes = entry.subareas.length > 0 && entry.subareas.some((s) => s.rutas.length > 0)
  const jsonLd = buildJsonLd(entry)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative min-h-[240px] md:min-h-[300px] flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(135deg, #1a3028 0%, #0d1f1a 50%, #162419 100%)",
        }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative px-6 md:px-10 pb-8 max-w-6xl mx-auto w-full">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Escalada", href: "/escalada" },
              { label: entry.nombre },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 mb-3 mt-2">
            <Badge variant="outline" size="sm" className="border-white/30 text-white/80">
              Escalada
            </Badge>
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                entry.pais === "AR"
                  ? "bg-sky-400/20 text-sky-300"
                  : "bg-red-400/20 text-red-300"
              }`}
            >
              {PAIS_LABELS[entry.pais]}
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {entry.nombre}
          </h1>
          <p className="text-white/60 mt-1.5 text-sm">{entry.region}</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex flex-wrap gap-5 text-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 opacity-50" />
            <span className="opacity-60 text-xs">Roca</span>
            <span className="font-bold capitalize">{entry.tipoRoca.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 opacity-50" />
            <span className="opacity-60 text-xs">Grados</span>
            <span className="font-bold font-mono">{entry.gradosMin}–{entry.gradosMax}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-60 text-xs">Altitud</span>
            <span className="font-bold">{entry.altitud.toLocaleString("es-AR")} msnm</span>
          </div>
          {vias > 0 && (
            <div className="flex items-center gap-2">
              <span className="opacity-60 text-xs">Vías</span>
              <span className="font-bold">{vias}{entry.totalViasEstimado ? "+" : ""}</span>
            </div>
          )}
          {weather && (
            <div className="flex items-center gap-2 ml-auto">
              <Thermometer className="w-4 h-4 opacity-50" />
              <span className="font-bold">
                {weather.temperature}°C · {weather.condition}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left col — 3/5 */}
          <div className="lg:col-span-3 space-y-10">

            {/* Descripción */}
            <section>
              <p className="text-base leading-relaxed text-muted-foreground">
                {entry.descripcion}
              </p>
            </section>

            {/* Clima en vivo */}
            {weather && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Wind className="w-4 h-4 text-[var(--color-teal)]" />
                  <h2 className="text-xl font-bold">Condiciones actuales</h2>
                </div>

                {windAlert && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">
                        Viento extremo: {weather.windSpeed} km/h
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Condiciones peligrosas para escalar. Verificar pronóstico antes de acceder.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-muted p-4 text-center">
                    <p className="text-2xl font-bold">{weather.temperature}°C</p>
                    <p className="text-xs text-muted-foreground mt-1">Temperatura</p>
                  </div>
                  <div className={`rounded-xl p-4 text-center ${windAlert ? "bg-red-500/10" : "bg-muted"}`}>
                    <p className={`text-2xl font-bold ${windAlert ? "text-red-500" : ""}`}>
                      {weather.windSpeed} km/h
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Viento</p>
                  </div>
                  <div className="rounded-xl bg-muted p-4 text-center">
                    <p className="text-sm font-bold leading-tight">{weather.condition}</p>
                    <p className="text-xs text-muted-foreground mt-1">Estado</p>
                  </div>
                </div>
              </section>
            )}

            {/* Rutas */}
            <section>
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-xl font-bold">
                  {hasFullRoutes ? "Vías" : "Rutas destacadas"}
                </h2>
                {vias > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {vias}{entry.totalViasEstimado ? "+" : ""} vías · grados {entry.gradosMin}–{entry.gradosMax}
                  </span>
                )}
              </div>

              {hasFullRoutes ? (
                <RoutesTable subareas={entry.subareas} />
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                            Ruta
                          </th>
                          <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                            Grado
                          </th>
                          <th className="text-left py-2 text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                            Estilo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.rutasIconicas.map((r, i) => (
                          <tr
                            key={i}
                            className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                          >
                            <td className="py-2.5 pr-4 font-medium">{r.nombre}</td>
                            <td className="py-2.5 pr-4 font-mono font-bold text-[var(--color-teal)]">
                              {r.grado}
                            </td>
                            <td className="py-2.5">
                              <Badge size="sm" className="text-[var(--color-teal)]">
                                {ESTILO_LABELS[r.estilo]}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {entry.totalViasEstimado && (
                    <p className="text-xs text-muted-foreground mt-4">
                      Este sector tiene aproximadamente {entry.totalViasEstimado}+ vías documentadas.
                      El catálogo completo estará disponible próximamente.
                    </p>
                  )}
                </>
              )}
            </section>

            {/* Cómo llegar */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[var(--color-terracotta)]" />
                <h2 className="text-xl font-bold">Cómo llegar</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry.acceso}</p>
            </section>

            {/* Permisos + Camping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {entry.permisos && (
                <div className="rounded-xl bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Flag className="w-4 h-4 text-[var(--color-teal)]" />
                    <span className="text-sm font-bold">Permisos</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{entry.permisos}</p>
                </div>
              )}
              {entry.camping && (
                <div className="rounded-xl bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tent className="w-4 h-4 text-[var(--color-teal)]" />
                    <span className="text-sm font-bold">Camping</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{entry.camping}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right col — 2/5 */}
          <div className="lg:col-span-2 space-y-6">

            {/* Resumen */}
            <Card variant="elevated">
              <CardBody className="p-5 space-y-4">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    País / Región
                  </span>
                  <p className="font-medium mt-0.5 text-sm">
                    {PAIS_LABELS[entry.pais]} · {entry.region}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Tipo de roca
                  </span>
                  <p className="font-medium mt-0.5 text-sm capitalize">
                    {entry.tipoRoca.join(", ")}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Estilos
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.estilos.map((e) => (
                      <span
                        key={e}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal)] font-medium"
                      >
                        {ESTILO_LABELS[e]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Temporada
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.temporada.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium capitalize"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-border grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase tracking-widest">
                      Grado mín.
                    </span>
                    <span className="font-bold font-mono text-[var(--color-teal)]">{entry.gradosMin}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase tracking-widest">
                      Grado máx.
                    </span>
                    <span className="font-bold font-mono text-[var(--color-teal)]">{entry.gradosMax}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase tracking-widest">
                      Altitud
                    </span>
                    <span className="font-bold">{entry.altitud.toLocaleString("es-AR")} m</span>
                  </div>
                  {vias > 0 && (
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-semibold uppercase tracking-widest">
                        Vías
                      </span>
                      <span className="font-bold">{vias}{entry.totalViasEstimado ? "+" : ""}</span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Mapa */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold">Ubicación del sector</span>
              </div>
              <SectorMapClient lat={entry.lat} lon={entry.lon} nombre={entry.nombre} />
              <p className="text-xs text-muted-foreground mt-2">
                {entry.lat.toFixed(4)}°, {entry.lon.toFixed(4)}°
              </p>
            </section>

            {/* Tours GYG */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="w-4 h-4 text-[var(--color-teal)]" />
                <span className="text-sm font-bold">Tours y guías disponibles</span>
              </div>
              <div className="space-y-2">
                <a
                  href={gygSearchUrl(`${entry.nombre} guided climbing tour`)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm hover:border-[var(--color-teal)] transition-colors"
                >
                  <span>Guías de escalada en {entry.nombre}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
                <a
                  href={gygSearchUrl(`${entry.region} trekking day tour`)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm hover:border-[var(--color-teal)] transition-colors"
                >
                  <span>Excursiones en {entry.region}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
              </div>
            </section>

            {/* CTA */}
            <div className="rounded-xl bg-[var(--color-forest)] text-[var(--color-cream)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 opacity-70" />
                <p className="font-bold text-sm">¿Planeando escalar acá?</p>
              </div>
              <p className="text-sm opacity-70 mb-3">
                Armá un itinerario con alojamiento, guías locales y gear recomendado.
              </p>
              <Link
                href="/planear"
                className="inline-flex items-center gap-2 text-sm font-bold bg-[var(--color-cream)] text-[var(--color-forest)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Planear mi viaje
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      {jsonLd && jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </div>
  )
}
