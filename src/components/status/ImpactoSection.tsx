import { Factory, AlertTriangle, CheckCircle } from "lucide-react"
import type { ImpactoData } from "@/lib/apis/openaq"

interface Props {
  data: ImpactoData
  lang?: "es" | "en"
}

function levelFor(value: number, limit: number) {
  const ratio = value / limit
  if (ratio >= 1.5) return "alta"
  if (ratio >= 0.75) return "moderada"
  return "ok"
}

const LEVEL_STYLES = {
  alta:     { card: "border-red-500/40 bg-red-500/5",    text: "text-red-500",    badge: "text-red-500 bg-red-500/10" },
  moderada: { card: "border-amber-500/40 bg-amber-500/5", text: "text-amber-500", badge: "text-amber-500 bg-amber-500/10" },
  ok:       { card: "border-green-500/40 bg-green-500/5", text: "text-green-600", badge: "text-green-600 bg-green-500/10" },
}

const TEXT = {
  es: {
    level: { alta: "Supera OMS", moderada: "Cerca del límite", ok: "Dentro del límite" },
    title: "Impacto — calidad del aire en zonas extractivas",
    monitoring: "Monitoreo de contaminantes · comparado con límites OMS 2021",
    limit: "límite OMS",
    high: "Niveles que superan recomendaciones OMS — riesgo para personas sensibles",
    moderate: "Niveles en zona de precaución según OMS",
    ok: "Todos los parámetros dentro de los límites recomendados por la OMS",
    source: "Fuente",
    whoLimits: "Límites OMS 2021",
  },
  en: {
    level: { alta: "Above WHO", moderada: "Near the limit", ok: "Within the limit" },
    title: "Impact — air quality in extraction areas",
    monitoring: "Pollutant monitoring · compared with the 2021 WHO limits",
    limit: "WHO limit",
    high: "Levels above WHO guidelines — a risk for sensitive people",
    moderate: "Levels in the WHO caution range",
    ok: "Every reading within the limits recommended by the WHO",
    source: "Source",
    whoLimits: "WHO limits 2021",
  },
}

export function ImpactoSection({ data, lang = "es" }: Props) {
  const t = TEXT[lang]
  if (!data.readings.length) return null

  const zones = [...new Set(data.readings.map((r) => r.zone))]
  const worstLevel = data.readings.some((r) => levelFor(r.value, r.whoLimit) === "alta")
    ? "alta"
    : data.readings.some((r) => levelFor(r.value, r.whoLimit) === "moderada")
      ? "moderada"
      : "ok"

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        {t.title}
      </p>

      <div className={`rounded-xl border p-4 ${LEVEL_STYLES[worstLevel].card}`}>
        <div className="flex items-start gap-3 mb-4">
          <Factory
            size={20}
            strokeWidth={1.5}
            className={`flex-shrink-0 mt-0.5 ${LEVEL_STYLES[worstLevel].text}`}
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {zones.join(" · ")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.monitoring}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.readings.map((r, i) => {
            const level = levelFor(r.value, r.whoLimit)
            const style = LEVEL_STYLES[level]
            const pct = Math.min(Math.round((r.value / r.whoLimit) * 100), 200)
            return (
              <div key={i} className="bg-background/50 rounded-lg p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{r.label}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${style.badge}`}>
                    {t.level[level]}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-bold tabular-nums ${style.text}`}>{r.value}</span>
                  <span className="text-xs text-muted-foreground">{r.unit}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      level === "alta" ? "bg-red-500" : level === "moderada" ? "bg-amber-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {r.zone} · {t.limit}: {r.whoLimit} {r.unit}
                </p>
              </div>
            )
          })}
        </div>

        {worstLevel !== "ok" && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
            <AlertTriangle size={11} strokeWidth={1.5} />
            <span>
              {worstLevel === "alta" ? t.high : t.moderate}
            </span>
          </div>
        )}

        {worstLevel === "ok" && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
            <CheckCircle size={11} strokeWidth={1.5} />
            <span>{t.ok}</span>
          </div>
        )}
      </div>

      <p className="text-[10px] text-muted-foreground mt-2 text-right">
        {t.source}:{" "}
        <a
          href="https://explore.openaq.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          OpenAQ
        </a>
        {" · "}
        <a
          href="https://www.who.int/news-room/feature-stories/detail/what-are-the-who-air-quality-guidelines"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          {t.whoLimits}
        </a>
      </p>
    </div>
  )
}
