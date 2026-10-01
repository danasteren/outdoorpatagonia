import Link from "next/link"
import {
  Compass,
  MapPin,
  ExternalLink,
  Sun,
  Thermometer,
  Plane,
  CalendarDays,
  Route,
  Ticket,
  Wind,
} from "lucide-react"
import type { DestinoEntry, DestinoLang } from "@/lib/destinos/catalog"
import type { ClimateNormals } from "@/lib/apis/climate"
import type { WeatherData } from "@/lib/apis/openmeteo"
import type { WikipediaImage } from "@/lib/apis/wikipedia"
import { gygSearchUrl } from "@/lib/affiliates/getyourguide"
import { Card, CardBody } from "@/components/primitives/Card"
import { DetailHero } from "@/components/DetailHero"
import { RelacionadosSection } from "@/components/RelacionadosSection"

const BASE = "https://outdoorpatagonia.com"

export function destinoUrl(slug: string, lang: DestinoLang) {
  return lang === "es" ? `${BASE}/destinos/${slug}` : `${BASE}/en/guides/${slug}`
}

const T = {
  es: {
    home: "Inicio",
    section: "Destinos",
    sectionHref: "/destinos",
    eyebrow: "Guía de viaje",
    queHacer: (n: string) => `Qué hacer en ${n}`,
    clima: (n: string) => `Clima en ${n}`,
    ahora: "Ahora",
    viento: "viento",
    cuandoIr: (n: string) => `Cuándo ir a ${n}`,
    comoLlegar: (n: string) => `Cómo llegar a ${n}`,
    cuantosDias: (n: string) => `Cuántos días quedarse en ${n}`,
    faq: "Preguntas frecuentes",
    datos: "Datos clave",
    excursiones: (n: string) => `Excursiones en ${n}`,
    excursionesTexto: "Compará excursiones, precios y opiniones de otros viajeros.",
    verExcursiones: "Ver excursiones",
    afiliado: "Links de afiliado de GetYourGuide: si reservás, ganamos una comisión sin costo extra para vos.",
    mes: "Mes",
    max: "Máx.",
    min: "Mín.",
    luz: "Horas de luz",
    climaNota: (p: string) =>
      `Promedios ${p} calculados con datos históricos de Open-Meteo (reanálisis ERA5). Pueden diferir uno o dos grados de la estación meteorológica local.`,
    ubicacion: "Ubicación",
    mapa: "Ver en Google Maps",
    fuentes: "Fuentes",
    relacionados: "Para seguir explorando",
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    pais: { AR: "Argentina", CL: "Chile" },
  },
  en: {
    home: "Home",
    section: "Travel guides",
    sectionHref: "/en/guides",
    eyebrow: "Travel guide",
    queHacer: (n: string) => `Things to do in ${n}`,
    clima: (n: string) => `${n} weather`,
    ahora: "Right now",
    viento: "wind",
    cuandoIr: (n: string) => `Best time to visit ${n}`,
    comoLlegar: (n: string) => `How to get to ${n}`,
    cuantosDias: (n: string) => `How many days in ${n}`,
    faq: "Frequently asked questions",
    datos: "Key facts",
    excursiones: (n: string) => `Tours in ${n}`,
    excursionesTexto: "Compare tours, prices and reviews from other travelers.",
    verExcursiones: "See tours",
    afiliado: "GetYourGuide affiliate links: if you book, we earn a commission at no extra cost to you.",
    mes: "Month",
    max: "High",
    min: "Low",
    luz: "Daylight",
    climaNota: (p: string) =>
      `${p} averages calculated from Open-Meteo historical data (ERA5 reanalysis). They may differ by one or two degrees from the local weather station.`,
    ubicacion: "Location",
    mapa: "View on Google Maps",
    fuentes: "Sources",
    relacionados: "Keep exploring",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    pais: { AR: "Argentina", CL: "Chile" },
  },
} as const

// Mismo corte que wmoToCondition (openmeteo.ts), en inglés.
function conditionEn(code: number): string {
  if (code === 0) return "Clear"
  if (code <= 2) return "Partly cloudy"
  if (code === 3) return "Overcast"
  if (code <= 48) return "Fog"
  if (code <= 57) return "Drizzle"
  if (code <= 67) return "Rain"
  if (code <= 77) return "Snow"
  if (code <= 82) return "Showers"
  if (code <= 86) return "Snow showers"
  return "Thunderstorm"
}

const toF = (c: number) => Math.round((c * 9) / 5 + 32)

function H2({ id, icon: Icon, children }: { id: string; icon: typeof Compass; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-2 text-2xl font-bold mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-playfair)" }}>
      <Icon size={20} strokeWidth={1.5} className="text-[var(--color-teal)] shrink-0" />
      {children}
    </h2>
  )
}

export function DestinoGuide({
  entry,
  lang,
  image,
  climate,
  weather,
}: {
  entry: DestinoEntry
  lang: DestinoLang
  image: WikipediaImage | null
  climate: ClimateNormals | null
  weather: WeatherData | null
}) {
  const t = T[lang]
  const c = entry[lang]
  const n = entry.nombre
  const url = destinoUrl(entry.slug, lang)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: n,
    description: c.intro[0],
    url,
    inLanguage: lang,
    geo: { "@type": "GeoCoordinates", latitude: entry.lat, longitude: entry.lng },
    containedInPlace: { "@type": "Country", name: t.pais[entry.pais] },
    touristType: { "@type": "Audience", audienceType: "travelers" },
    includesAttraction: c.queHacer.map((q) => ({ "@type": "TouristAttraction", name: q.nombre })),
    ...(image && { image: image.url }),
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: lang === "es" ? BASE : `${BASE}/en` },
      { "@type": "ListItem", position: 2, name: t.section, item: `${BASE}${t.sectionHref}` },
      { "@type": "ListItem", position: 3, name: n, item: url },
    ],
  }

  const maxTemp = climate ? Math.max(...climate.months.map((m) => m.tempMax)) : 0

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <DetailHero
        image={image ? { url: image.url, alt: c.subtitulo ? `${n}, ${c.subtitulo}` : n, credit: "Wikipedia", creditUrl: image.pageUrl } : null}
        fallbackGradient="linear-gradient(135deg, #0a2233 0%, #103a4d 60%, #0a2233 100%)"
        breadcrumb={[
          { label: t.home, href: lang === "es" ? "/" : "/en" },
          { label: t.section, href: t.sectionHref },
          { label: n },
        ]}
        icon={Compass}
        eyebrow={t.eyebrow}
        title={lang === "es" ? `${n}: guía de viaje` : `${n} travel guide`}
        subtitle={c.subtitulo}
        save={lang === "es" ? { slug: entry.slug, title: n, category: "destinos" } : undefined}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-12 min-w-0">
            <div className="space-y-4">
              {c.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-foreground leading-relaxed" : "text-foreground leading-relaxed"}>
                  {p}
                </p>
              ))}
            </div>

            <section>
              <H2 id="que-hacer" icon={Ticket}>{t.queHacer(n)}</H2>
              <ol className="space-y-5">
                {c.queHacer.map((q, i) => (
                  <li key={q.nombre} className="flex gap-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)] text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{q.nombre}</h3>
                      <p className="text-muted-foreground leading-relaxed mt-1">{q.texto}</p>
                      {q.gygQuery && (
                        <a
                          href={gygSearchUrl(q.gygQuery)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-teal)] hover:underline mt-1.5"
                        >
                          {t.verExcursiones}
                          <ExternalLink size={12} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted-foreground/70 mt-4">{t.afiliado}</p>
            </section>

            {climate && (
              <section>
                <H2 id="clima" icon={Thermometer}>{t.clima(n)}</H2>
                {weather && (
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5 p-4 rounded-xl border border-border bg-card">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.ahora}</span>
                    <span className="text-3xl font-bold text-foreground">
                      {weather.temperature}°C
                      {lang === "en" && <span className="text-base font-normal text-muted-foreground"> / {toF(weather.temperature)}°F</span>}
                    </span>
                    <span className="text-foreground">{lang === "es" ? weather.condition : conditionEn(weather.weatherCode)}</span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Wind size={13} strokeWidth={1.5} />
                      {weather.windSpeed} km/h {t.viento}
                    </span>
                  </div>
                )}
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th scope="col" className="text-left font-medium px-3 py-2">{t.mes}</th>
                        <th scope="col" className="text-left font-medium px-3 py-2">{t.max}</th>
                        <th scope="col" className="text-left font-medium px-3 py-2">{t.min}</th>
                        <th scope="col" className="text-left font-medium px-3 py-2 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1"><Sun size={12} strokeWidth={1.5} />{t.luz}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {climate.months.map((m) => (
                        <tr key={m.month} className="border-t border-border">
                          <th scope="row" className="text-left font-medium px-3 py-1.5">{t.months[m.month - 1]}</th>
                          <td className="px-3 py-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`${lang === "en" ? "w-24" : "w-12"} tabular-nums whitespace-nowrap`}>
                                {Math.round(m.tempMax)}°C{lang === "en" && <span className="text-muted-foreground"> {toF(m.tempMax)}°F</span>}
                              </span>
                              <span
                                aria-hidden
                                className="hidden sm:block h-1.5 rounded-full bg-[var(--color-terracotta)]/60"
                                style={{ width: `${Math.max(4, (Math.max(0, m.tempMax) / Math.max(1, maxTemp)) * 80)}px` }}
                              />
                            </div>
                          </td>
                          <td className="px-3 py-1.5 tabular-nums">
                            {Math.round(m.tempMin)}°C{lang === "en" && <span className="text-muted-foreground"> {toF(m.tempMin)}°F</span>}
                          </td>
                          <td className="px-3 py-1.5 tabular-nums">{m.daylightHours.toFixed(1).replace(".", lang === "es" ? "," : ".")} h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground/70 mt-2">{t.climaNota(climate.period)}</p>
              </section>
            )}

            <section>
              <H2 id="cuando-ir" icon={CalendarDays}>{t.cuandoIr(n)}</H2>
              <p className="text-foreground leading-relaxed mb-5">{c.cuandoIr.resumen}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.cuandoIr.temporadas.map((s) => (
                  <Card key={s.nombre} variant="default">
                    <CardBody className="p-4">
                      <h3 className="font-semibold text-foreground">{s.nombre}</h3>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{s.meses}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">{s.texto}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <H2 id="como-llegar" icon={Plane}>{t.comoLlegar(n)}</H2>
              <div className="space-y-4">
                {c.comoLlegar.map((m) => (
                  <div key={m.modo}>
                    <h3 className="font-semibold text-foreground">{m.modo}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-1">{m.texto}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <H2 id="cuantos-dias" icon={Route}>{t.cuantosDias(n)}</H2>
              <p className="text-foreground leading-relaxed mb-4">{c.cuantosDias.resumen}</p>
              <ol className="space-y-3 border-l-2 border-[var(--color-teal)]/30 pl-5">
                {c.cuantosDias.itinerario.map((d) => (
                  <li key={d.dia}>
                    <h3 className="font-semibold text-foreground text-sm">{d.dia}</h3>
                    <p className="text-muted-foreground leading-relaxed">{d.texto}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 id="faq" className="text-2xl font-bold mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-playfair)" }}>
                {t.faq}
              </h2>
              <div className="space-y-4">
                {c.faq.map((f) => (
                  <div key={f.pregunta} className="border-b border-border pb-4 last:border-0">
                    <h3 className="font-semibold text-foreground mb-1">{f.pregunta}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.respuesta}</p>
                  </div>
                ))}
              </div>
            </section>

            <RelacionadosSection items={entry.relacionados} heading={t.relacionados} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{t.datos}</h2>
                <dl className="space-y-2.5">
                  {c.datos.map((d) => (
                    <div key={d.label} className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground/70 uppercase tracking-wider">{d.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{d.valor}</dd>
                    </div>
                  ))}
                </dl>
              </CardBody>
            </Card>

            <Card variant="elevated" className="lg:sticky lg:top-24">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Ticket size={14} strokeWidth={1.5} />
                  {t.excursiones(n)}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{t.excursionesTexto}</p>
                <a
                  href={gygSearchUrl(n)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-[var(--color-teal)] text-white text-sm font-semibold px-4 py-2.5 hover:opacity-90 transition-opacity"
                >
                  {t.verExcursiones}
                  <ExternalLink size={13} strokeWidth={1.75} />
                </a>
                <p className="text-[10px] text-muted-foreground/70 mt-3 leading-relaxed">{t.afiliado}</p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">{t.ubicacion}</h2>
                <div className="flex items-start gap-2">
                  <MapPin size={16} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    {Math.abs(entry.lat).toFixed(2)}°S, {Math.abs(entry.lng).toFixed(2)}°{lang === "es" ? "O" : "W"}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${entry.lat},${entry.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  <ExternalLink size={11} strokeWidth={1.5} />
                  {t.mapa}
                </a>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">{t.fuentes}</h2>
                <ul className="space-y-2">
                  {entry.fuentes.map((f) => (
                    <li key={f.url}>
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-primary hover:underline">
                        <ExternalLink size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                        {f.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {lang === "en" && (
              <p className="text-xs text-muted-foreground px-1">
                <Link href={`/destinos/${entry.slug}`} hrefLang="es" className="hover:underline">
                  Leer en español →
                </Link>
              </p>
            )}
            {lang === "es" && (
              <p className="text-xs text-muted-foreground px-1">
                <Link href={`/en/guides/${entry.slug}`} hrefLang="en" className="hover:underline">
                  Read in English →
                </Link>
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
