import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
} from "lucide-react"
import { Card } from "@/components/primitives"
import type { WeatherData } from "@/lib/apis/openmeteo"

function WeatherIcon({
  code,
  size = 18,
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

function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <Card variant="elevated" className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {data.location}
        </span>
        <WeatherIcon code={data.weatherCode} className="text-primary" />
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

interface Props {
  data: WeatherData[]
}

export function WeatherSection({ data }: Props) {
  if (data.length === 0) return null
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Clima en puntos clave
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((w) => (
          <WeatherCard key={w.location} data={w} />
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
