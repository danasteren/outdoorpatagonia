import { Flame, AlertTriangle } from "lucide-react"
import type { FireSummary } from "@/lib/apis/nasa-firms"

interface Props {
  data: FireSummary
}

export function FireSection({ data }: Props) {
  if (data.count === 0) return null

  const severity = data.count >= 10 ? "alta" : data.count >= 3 ? "moderada" : "baja"
  const severityColor =
    severity === "alta"
      ? "border-red-500/40 bg-red-500/5"
      : severity === "moderada"
        ? "border-amber-500/40 bg-amber-500/5"
        : "border-yellow-500/40 bg-yellow-500/5"
  const iconColor =
    severity === "alta"
      ? "text-red-500"
      : severity === "moderada"
        ? "text-amber-500"
        : "text-yellow-500"

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Impacto ambiental — incendios activos
      </p>
      <div className={`rounded-xl border p-4 ${severityColor}`}>
        <div className="flex items-start gap-3">
          <Flame size={20} strokeWidth={1.5} className={`flex-shrink-0 mt-0.5 ${iconColor}`} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              {data.count} foco{data.count !== 1 ? "s" : ""} detectado{data.count !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Actividad {severity} en Patagonia
              {data.lastDate ? ` · ${data.lastDate}` : ""}
            </p>
            {data.count >= 3 && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <AlertTriangle size={11} strokeWidth={1.5} />
                <span>Verificar alertas locales antes de salir al campo</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-right">
        Fuente:{" "}
        <a
          href="https://firms.modaps.eosdis.nasa.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          NASA FIRMS
        </a>
      </p>
    </div>
  )
}
