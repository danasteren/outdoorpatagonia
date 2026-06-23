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
  Info,
} from "lucide-react"
import { ESCALADA_CATALOG, getSectorEntry, ESTILO_LABELS, PAIS_LABELS } from "@/lib/escalada/catalog"
import { fetchWeatherForLocation } from "@/lib/apis/openmeteo"
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"
import { SectorMapClient } from "./SectorMapClient"

export const revalidate = 3600
export const dynamicParams = true

// ─── generateStaticParams ────────────────────────────────────────────────────

export function generateStaticParams() {
  return ESCALADA_CATALOG.map((s) => ({ sector: s.slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>
}): Promise<Metadata> {
  const { sector } = await params
  const entry = getSectorEntry(sector)
  if (!entry) return {}

  return {
    title: `Escalada ${entry.nombre} — rutas, grados y condiciones | Outdoor Patagonia`,
    description: `${entry.nombre} (${entry.region}): ${entry.estilos.map((e) => ESTILO_LABELS[e]).join(", ")}. Grados ${entry.gradosMin}–${entry.gradosMax}, ${entry.altitud} msnm. ${entry.descripcion.slice(0, 100)}`,
    alternates: {
      canonical: `https://outdoorpatagonia.com/escalada/${sector}`,
    },
    openGraph: {
      title: `${entry.nombre} — Escalada en Patagonia`,
      description: entry.descripcion.slice(0, 155),
      type: "article",
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

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

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-56 md:h-72 flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(135deg, #2d4a3e 0%, #1a3028 60%, #0d1f1a 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 21px)",
          }}
        />
        <div className="relative px-6 md:px-10 pb-8 max-w-6xl mx-auto w-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" size="sm" className="border-white/30 text-white/80">
              Escalada
            </Badge>
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
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
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 opacity-60" />
            <span className="opacity-60">Roca:</span>
            <span className="font-bold">{entry.tipoRoca.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 opacity-60" />
            <span className="opacity-60">Grados:</span>
            <span className="font-bold">{entry.gradosMin}–{entry.gradosMax}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-60">Altitud:</span>
            <span className="font-bold">{entry.altitud.toLocaleString("es-AR")} msnm</span>
          </div>
          {weather && (
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 opacity-60" />
              <span className="opacity-60">Ahora:</span>
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
                        Condiciones peligrosas para escalada. Verificar pronóstico antes de acceder.
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

            {/* Rutas destacadas */}
            <section>
              <h2 className="text-xl font-bold mb-4">Rutas destacadas</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                        Ruta
                      </th>
                      <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                        Grado
                      </th>
                      <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                        Largo
                      </th>
                      <th className="text-left py-2 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                        Estilo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.rutasDestacadas.map((r, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                        <td className="py-2.5 pr-4 font-medium">{r.nombre}</td>
                        <td className="py-2.5 pr-4 font-mono text-[var(--color-teal)]">{r.grado}</td>
                        <td className="py-2.5 pr-4 text-muted-foreground">{r.largo}</td>
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
            </section>

            {/* Cómo llegar */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[var(--color-terracotta)]" />
                <h2 className="text-xl font-bold">Cómo llegar</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry.comoLlegar}</p>
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
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    País / Región
                  </span>
                  <p className="font-medium mt-0.5 text-sm">
                    {PAIS_LABELS[entry.pais]} · {entry.region}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Tipo de roca
                  </span>
                  <p className="font-medium mt-0.5 text-sm capitalize">
                    {entry.tipoRoca.join(", ")}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Estilos
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.estilos.map((e) => (
                      <span
                        key={e}
                        className="text-xs px-2 py-0.5 rounded bg-[var(--color-teal)]/15 text-[var(--color-teal)] font-medium"
                      >
                        {ESTILO_LABELS[e]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Temporada
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.temporada.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2 py-0.5 rounded bg-[var(--color-teal)]/15 text-[var(--color-teal)] font-medium capitalize"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-1 border-t border-border grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Grado mínimo</span>
                    <span className="font-bold font-mono">{entry.gradosMin}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Grado máximo</span>
                    <span className="font-bold font-mono">{entry.gradosMax}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Altitud sector</span>
                    <span className="font-bold">{entry.altitud.toLocaleString("es-AR")} m</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Rutas</span>
                    <span className="font-bold">{entry.rutasDestacadas.length} destacadas</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Mapa */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold">Ubicación del sector</span>
              </div>
              <SectorMapClient lat={entry.lat} lon={entry.lon} nombre={entry.nombre} />
              <p className="text-xs text-muted-foreground mt-2">
                {entry.lat.toFixed(4)}°, {entry.lon.toFixed(4)}°
              </p>
            </section>

            {/* CTA planear */}
            <div className="rounded-xl bg-[var(--color-forest)] text-[var(--color-cream)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 opacity-70" />
                <p className="font-bold">¿Planeando escalar acá?</p>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://outdoorpatagonia.com" },
              { "@type": "ListItem", position: 2, name: "Escalada", item: "https://outdoorpatagonia.com/escalada" },
              { "@type": "ListItem", position: 3, name: entry.nombre, item: `https://outdoorpatagonia.com/escalada/${sector}` },
            ],
          }),
        }}
      />
    </div>
  )
}
