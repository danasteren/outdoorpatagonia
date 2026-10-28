import { Section, PageShell } from "@/components/layout"
import { Badge } from "@/components/primitives"
import { fetchWeather } from "@/lib/apis/openmeteo"
import { fetchGlacierData } from "@/lib/apis/openmeteo"
import {
  fetchPatagoniaFauna,
  fetchPatagoniaFlora,
  fetchPatagoniaFungi,
  fetchPatagoniaPhotos,
} from "@/lib/apis/inaturalist"
import { fetchImpactoData } from "@/lib/apis/openaq"
import { getMoonData } from "@/lib/astronomy"
import { WeatherSection } from "./WeatherSection"
import { GlacierSection } from "./GlacierSection"
import { SightingList } from "./SightingList"
import { MoonSection } from "./MoonSection"
import { ImpactoSection } from "./ImpactoSection"
import { PhotoGrid } from "./PhotoGrid"

function SightingPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        {title}
      </p>
      {children}
    </div>
  )
}

const TEXT = {
  es: {
    title: "Estado de la Patagonia",
    updated: "Actualizado cada hora",
    fauna: "Fauna avistada — últimos 14 días",
    flora: "Flora observada — últimos 14 días",
    fungi: "Hongos registrados — últimos 14 días",
  },
  en: {
    title: "Patagonia right now",
    updated: "Updated hourly",
    fauna: "Wildlife sighted — last 14 days",
    flora: "Plants observed — last 14 days",
    fungi: "Fungi recorded — last 14 days",
  },
}

export async function StatusBoard({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = TEXT[lang]
  const [
    weatherResult,
    glacierResult,
    faunaResult,
    floraResult,
    fungiResult,
    photosResult,
    impactoResult,
  ] = await Promise.allSettled([
    fetchWeather(),
    fetchGlacierData(),
    fetchPatagoniaFauna(lang),
    fetchPatagoniaFlora(lang),
    fetchPatagoniaFungi(lang),
    fetchPatagoniaPhotos(8, lang),
    fetchImpactoData(),
  ])

  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : []
  const glaciers = glacierResult.status === "fulfilled" ? glacierResult.value : []
  const fauna = faunaResult.status === "fulfilled" ? faunaResult.value : []
  const flora = floraResult.status === "fulfilled" ? floraResult.value : []
  const fungi = fungiResult.status === "fulfilled" ? fungiResult.value : []
  const photos = photosResult.status === "fulfilled" ? photosResult.value : []
  const impacto   = impactoResult.status === "fulfilled" ? impactoResult.value : { readings: [], lastDate: "" }

  const moon = getMoonData(lang)

  const hasAnyData =
    weather.length > 0 ||
    glaciers.length > 0 ||
    fauna.length > 0 ||
    flora.length > 0 ||
    fungi.length > 0 ||
    photos.length > 0

  if (!hasAnyData) return null

  return (
    <Section spacing="sm" background="muted">
      <PageShell>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold font-heading">{t.title}</h2>
          <Badge variant="outline" size="sm">{t.updated}</Badge>
        </div>

        <div className="space-y-8">
          {/* Clima */}
          <WeatherSection data={weather} lang={lang} />

          {/* Naturaleza — 3 columnas */}
          {(fauna.length > 0 || flora.length > 0 || fungi.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fauna.length > 0 && (
                <SightingPanel title={t.fauna}>
                  <SightingList sightings={fauna} lang={lang} />
                </SightingPanel>
              )}
              {flora.length > 0 && (
                <SightingPanel title={t.flora}>
                  <SightingList sightings={flora} lang={lang} />
                </SightingPanel>
              )}
              {fungi.length > 0 && (
                <SightingPanel title={t.fungi}>
                  <SightingList sightings={fungi} lang={lang} />
                </SightingPanel>
              )}
            </div>
          )}

          {/* Glaciares + Astronomía — 2 columnas */}
          {(glaciers.length > 0 || moon) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlacierSection data={glaciers} lang={lang} />
              <MoonSection moon={moon} lang={lang} />
            </div>
          )}

          {/* Fotografía */}
          {photos.length > 0 && <PhotoGrid photos={photos} lang={lang} />}

          {/* Impacto industrial — solo cuando hay datos */}
          <ImpactoSection data={impacto} lang={lang} />
        </div>
      </PageShell>
    </Section>
  )
}
