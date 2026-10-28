import { Layers, ShieldAlert } from "lucide-react"
import { OzoneMapClient } from "./OzoneMapClient"

// Riesgo relativo por mes, de enero a diciembre
const MONTH_RISK = [5, 5, 5, 5, 10, 15, 25, 55, 95, 100, 70, 30]

const TEXT = {
  es: {
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    eyebrow: "Por qué el UV es tan alto en el sur de la Patagonia",
    layerTitle: "La capa de ozono",
    layerText:
      "Una franja de la estratósfera (15-35 km de altura) que absorbe casi toda la radiación UV-B del sol. Donde es más fina, más UV llega al suelo.",
    faq: [
      {
        q: "¿Qué es?",
        a: "Una zona de la Antártida donde la capa de ozono se adelgaza tanto en primavera que deja pasar mucha más radiación UV de la normal.",
      },
      {
        q: "¿Lo causamos los humanos?",
        a: "Sí. Los CFC —gases que se usaban en aerosoles, heladeras y aires acondicionados hasta los años 80— liberan cloro al llegar a la estratósfera. Ese cloro actúa como un catalizador que rompe las moléculas de ozono (O₃) una y otra vez, sin gastarse. El Protocolo de Montreal (1987) prohibió esos gases en casi todo el mundo, pero los CFC tardan décadas en desaparecer de la atmósfera.",
      },
      {
        q: "¿Por qué pasa en el sur?",
        a: "En invierno, sobre la Antártida se forma el vórtice polar: un remolino de viento que aísla ese aire del resto del planeta y lo enfría muchísimo. Con la primera luz de la primavera (septiembre-octubre), esas temperaturas extremas activan al cloro y el ozono se destruye rápido ahí adentro. El Ártico no tiene un vórtice tan estable, por eso el agujero grande es casi exclusivo del hemisferio sur.",
      },
      {
        q: "¿Hasta dónde llega?",
        a: "El agujero está centrado en la Antártida, pero el vórtice se estira y a veces pasa sobre el extremo sur de Sudamérica. Lo más habitual es que cubra Tierra del Fuego y Santa Cruz (Ushuaia, Punta Arenas, Río Gallegos); en los eventos más extremos su borde llegó a tocar el sur de Chubut, a la altura de Comodoro Rivadavia. Cuando pasa por arriba, el UV en esas ciudades puede saltar muy por encima de lo normal para esa latitud — incluso en días fríos y nublados, porque las nubes no bloquean el UV-B como uno espera.",
      },
    ],
    typical: "Alcance típico (Tierra del Fuego y Santa Cruz)",
    extreme: "Alcance en eventos extremos (hasta sur de Chubut)",
    chartNote:
      "Probabilidad relativa de que el agujero de ozono afecte el sur de la Patagonia, por mes (patrón histórico, no una medición en vivo). Pico habitual: septiembre-octubre.",
    sunscreenTitle: "Con protector solar SPF 30+ estás cubierto.",
    sunscreen:
      "Reaplicado cada 2-3 horas, podés caminar, hacer trekking y estar al aire libre sin problema — eso sí, es no negociable entre agosto y diciembre, y también con cielo nublado, porque el UV-B atraviesa las nubes. Sin protector, la piel se quema mucho más rápido de lo normal para esta latitud, sobre todo en los picos de primavera. No es motivo para cambiar de planes: es el mismo hábito de playa, aplicado todo el año.",
    recovery:
      "El agujero se achica desde 1987 (Protocolo de Montreal, que prohibió los CFC) — se espera que la Antártida recupere sus niveles de ozono pre-1980 recién hacia 2066.",
    source: "Fuente",
  },
  en: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    eyebrow: "Why UV is so high in southern Patagonia",
    layerTitle: "The ozone layer",
    layerText:
      "A band of the stratosphere (15-35 km up) that absorbs almost all of the sun's UV-B radiation. Where it is thinner, more UV reaches the ground.",
    faq: [
      {
        q: "What is it?",
        a: "An area over Antarctica where the ozone layer gets so thin in spring that it lets through much more UV radiation than usual.",
      },
      {
        q: "Did humans cause it?",
        a: "Yes. CFCs —gases used in aerosols, fridges and air conditioners until the 1980s— release chlorine when they reach the stratosphere. That chlorine acts as a catalyst that breaks ozone molecules (O₃) apart again and again without being used up. The Montreal Protocol (1987) banned those gases almost everywhere, but CFCs take decades to leave the atmosphere.",
      },
      {
        q: "Why does it happen in the south?",
        a: "In winter, the polar vortex forms over Antarctica: a whirl of wind that isolates that air from the rest of the planet and makes it extremely cold. With the first spring sunlight (September-October), those extreme temperatures activate the chlorine and ozone is destroyed quickly inside the vortex. The Arctic doesn't have such a stable vortex, which is why the big hole is almost exclusive to the southern hemisphere.",
      },
      {
        q: "How far does it reach?",
        a: "The hole is centered on Antarctica, but the vortex stretches and sometimes passes over the southern tip of South America. Most often it covers Tierra del Fuego and Santa Cruz (Ushuaia, Punta Arenas, Río Gallegos); in the most extreme events its edge has reached southern Chubut, around Comodoro Rivadavia. When it passes overhead, UV in those cities can jump far above normal for that latitude — even on cold, cloudy days, because clouds don't block UV-B the way you'd expect.",
      },
    ],
    typical: "Typical reach (Tierra del Fuego and Santa Cruz)",
    extreme: "Reach in extreme events (as far as southern Chubut)",
    chartNote:
      "Relative probability that the ozone hole affects southern Patagonia, by month (historical pattern, not a live measurement). Usual peak: September-October.",
    sunscreenTitle: "SPF 30+ sunscreen keeps you covered.",
    sunscreen:
      "Reapplied every 2-3 hours, you can walk, trek and spend time outdoors without a problem — but it's non-negotiable from August to December, and on cloudy days too, because UV-B goes through clouds. Without sunscreen, skin burns much faster than is normal for this latitude, especially at the spring peaks. It's no reason to change your plans: it's the same beach habit, applied all year.",
    recovery:
      "The hole has been shrinking since 1987 (the Montreal Protocol, which banned CFCs) — Antarctica is expected to get back to its pre-1980 ozone levels only around 2066.",
    source: "Source",
  },
}

function barColor(risk: number): string {
  if (risk >= 70) return "bg-red-500"
  if (risk >= 40) return "bg-amber-500"
  return "bg-teal"
}

export function OzoneSection({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = TEXT[lang]
  const months = t.months.map((label, i) => ({ label, risk: MONTH_RISK[i] }))
  return (
    <div>
      <p className="text-[11.5px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        {t.eyebrow}
      </p>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-3 mb-4">
          <Layers size={20} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-primary" />
          <div>
            <p className="text-base font-semibold text-foreground">{t.layerTitle}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t.layerText}
            </p>
          </div>
        </div>

        {t.faq.map(({ q, a }, i) => (
          <p key={q} className={`text-sm text-muted-foreground ${i === t.faq.length - 1 ? "mb-4" : "mb-2"}`}>
            <strong className="text-foreground font-medium">{q}</strong> {a}
          </p>
        ))}

        {/* Mapa de alcance + gráfico estacional */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="relative isolate rounded-xl overflow-hidden border border-border" style={{ height: 320 }}>
              <OzoneMapClient lang={lang} />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11.5px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500" />
                {t.typical}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500 border-dashed" />
                {t.extreme}
              </span>
            </div>
          </div>

          <div className="bg-background/50 rounded-lg p-3 h-full flex flex-col">
            <div className="flex-1 flex items-end justify-between gap-1 min-h-20">
              {months.map((m) => (
                <div key={m.label} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-t-sm transition-all ${barColor(m.risk)}`}
                    style={{ height: `${Math.max(m.risk, 4)}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-1 mt-1.5">
              {months.map((m) => (
                <span
                  key={m.label}
                  className="flex-1 text-center text-[10.5px] text-muted-foreground"
                >
                  {m.label}
                </span>
              ))}
            </div>
            <p className="text-[11.5px] text-muted-foreground mt-2">
              {t.chartNote}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-1.5 mt-3 p-2.5 rounded-lg bg-amber-500/10 text-sm text-foreground">
          <ShieldAlert size={14} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-amber-500" />
          <span>
            <strong className="font-semibold">{t.sunscreenTitle}</strong> {t.sunscreen}
          </span>
        </div>

        <p className="text-[11.5px] text-muted-foreground mt-3">
          {t.recovery}
        </p>
      </div>

      <p className="text-[11.5px] text-muted-foreground mt-2 text-right">
        {t.source}:{" "}
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
