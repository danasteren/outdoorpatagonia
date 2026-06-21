import {
  Snowflake,
  Wind,
  CloudSnow,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
} from "lucide-react"
import { Card } from "@/components/primitives"
import type { GlacierData } from "@/lib/apis/openmeteo"

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  const props = { size: 16, strokeWidth: 1.5, className }
  if (code === 0) return <Sun {...props} />
  if (code <= 3) return <Cloud {...props} />
  if (code <= 67) return <CloudRain {...props} />
  if (code <= 77) return <CloudSnow {...props} />
  if (code <= 86) return <CloudSnow {...props} />
  return <CloudLightning {...props} />
}

function GlacierCard({ data }: { data: GlacierData }) {
  return (
    <Card variant="elevated" className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">
            {data.location}
          </p>
          <p className="text-[9px] text-muted-foreground">{data.sublabel}</p>
        </div>
        <WeatherIcon code={data.weatherCode} className="text-primary flex-shrink-0" />
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold font-heading leading-none">
          {data.temperature}°
        </span>
        <span className="text-xs text-muted-foreground pb-0.5">{data.condition}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Wind size={11} strokeWidth={1.5} />
          {data.windSpeed} km/h
        </span>
        {data.snowfall > 0 && (
          <span className="flex items-center gap-1 text-blue-400">
            <Snowflake size={11} strokeWidth={1.5} />
            {data.snowfall.toFixed(1)} mm/h
          </span>
        )}
      </div>
    </Card>
  )
}

interface Props {
  data: GlacierData[]
}

export function GlacierSection({ data }: Props) {
  if (data.length === 0) return null
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Glaciares — temperatura actual
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.map((g) => (
          <GlacierCard key={g.location} data={g} />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-right">
        Fuente:{" "}
        <a
          href="https://open-meteo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Open-Meteo
        </a>
      </p>
    </div>
  )
}
