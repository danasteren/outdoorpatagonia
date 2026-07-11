import type { Metadata } from "next"
import Link from "next/link"
import { fetchWeather, fetchGlacierData } from "@/lib/apis/openmeteo"
import { fetchPatagoniaFires } from "@/lib/apis/nasa-firms"
import { Section, PageShell } from "@/components/layout"
import { WeatherSection } from "@/components/status/WeatherSection"
import { GlacierSection } from "@/components/status/GlacierSection"
import { FireDetailSection } from "@/components/status/FireDetailSection"

export const metadata: Metadata = {
  title: "Estado de la Patagonia — datos en tiempo real | Outdoor Patagonia",
  description:
    "Panel ambiental en tiempo real: clima, glaciares e incendios activos en la Patagonia. Actualizado cada hora.",
  openGraph: {
    title: "Estado de la Patagonia — datos en tiempo real",
    description:
      "Panel ambiental en tiempo real: clima, glaciares e incendios activos en la Patagonia.",
  },
}

const TABS = [
  { key: "clima", label: "Clima en puntos clave" },
  { key: "glaciares", label: "Glaciares — temperatura actual" },
]

export default async function EstadoPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const activeTab = tab === "glaciares" ? "glaciares" : "clima"

  const [weatherResult, glacierResult, fireResult] = await Promise.allSettled([
    activeTab === "clima" ? fetchWeather() : Promise.resolve([]),
    activeTab === "glaciares" ? fetchGlacierData() : Promise.resolve([]),
    fetchPatagoniaFires(),
  ])

  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : []
  const glaciers = glacierResult.status === "fulfilled" ? glacierResult.value : []
  const fires =
    fireResult.status === "fulfilled"
      ? fireResult.value
      : { count: 0, hotspots: [], lastDate: "" }

  return (
    <div>
      <Section
        spacing="lg"
        className="bg-gradient-to-br from-[var(--color-forest)] via-[#1e4a38] to-[var(--color-teal)] text-[var(--color-cream)]"
      >
        <PageShell>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-teal-light)] mb-4">
              Tiempo real
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Estado de la Patagonia
            </h1>
            <p className="text-base md:text-lg text-[var(--color-cream)] opacity-80 leading-relaxed">
              Panel ambiental en tiempo real: clima, glaciares e incendios activos.
              Actualizado cada hora.
            </p>
          </div>
        </PageShell>
      </Section>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map(({ key, label }) => {
              const isActive = key === activeTab
              return (
                <Link
                  key={key}
                  href={`/estado?tab=${key}`}
                  className={`shrink-0 px-4 py-2.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-b-2 border-[var(--color-forest)] text-[var(--color-forest)] -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <Section spacing="md" background="muted">
        <PageShell>
          {activeTab === "clima" && <WeatherSection data={weather} />}
          {activeTab === "glaciares" && <GlacierSection data={glaciers} />}
        </PageShell>
      </Section>

      <Section spacing="md">
        <PageShell>
          <FireDetailSection data={fires} />
        </PageShell>
      </Section>
    </div>
  )
}
