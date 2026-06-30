import { Layers, ShieldAlert } from "lucide-react"

const MONTHS = [
  { label: "Ene", risk: 5 },
  { label: "Feb", risk: 5 },
  { label: "Mar", risk: 5 },
  { label: "Abr", risk: 5 },
  { label: "May", risk: 10 },
  { label: "Jun", risk: 15 },
  { label: "Jul", risk: 25 },
  { label: "Ago", risk: 55 },
  { label: "Sep", risk: 95 },
  { label: "Oct", risk: 100 },
  { label: "Nov", risk: 70 },
  { label: "Dic", risk: 30 },
]

function barColor(risk: number): string {
  if (risk >= 70) return "bg-red-500"
  if (risk >= 40) return "bg-amber-500"
  return "bg-teal"
}

export function OzoneSection() {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Por qué el UV es tan alto en el sur de la Patagonia
      </p>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-3 mb-4">
          <Layers size={20} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">La capa de ozono</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Una franja de la estratósfera (15-35 km de altura) que absorbe casi toda la radiación UV-B del sol.
              Donde es más fina, más UV llega al suelo.
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Cada primavera austral se forma el <strong className="text-foreground font-medium">agujero de ozono antártico</strong>:
          el vórtice polar aísla el aire sobre la Antártida y compuestos de cloro liberados por los viejos CFC destruyen
          el ozono local. Cuando ese vórtice se estira hacia el norte, el aire empobrecido en ozono pasa sobre Ushuaia,
          Punta Arenas y Río Gallegos — y el UV ahí puede saltar muy por encima de lo normal para esa latitud, incluso en días fríos y nublados.
        </p>

        {/* Gráfico estacional */}
        <div className="bg-background/50 rounded-lg p-3">
          <div className="flex items-end justify-between gap-1 h-20">
            {MONTHS.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className={`w-full rounded-t-sm transition-all ${barColor(m.risk)}`}
                  style={{ height: `${Math.max(m.risk, 4)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-1 mt-1.5">
            {MONTHS.map((m) => (
              <span
                key={m.label}
                className="flex-1 text-center text-[9px] text-muted-foreground"
              >
                {m.label}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Probabilidad relativa de que el agujero de ozono afecte el sur de la Patagonia, por mes (patrón histórico,
            no una medición en vivo). Pico habitual: septiembre-octubre.
          </p>
        </div>

        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <ShieldAlert size={11} strokeWidth={1.5} />
          <span>
            El agujero se achica desde 1987 (Protocolo de Montreal, que prohibió los CFC) — se espera que la Antártida
            recupere sus niveles de ozono pre-1980 recién hacia 2066.
          </span>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground mt-2 text-right">
        Fuente:{" "}
        <a
          href="https://ozonewatch.gsfc.nasa.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          NASA Ozone Watch
        </a>
      </p>
    </div>
  )
}
