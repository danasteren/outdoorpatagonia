import type { Metadata } from "next"
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

export default async function EstadoPage() {
  const [weatherResult, glacierResult, fireResult] = await Promise.allSettled([
    fetchWeather(),
    fetchGlacierData(),
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
      {/* Hero */}
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

      {/* Clima + Glaciares */}
      <Section spacing="md" background="muted">
        <PageShell>
          <div className="space-y-10">
            <WeatherSection data={weather} />
            <GlacierSection data={glaciers} />
          </div>
        </PageShell>
      </Section>

      {/* Incendios */}
      <Section spacing="md">
        <PageShell>
          <FireDetailSection data={fires} />
        </PageShell>
      </Section>
    </div>
  )
}
