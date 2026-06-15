import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  MapPin,
  Eye,
} from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { Card, CardBody, Badge } from "@/components/primitives"
import { fetchWeather, type WeatherData } from "@/lib/apis/openmeteo"
import { fetchPatagoniaFauna, type Sighting } from "@/lib/apis/inaturalist"

function WeatherIcon({
  code,
  size = 20,
  strokeWidth = 1.5,
  className,
}: {
  code: number
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const props = { size, strokeWidth, className }
  if (code === 0) return <Sun {...props} />
  if (code <= 3) return <Cloud {...props} />
  if (code <= 48) return <Wind {...props} />
  if (code <= 67) return <CloudRain {...props} />
  if (code <= 77) return <CloudSnow {...props} />
  if (code <= 82) return <CloudRain {...props} />
  if (code <= 86) return <CloudSnow {...props} />
  return <CloudLightning {...props} />
}

function WeatherCardItem({ data }: { data: WeatherData }) {
  return (
    <Card variant="elevated" className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {data.location}
        </span>
        <WeatherIcon code={data.weatherCode} size={18} className="text-primary" />
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold font-heading leading-none">
          {data.temperature}°
        </span>
        <span className="text-xs text-muted-foreground pb-0.5">{data.condition}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Wind size={11} strokeWidth={1.5} />
        <span>{data.windSpeed} km/h</span>
      </div>
    </Card>
  )
}

function FaunaSightingRow({ sighting }: { sighting: Sighting }) {
  const displayName = sighting.commonName
    ? sighting.commonName.charAt(0).toUpperCase() + sighting.commonName.slice(1)
    : sighting.speciesName
  const italicName = sighting.commonName ? sighting.speciesName : null

  return (
    <a
      href={sighting.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 hover:text-primary transition-colors group"
    >
      {sighting.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sighting.imageUrl}
          alt={displayName}
          className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Eye size={14} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight truncate group-hover:text-primary transition-colors">
          {displayName}
        </p>
        {italicName && (
          <p className="text-xs italic text-muted-foreground truncate">{italicName}</p>
        )}
        {sighting.placeGuess && (
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{sighting.placeGuess}</p>
          </div>
        )}
      </div>
      {sighting.observedOn && (
        <span className="text-[10px] text-muted-foreground flex-shrink-0 self-start pt-0.5">
          {sighting.observedOn}
        </span>
      )}
    </a>
  )
}

export async function StatusBoard() {
  const [weatherResult, faunaResult] = await Promise.allSettled([
    fetchWeather(),
    fetchPatagoniaFauna(),
  ])

  const weatherData = weatherResult.status === "fulfilled" ? weatherResult.value : []
  const faunaData = faunaResult.status === "fulfilled" ? faunaResult.value : []

  if (weatherData.length === 0 && faunaData.length === 0) return null

  return (
    <Section spacing="sm" background="muted">
      <PageShell>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold font-heading">Estado de la Patagonia</h2>
          <Badge variant="outline" size="sm">Actualizado cada hora</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {weatherData.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Clima en puntos clave
              </p>
              <div className="grid grid-cols-2 gap-3">
                {weatherData.map((w) => (
                  <WeatherCardItem key={w.location} data={w} />
                ))}
              </div>
            </div>
          )}

          {faunaData.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Fauna avistada — últimos 7 días
              </p>
              <Card variant="default">
                <CardBody className="py-1 px-4">
                  {faunaData.map((s) => (
                    <FaunaSightingRow key={s.id} sighting={s} />
                  ))}
                </CardBody>
              </Card>
              <p className="text-[10px] text-muted-foreground mt-2 text-right">
                Fuente:{" "}
                <a
                  href="https://www.inaturalist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  iNaturalist
                </a>
              </p>
            </div>
          )}
        </div>
      </PageShell>
    </Section>
  )
}
