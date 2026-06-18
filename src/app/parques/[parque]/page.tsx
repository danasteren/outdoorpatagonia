import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import {
  MapPin,
  Thermometer,
  Wind,
  Cloud,
  ExternalLink,
  Footprints,
  Bird,
  Bed,
  Compass,
} from "lucide-react"
import { PARQUES_CATALOG, getParqueEntry } from "@/lib/parques/catalog"
import { SENDEROS_CATALOG } from "@/lib/senderos/catalog"
import { FAUNA_CATALOG } from "@/lib/fauna/catalog"
import { ALL_ACCOMMODATIONS, ALL_TOURS } from "@/lib/planner/data"
import { fetchWeatherForLocation } from "@/lib/apis/openmeteo"
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"

export const revalidate = 3600
export const dynamicParams = true

// ─── generateStaticParams ────────────────────────────────────────────────────

export function generateStaticParams() {
  return PARQUES_CATALOG.map((p) => ({ parque: p.slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ parque: string }>
}): Promise<Metadata> {
  const { parque } = await params
  const entry = getParqueEntry(parque)
  if (!entry) return {}

  const country = entry.country === "ar" ? "Argentina" : "Chile"
  return {
    title: `${entry.name} — Parque Nacional | Outdoor Patagonia`,
    description: `Todo sobre el Parque Nacional ${entry.name} (${country}): actividades, clima actual, senderos y cómo llegar.`,
    alternates: {
      canonical: `https://outdoorpatagonia.com/parques/${parque}`,
    },
    openGraph: {
      title: `Parque Nacional ${entry.name}`,
      description: entry.description.slice(0, 155),
      type: "article",
    },
  }
}

// ─── WMO weather icon map ─────────────────────────────────────────────────────

function weatherIcon(code: number): string {
  if (code === 0) return "☀️"
  if (code <= 2) return "🌤️"
  if (code === 3) return "☁️"
  if (code <= 48) return "🌫️"
  if (code <= 57) return "🌦️"
  if (code <= 67) return "🌧️"
  if (code <= 77) return "❄️"
  if (code <= 82) return "🌧️"
  if (code <= 86) return "🌨️"
  return "⛈️"
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ParqueNacionalPage({
  params,
}: {
  params: Promise<{ parque: string }>
}) {
  const { parque } = await params
  const entry = getParqueEntry(parque)
  if (!entry) notFound()

  // [lng, lat] → lat, lon for Open-Meteo
  const [lng, lat] = entry.coordinates

  // Parallel fetches
  const weather = await fetchWeatherForLocation(lat, lng, entry.name)

  // Cross-reference data from existing structures — no API needed
  const senderosDelParque = SENDEROS_CATALOG.filter(
    (s) => s.parqueSlug === entry.slug
  )

  const faunaDelParque = entry.faunaEspecies
    .map((slug) => FAUNA_CATALOG.find((f) => f.slug === slug))
    .filter(Boolean)

  const alojamientos = entry.plannerLocation
    ? ALL_ACCOMMODATIONS.filter((a) => a.location === entry.plannerLocation).slice(0, 3)
    : []

  const tours = entry.plannerLocation
    ? ALL_TOURS.filter((t) => t.location === entry.plannerLocation).slice(0, 4)
    : []

  const countryLabel = entry.country === "ar" ? "Argentina" : "Chile"
  const locationLabel = entry.province ?? entry.region ?? countryLabel

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-72 md:h-96 flex flex-col justify-end"
        style={{
          background:
            entry.country === "ar"
              ? "linear-gradient(135deg, var(--color-forest) 0%, #1a3a2a 60%, #0d2218 100%)"
              : "linear-gradient(135deg, #1a2a4a 0%, #0d1f3c 60%, #071529 100%)",
        }}
      >
        {/* Topographic pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.08) 30px, rgba(255,255,255,0.08) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px)",
          }}
        />
        <div className="relative px-6 md:px-10 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" size="sm" className="border-white/30 text-white/80">
                Parque Nacional
              </Badge>
              <Badge variant="outline" size="sm" className="border-white/30 text-white/80">
                {countryLabel}
              </Badge>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {entry.name}
            </h1>
            <p className="text-white/60 mt-2 text-sm">
              {locationLabel} · {entry.surface}
            </p>
          </div>
        </div>
      </div>

      {/* Weather strip */}
      {weather && (
        <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
          <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex flex-wrap items-center gap-6 text-sm">
            <span className="text-white/50 text-xs uppercase tracking-widest">
              Clima ahora
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg">{weatherIcon(weather.weatherCode)}</span>
              <span className="font-bold">{weather.temperature}°C</span>
              <span className="text-white/60">{weather.condition}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70">
              <Wind className="w-3.5 h-3.5" />
              <span>{weather.windSpeed} km/h</span>
            </div>
            <span className="text-white/40 text-xs">
              Actualizado cada hora · Open-Meteo
            </span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left col — 3/5 */}
          <div className="lg:col-span-3 space-y-10">

            {/* Description */}
            <section>
              <p className="text-base leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-xl font-bold mb-4">Qué ver y hacer</h2>
              <ul className="space-y-3">
                {entry.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[var(--color-terracotta)] font-bold mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Trails */}
            {senderosDelParque.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Footprints className="w-5 h-5 text-[var(--color-teal)]" />
                  <h2 className="text-xl font-bold">Senderos en el parque</h2>
                </div>
                <div className="space-y-3">
                  {senderosDelParque.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/senderos/${s.slug}`}
                      className="block group"
                    >
                      <Card variant="default" className="hover:border-[var(--color-teal)] transition-colors">
                        <CardBody className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold group-hover:text-[var(--color-teal)] transition-colors">
                                {s.title}
                              </p>
                              <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
                                <span>{s.distancia}</span>
                                <span>·</span>
                                <span>{s.duracion}</span>
                                <span>·</span>
                                <span
                                  className={
                                    s.dificultad === "alta" || s.dificultad === "moderada-alta"
                                      ? "text-red-500 font-medium"
                                      : s.dificultad === "moderada"
                                        ? "text-yellow-600 font-medium"
                                        : "text-green-600 font-medium"
                                  }
                                >
                                  Dificultad {s.dificultad}
                                </span>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* How to get there */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-5 h-5 text-[var(--color-teal)]" />
                <h2 className="text-xl font-bold">Cómo llegar</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry.howToGet}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                <span className="font-medium">Entrada:</span>
                {entry.entryFee}
              </div>
            </section>

            {/* Tours */}
            {tours.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Tours y excursiones</h2>
                <div className="space-y-3">
                  {tours.map((t) => (
                    <a
                      key={t.name}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-start justify-between gap-3 p-4 rounded-xl border border-border hover:border-[var(--color-teal)] transition-colors group"
                    >
                      <div>
                        <p className="font-medium text-sm group-hover:text-[var(--color-teal)] transition-colors">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.duration} · {t.description.slice(0, 80)}…
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right col — 2/5 */}
          <div className="lg:col-span-2 space-y-8">

            {/* Info card */}
            <Card variant="elevated">
              <CardBody className="p-5 space-y-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    País
                  </span>
                  <p className="font-medium mt-0.5">{countryLabel}</p>
                </div>
                {(entry.province ?? entry.region) && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">
                      {entry.country === "ar" ? "Provincia" : "Región"}
                    </span>
                    <p className="font-medium mt-0.5">
                      {entry.province ?? entry.region}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Superficie
                  </span>
                  <p className="font-medium mt-0.5">{entry.surface}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Mejor época
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.bestMonths.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2 py-0.5 rounded bg-[var(--color-teal)]/15 text-[var(--color-teal)] font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                {weather && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">
                      Clima ahora
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xl">{weatherIcon(weather.weatherCode)}</span>
                      <div>
                        <p className="font-bold">{weather.temperature}°C</p>
                        <p className="text-xs text-muted-foreground">
                          Viento {weather.windSpeed} km/h · {weather.condition}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {entry.website && (
                  <a
                    href={entry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--color-teal)] hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Sitio oficial
                  </a>
                )}
              </CardBody>
            </Card>

            {/* Fauna */}
            {faunaDelParque.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Bird className="w-4 h-4 text-[var(--color-terracotta)]" />
                  <h2 className="text-lg font-bold">Fauna que podés ver</h2>
                </div>
                <div className="space-y-2">
                  {faunaDelParque.map((f) => {
                    if (!f) return null
                    return (
                      <Link
                        key={f.slug}
                        href={`/fauna/${f.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-terracotta)] shrink-0" />
                        <span className="text-sm group-hover:text-[var(--color-terracotta)] transition-colors">
                          {f.commonNameEs}
                        </span>
                        <span className="text-xs text-muted-foreground italic hidden sm:inline">
                          {f.scientificName}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Accommodations */}
            {alojamientos.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Bed className="w-4 h-4 text-[var(--color-teal)]" />
                  <h2 className="text-lg font-bold">Dónde quedarse</h2>
                </div>
                <div className="space-y-3">
                  {alojamientos.map((a) => (
                    <a
                      key={a.name}
                      href={a.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block group"
                    >
                      <Card variant="default" className="hover:border-[var(--color-teal)] transition-colors">
                        <CardBody className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium group-hover:text-[var(--color-teal)] transition-colors">
                                {a.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {a.type} · {a.priceRange}
                              </p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          </div>
                        </CardBody>
                      </Card>
                    </a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Links de afiliado Booking.com — precio final en el sitio
                </p>
              </section>
            )}

            {/* Planner CTA */}
            {entry.plannerDestinationId && (
              <div className="rounded-xl bg-[var(--color-forest)] text-[var(--color-cream)] p-5">
                <p className="font-bold mb-1">¿Planeando visitar {entry.name}?</p>
                <p className="text-sm opacity-70 mb-3">
                  Armá un itinerario personalizado con alojamiento, tours y gear incluido.
                </p>
                <Link
                  href="/planear"
                  className="inline-flex items-center gap-2 text-sm font-bold bg-[var(--color-cream)] text-[var(--color-forest)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Planear mi viaje
                </Link>
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
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://outdoorpatagonia.com" },
              { "@type": "ListItem", position: 2, name: "Parques", item: "https://outdoorpatagonia.com/parques" },
              { "@type": "ListItem", position: 3, name: entry.name, item: `https://outdoorpatagonia.com/parques/${parque}` },
            ],
          }),
        }}
      />
    </div>
  )
}
