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
import { fetchPatagoniaFires } from "@/lib/apis/nasa-firms"
import { fetchImpactoData } from "@/lib/apis/openaq"
import { getMoonData } from "@/lib/astronomy"
import { WeatherSection } from "./WeatherSection"
import { GlacierSection } from "./GlacierSection"
import { SightingList } from "./SightingList"
import { MoonSection } from "./MoonSection"
import { FireSection } from "./FireSection"
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

export async function StatusBoard() {
  const [
    weatherResult,
    glacierResult,
    faunaResult,
    floraResult,
    fungiResult,
    photosResult,
    fireResult,
    impactoResult,
  ] = await Promise.allSettled([
    fetchWeather(),
    fetchGlacierData(),
    fetchPatagoniaFauna(),
    fetchPatagoniaFlora(),
    fetchPatagoniaFungi(),
    fetchPatagoniaPhotos(),
    fetchPatagoniaFires(),
    fetchImpactoData(),
  ])

  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : []
  const glaciers = glacierResult.status === "fulfilled" ? glacierResult.value : []
  const fauna = faunaResult.status === "fulfilled" ? faunaResult.value : []
  const flora = floraResult.status === "fulfilled" ? floraResult.value : []
  const fungi = fungiResult.status === "fulfilled" ? fungiResult.value : []
  const photos = photosResult.status === "fulfilled" ? photosResult.value : []
  const fires = fireResult.status === "fulfilled" ? fireResult.value : { count: 0, hotspots: [], lastDate: "" }
  const impacto = impactoResult.status === "fulfilled" ? impactoResult.value : { readings: [], lastDate: "" }

  const moon = getMoonData()

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
          <h2 className="text-lg font-bold font-heading">Estado de la Patagonia</h2>
          <Badge variant="outline" size="sm">Actualizado cada hora</Badge>
        </div>

        <div className="space-y-8">
          {/* Clima */}
          <WeatherSection data={weather} />

          {/* Naturaleza — 3 columnas */}
          {(fauna.length > 0 || flora.length > 0 || fungi.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fauna.length > 0 && (
                <SightingPanel title="Fauna avistada — últimos 14 días">
                  <SightingList sightings={fauna} />
                </SightingPanel>
              )}
              {flora.length > 0 && (
                <SightingPanel title="Flora observada — últimos 14 días">
                  <SightingList sightings={flora} />
                </SightingPanel>
              )}
              {fungi.length > 0 && (
                <SightingPanel title="Hongos registrados — últimos 14 días">
                  <SightingList sightings={fungi} />
                </SightingPanel>
              )}
            </div>
          )}

          {/* Glaciares + Astronomía — 2 columnas */}
          {(glaciers.length > 0 || moon) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlacierSection data={glaciers} />
              <MoonSection moon={moon} />
            </div>
          )}

          {/* Fotografía */}
          {photos.length > 0 && <PhotoGrid photos={photos} />}

          {/* Incendios — solo cuando hay datos */}
          <FireSection data={fires} />

          {/* Impacto industrial — solo cuando hay datos */}
          <ImpactoSection data={impacto} />
        </div>
      </PageShell>
    </Section>
  )
}
