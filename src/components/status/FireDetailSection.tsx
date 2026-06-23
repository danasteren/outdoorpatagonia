import { Flame, AlertTriangle } from "lucide-react"
import type { FireSummary } from "@/lib/apis/nasa-firms"
import { FireMapClient } from "./FireMapClient"

function ConfidenceBadge({ c }: { c: string }) {
  const isHigh = c === "h"
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
        isHigh ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
      }`}
    >
      {isHigh ? "Alta" : "Nominal"}
    </span>
  )
}

export function FireDetailSection({ data }: { data: FireSummary }) {
  const severity =
    data.count >= 10 ? "alta" : data.count >= 3 ? "moderada" : "baja"

  const summaryColors = {
    alta: "border-red-500/40 bg-red-500/5 text-red-500",
    moderada: "border-amber-500/40 bg-amber-500/5 text-amber-500",
    baja: "border-yellow-500/40 bg-yellow-500/5 text-yellow-500",
  }[severity]

  const sorted = [...data.hotspots].sort((a, b) => b.frp - a.frp)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Incendios activos — Patagonia
        </p>
        <span className="text-[10px] text-muted-foreground">
          NASA FIRMS · VIIRS SNPP · últimas 24 h
        </span>
      </div>

      {data.count === 0 ? (
        <div className="rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">
          Sin focos de incendio detectados en las últimas 24 horas.
        </div>
      ) : (
        <>
          {/* Resumen */}
          <div className={`rounded-xl border p-4 flex items-start gap-3 ${summaryColors}`}>
            <Flame size={20} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {data.count} foco{data.count !== 1 ? "s" : ""} detectado{data.count !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Actividad {severity} · última detección {data.lastDate}
              </p>
              {data.count >= 3 && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                  <AlertTriangle size={11} strokeWidth={1.5} />
                  Verificar alertas locales antes de salir al campo
                </div>
              )}
            </div>
          </div>

          {/* Mapa */}
          <div className="rounded-xl overflow-hidden border border-border" style={{ height: 420 }}>
            <FireMapClient hotspots={data.hotspots} />
          </div>

          {/* Tabla */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {["Fecha", "Latitud", "Longitud", "FRP (MW)", "Brillo (K)", "Confianza"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((h, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                        {h.acqDate}
                      </td>
                      <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">
                        {h.latitude.toFixed(4)}
                      </td>
                      <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">
                        {h.longitude.toFixed(4)}
                      </td>
                      <td className="px-4 py-2.5 text-xs font-medium text-foreground">
                        {h.frp.toFixed(1)}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">
                        {h.brightness.toFixed(0)}
                      </td>
                      <td className="px-4 py-2.5">
                        <ConfidenceBadge c={h.confidence} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
