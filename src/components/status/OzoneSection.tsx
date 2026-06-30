import { Layers, ShieldAlert } from "lucide-react"
import { OzoneMapClient } from "./OzoneMapClient"

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
      <p className="text-[11.5px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Por qué el UV es tan alto en el sur de la Patagonia
      </p>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-3 mb-4">
          <Layers size={20} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-primary" />
          <div>
            <p className="text-base font-semibold text-foreground">La capa de ozono</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Una franja de la estratósfera (15-35 km de altura) que absorbe casi toda la radiación UV-B del sol.
              Donde es más fina, más UV llega al suelo.
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          <strong className="text-foreground font-medium">¿Qué es?</strong> Una zona de la Antártida donde la capa de
          ozono se adelgaza tanto en primavera que deja pasar mucha más radiación UV de la normal.
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          <strong className="text-foreground font-medium">¿Lo causamos los humanos?</strong> Sí. Los CFC —gases que se
          usaban en aerosoles, heladeras y aires acondicionados hasta los años 80— liberan cloro al llegar a la
          estratósfera. Ese cloro actúa como un catalizador que rompe las moléculas de ozono (O₃) una y otra vez, sin
          gastarse. El Protocolo de Montreal (1987) prohibió esos gases en casi todo el mundo, pero los CFC tardan
          décadas en desaparecer de la atmósfera.
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          <strong className="text-foreground font-medium">¿Por qué pasa en el sur?</strong> En invierno, sobre la
          Antártida se forma el vórtice polar: un remolino de viento que aísla ese aire del resto del planeta y lo
          enfría muchísimo. Con la primera luz de la primavera (septiembre-octubre), esas temperaturas extremas
          activan al cloro y el ozono se destruye rápido ahí adentro. El Ártico no tiene un vórtice tan estable, por
          eso el agujero grande es casi exclusivo del hemisferio sur.
        </p>

        <p className="text-sm text-muted-foreground mb-4">
          <strong className="text-foreground font-medium">¿Hasta dónde llega?</strong> El agujero está centrado en la
          Antártida, pero el vórtice se estira y a veces pasa sobre el extremo sur de Sudamérica. Lo más habitual es
          que cubra Tierra del Fuego y Santa Cruz (Ushuaia, Punta Arenas, Río Gallegos); en los eventos más extremos su
          borde llegó a tocar el sur de Chubut, a la altura de Comodoro Rivadavia. Cuando pasa por arriba, el UV en esas
          ciudades puede saltar muy por encima de lo normal para esa latitud — incluso en días fríos y nublados, porque
          las nubes no bloquean el UV-B como uno espera.
        </p>

        {/* Mapa de alcance */}
        <div className="rounded-xl overflow-hidden border border-border mb-4" style={{ height: 320 }}>
          <OzoneMapClient />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-[11.5px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500" />
            Alcance típico (Tierra del Fuego y Santa Cruz)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500 border-dashed" />
            Alcance en eventos extremos (hasta sur de Chubut)
          </span>
        </div>

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
                className="flex-1 text-center text-[10.5px] text-muted-foreground"
              >
                {m.label}
              </span>
            ))}
          </div>
          <p className="text-[11.5px] text-muted-foreground mt-2">
            Probabilidad relativa de que el agujero de ozono afecte el sur de la Patagonia, por mes (patrón histórico,
            no una medición en vivo). Pico habitual: septiembre-octubre.
          </p>
        </div>

        <div className="flex items-start gap-1.5 mt-3 p-2.5 rounded-lg bg-amber-500/10 text-sm text-foreground">
          <ShieldAlert size={14} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-amber-500" />
          <span>
            <strong className="font-semibold">Sí, hace falta protector solar SPF 30+ todo el año</strong> en el sur de
            la Patagonia, y es no negociable entre agosto y diciembre. El UV-B atraviesa nubosidad, así que un día
            gris no es un día seguro.
          </span>
        </div>

        <p className="text-[11.5px] text-muted-foreground mt-3">
          El agujero se achica desde 1987 (Protocolo de Montreal, que prohibió los CFC) — se espera que la Antártida
          recupere sus niveles de ozono pre-1980 recién hacia 2066.
        </p>
      </div>

      <p className="text-[11.5px] text-muted-foreground mt-2 text-right">
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
