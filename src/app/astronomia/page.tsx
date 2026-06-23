import type { Metadata } from "next"
import {
  Moon,
  Stars,
  Telescope,
  CalendarDays,
  MapPin,
  Sparkles,
  Star,
  Sun,
  Orbit,
  Zap,
} from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { Card } from "@/components/primitives"
import { getMoonData } from "@/lib/astronomy"
import type { StargazingQuality } from "@/lib/astronomy"

export const metadata: Metadata = {
  title: "Astronomía en Patagonia — cielos oscuros y observación | Outdoor Patagonia",
  description:
    "Fase lunar, Vía Láctea, lluvias de meteoros y eventos astronómicos. Patagonia es uno de los mejores cielos oscuros del mundo.",
  openGraph: {
    title: "Astronomía en Patagonia — cielos oscuros y observación",
    description:
      "Fase lunar, Vía Láctea, lluvias de meteoros y eventos astronómicos desde los cielos oscuros de la Patagonia.",
  },
}

// ─── Static data ──────────────────────────────────────────────────────────────

type MeteorShower = {
  nombre: string
  pico: string
  tasaMaxima: number
  calidad: "excelente" | "buena" | "regular"
  nota: string
  fechaISO: string
}

const METEOROS: MeteorShower[] = [
  {
    nombre: "η Acuáridas",
    pico: "6 de mayo, 2026",
    tasaMaxima: 50,
    calidad: "excelente",
    nota: "La mejor lluvia austral del año. El radiante de Acuario queda alto en el cielo desde Patagonia.",
    fechaISO: "2026-05-06",
  },
  {
    nombre: "δ Acuáridas Sur",
    pico: "30 de julio, 2026",
    tasaMaxima: 25,
    calidad: "buena",
    nota: "Buena visibilidad desde latitudes australes. Se superpone con el inicio de las Perseidas.",
    fechaISO: "2026-07-30",
  },
  {
    nombre: "Perseidas",
    pico: "12 de agosto, 2026",
    tasaMaxima: 100,
    calidad: "regular",
    nota: "Muy populares en el hemisferio norte. Desde Patagonia el radiante queda bajo, pero igual vale.",
    fechaISO: "2026-08-12",
  },
  {
    nombre: "Oriónidas",
    pico: "21 de octubre, 2026",
    tasaMaxima: 20,
    calidad: "buena",
    nota: "Restos del cometa Halley. Orión sube bien desde latitudes australes en primavera.",
    fechaISO: "2026-10-21",
  },
  {
    nombre: "Leónidas",
    pico: "17 de noviembre, 2026",
    tasaMaxima: 15,
    calidad: "buena",
    nota: "Meteoros rápidos y brillantes. Buena visibilidad desde el sur.",
    fechaISO: "2026-11-17",
  },
  {
    nombre: "Gemínidas",
    pico: "13 de diciembre, 2026",
    tasaMaxima: 120,
    calidad: "buena",
    nota: "La lluvia más activa del año. El radiante no sube mucho desde el sur, pero la cantidad compensa.",
    fechaISO: "2026-12-13",
  },
  {
    nombre: "η Acuáridas",
    pico: "6 de mayo, 2027",
    tasaMaxima: 50,
    calidad: "excelente",
    nota: "Segunda oportunidad para la mejor lluvia del hemisferio sur.",
    fechaISO: "2027-05-06",
  },
]

type AstroEvent = {
  nombre: string
  fecha: string
  tipo: "eclipse" | "solsticio" | "equinoccio" | "planeta" | "especial"
  descripcion: string
  fechaISO: string
}

const EVENTOS: AstroEvent[] = [
  {
    nombre: "Lluvia de η Acuáridas",
    fecha: "6 de mayo, 2026",
    tipo: "especial",
    descripcion:
      "La mejor lluvia de meteoros para el hemisferio sur. Hasta 50 meteoros por hora en condiciones ideales. Madrugada hacia el noreste.",
    fechaISO: "2026-05-06",
  },
  {
    nombre: "Solsticio de invierno",
    fecha: "21 de junio, 2026",
    tipo: "solsticio",
    descripcion:
      "La noche más larga del año en el hemisferio sur. En Ushuaia hay más de 17 horas de oscuridad — el momento ideal para la astronomía.",
    fechaISO: "2026-06-21",
  },
  {
    nombre: "Lluvia de η Acuáridas",
    fecha: "6 de mayo, 2027",
    tipo: "especial",
    descripcion:
      "Segunda oportunidad para la mejor lluvia austral. La madrugada del 6 de mayo sigue siendo la cita astronómica más esperada del año en Patagonia.",
    fechaISO: "2027-05-06",
  },
  {
    nombre: "Solsticio de invierno",
    fecha: "21 de junio, 2027",
    tipo: "solsticio",
    descripcion:
      "Nueva noche más larga del año. La Vía Láctea en su máximo esplendor austral. Combinar con luna nueva para cielos perfectos.",
    fechaISO: "2027-06-21",
  },
  {
    nombre: "Eclipse solar total",
    fecha: "2 de agosto, 2027",
    tipo: "eclipse",
    descripcion:
      "Eclipse solar total con camino de totalidad sobre el sur de España, norte de África y Medio Oriente. Desde el extremo norte de Argentina puede verse como eclipse parcial al amanecer.",
    fechaISO: "2027-08-02",
  },
]

type DarkSkySite = {
  nombre: string
  ubicacion: string
  descripcion: string
  destacado: string
}

const SITIOS: DarkSkySite[] = [
  {
    nombre: "El Chaltén",
    ubicacion: "Santa Cruz, Argentina",
    descripcion:
      "A más de 1.300 km de Buenos Aires. Cielo oscuro de clase 2 en la escala Bortle. La Vía Láctea sobre el Fitz Roy es una imagen que no se olvida.",
    destacado: "Vía Láctea + Fitz Roy",
  },
  {
    nombre: "P.N. Perito Moreno",
    ubicacion: "Santa Cruz, Argentina",
    descripcion:
      "El parque nacional menos visitado de Argentina. Horizonte abierto 360°, cero contaminación lumínica, silencio absoluto.",
    destacado: "Cielo oscuro clase 1",
  },
  {
    nombre: "Lago Posadas",
    ubicacion: "Santa Cruz, Argentina",
    descripcion:
      "Valle de la estepa patagónica con horizonte despejado en todas las direcciones. El lago refleja los cielos en noches sin viento.",
    destacado: "Horizonte 360°",
  },
  {
    nombre: "P.N. Tierra del Fuego",
    ubicacion: "Tierra del Fuego, Argentina",
    descripcion:
      "El confín del mundo. En noches de alta actividad solar son posibles las auroras australes (aurora australis). A 12 km de Ushuaia.",
    destacado: "Auroras australes",
  },
  {
    nombre: "P.N. Los Alerces",
    ubicacion: "Chubut, Argentina",
    descripcion:
      "Lagos oscuros entre alerces milenarios. Sin contaminación de ciudades cercanas. Mejores meses: verano austral cuando los cielos están despejados.",
    destacado: "Lagos espejo",
  },
  {
    nombre: "Valle del Río Cisnes",
    ubicacion: "Aysén, Chile",
    descripcion:
      "Zona de bajísimo impacto sobre la Carretera Austral. Uno de los cielos más oscuros de Sudamérica en zona accesible.",
    destacado: "Carretera Austral",
  },
]

type Constellation = {
  nombre: string
  estrella: string
  descripcion: string
  mejorMes: string
  circumpolar: boolean
}

const CONSTELACIONES: Constellation[] = [
  {
    nombre: "Cruz del Sur",
    estrella: "Acrux · Gacrux",
    descripcion:
      "La constelación más icónica del sur. Circumpolar desde Patagonia — nunca se pone. Sus cuatro estrellas señalan el polo sur celeste.",
    mejorMes: "Todo el año",
    circumpolar: true,
  },
  {
    nombre: "Centauro",
    estrella: "Alpha Centauri — 4,37 años luz",
    descripcion:
      "Contiene el sistema estelar más cercano al Sol. A simple vista parece una sola estrella, pero son tres. Circumpolar desde el sur.",
    mejorMes: "Abril – Julio",
    circumpolar: true,
  },
  {
    nombre: "Escorpión",
    estrella: "Antares — supergigante roja",
    descripcion:
      "Una de las constelaciones más espectaculares. Antares es 700 veces más grande que el Sol. Se ve completo desde Patagonia.",
    mejorMes: "Junio – Agosto",
    circumpolar: false,
  },
  {
    nombre: "Sagitario",
    estrella: "Centro galáctico",
    descripcion:
      "La 'tetera' del cielo austral apunta directo al núcleo de la Vía Láctea. La región más densa de estrellas está aquí.",
    mejorMes: "Junio – Septiembre",
    circumpolar: false,
  },
  {
    nombre: "Nubes de Magallanes",
    estrella: "LMC y SMC — galaxias satélite",
    descripcion:
      "Las galaxias satélite más grandes de la Vía Láctea. Visibles a simple vista como manchas difusas. Exclusivas del hemisferio sur.",
    mejorMes: "Octubre – Febrero",
    circumpolar: true,
  },
  {
    nombre: "Acuario",
    estrella: "Radiante de las η Acuáridas",
    descripcion:
      "No destaca a simple vista, pero es el punto de origen de la mejor lluvia de meteoros para Patagonia: las Eta Acuáridas de mayo.",
    mejorMes: "Abril – Junio",
    circumpolar: false,
  },
]

const MILKYWAY = [
  { mes: "Ene", calidad: "fuera" },
  { mes: "Feb", calidad: "regular" },
  { mes: "Mar", calidad: "buena" },
  { mes: "Abr", calidad: "excelente" },
  { mes: "May", calidad: "excelente" },
  { mes: "Jun", calidad: "excelente" },
  { mes: "Jul", calidad: "excelente" },
  { mes: "Ago", calidad: "buena" },
  { mes: "Sep", calidad: "regular" },
  { mes: "Oct", calidad: "fuera" },
  { mes: "Nov", calidad: "fuera" },
  { mes: "Dic", calidad: "fuera" },
] as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PAST_MIN = 1 // show "Anteriores" section when at least this many past items exist

function splitByDate<T extends { fechaISO: string }>(
  items: T[],
  todayISO: string
): { upcoming: T[]; past: T[] } {
  const upcoming = items
    .filter((i) => i.fechaISO >= todayISO)
    .sort((a, b) => a.fechaISO.localeCompare(b.fechaISO))
  const past = items
    .filter((i) => i.fechaISO < todayISO)
    .sort((a, b) => b.fechaISO.localeCompare(a.fechaISO))
  return { upcoming, past }
}

const QUALITY_COLORS: Record<StargazingQuality, string> = {
  excelente: "text-emerald-500",
  buena: "text-sky-400",
  regular: "text-amber-400",
  mala: "text-rose-400",
}

const EVENTO_ICONS: Record<AstroEvent["tipo"], React.FC<{ size: number; strokeWidth: number; className?: string }>> = {
  eclipse: Sun,
  solsticio: Moon,
  equinoccio: Orbit,
  planeta: Stars,
  especial: Sparkles,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AstronomiaPage() {
  const moon = getMoonData()
  const qualityColor = QUALITY_COLORS[moon.stargazingQuality]
  const todayISO = new Date().toISOString().slice(0, 10)

  // SVG moon phase geometry — shadow path computed from ageDays (110×110 viewBox, cx=cy=55, R=42)
  const LUNATION = 29.530588853
  const R = 42
  const moonPhaseAngle = (moon.ageDays / LUNATION) * 2 * Math.PI
  const cosP = Math.cos(moonPhaseAngle)
  const termRx = Math.abs(cosP) * R
  const moonIsWaxing = moon.ageDays < LUNATION / 2
  const termSweep = moonIsWaxing ? (cosP >= 0 ? 0 : 1) : (cosP >= 0 ? 1 : 0)
  const semiArc = moonIsWaxing ? `A ${R} ${R} 0 0 0 55 97` : `A ${R} ${R} 0 0 1 55 97`
  const moonShadowPath = `M 55 13 ${semiArc} A ${termRx.toFixed(2)} ${R} 0 0 ${termSweep} 55 13 Z`
  const moonPhaseIndex =
    moon.ageDays < 1.85 ? 0
    : moon.ageDays < 7.38 ? 1
    : moon.ageDays < 9.22 ? 2
    : moon.ageDays < 14.77 ? 3
    : moon.ageDays < 16.61 ? 4
    : moon.ageDays < 22.15 ? 5
    : moon.ageDays < 23.99 ? 6
    : 7
  const { upcoming: meteorsProximos, past: meteorsPasados } = splitByDate(METEOROS, todayISO)
  const { upcoming: eventosProximos, past: eventosPasados } = splitByDate(EVENTOS, todayISO)

  return (
    <div>
      {/* Hero */}
      <Section
        spacing="lg"
        className="bg-gradient-to-br from-[#0d1117] via-[#0f1d2e] to-[#111827] text-[var(--color-cream)]"
      >
        <PageShell>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-teal-light)] mb-4">
              Cielos oscuros
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Astronomía en la Patagonia
            </h1>
            <p className="text-base md:text-lg text-[var(--color-cream)] opacity-80 leading-relaxed">
              Patagonia tiene algunos de los cielos más oscuros del mundo. Sin contaminación lumínica,
              atmósfera seca y latitud austral: condiciones únicas para ver la Vía Láctea, las Nubes de Magallanes
              y lluvias de meteoros invisibles desde el norte.
            </p>
          </div>
        </PageShell>
      </Section>

      {/* Luna hoy + Temporada Vía Láctea */}
      <Section spacing="md" background="muted">
        <PageShell>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Luna */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Luna hoy
              </p>
              <Card variant="elevated" className="overflow-hidden p-0 h-full flex flex-col">
                {/* ── Fondo espacial ── */}
                <div className="relative bg-[#050d1a] overflow-hidden flex-shrink-0">
                  {/* Nebulosa de fondo */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 70% at 75% 35%, #0f2248 0%, transparent 65%), radial-gradient(ellipse 60% 55% at 25% 75%, #0a1a38 0%, transparent 60%)",
                    }}
                  />
                  {/* Campo de estrellas con parpadeo SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    aria-hidden="true"
                    viewBox="0 0 300 180"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <circle cx="14" cy="19" r="0.8" fill="white" opacity="0.75">
                      <animate attributeName="opacity" values="0.75;0.15;0.75" dur="2.3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="44" cy="11" r="0.5" fill="white" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="84" cy="27" r="0.7" fill="white" opacity="0.65">
                      <animate attributeName="opacity" values="0.65;0.15;0.65" dur="1.9s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="118" cy="7" r="0.6" fill="white" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="218" cy="9" r="0.5" fill="white" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3.7s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="246" cy="23" r="0.8" fill="white" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="276" cy="13" r="0.55" fill="white" opacity="0.55">
                      <animate attributeName="opacity" values="0.55;0.1;0.55" dur="3.0s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="294" cy="34" r="0.7" fill="white" opacity="0.7">
                      <animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="28" cy="52" r="0.5" fill="white" opacity="0.45">
                      <animate attributeName="opacity" values="0.45;0.08;0.45" dur="4.0s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="70" cy="56" r="0.65" fill="white" opacity="0.65">
                      <animate attributeName="opacity" values="0.65;0.15;0.65" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="260" cy="44" r="0.6" fill="white" opacity="0.55">
                      <animate attributeName="opacity" values="0.55;0.1;0.55" dur="2.7s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="291" cy="58" r="0.75" fill="white" opacity="0.75">
                      <animate attributeName="opacity" values="0.75;0.2;0.75" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="9" cy="88" r="0.5" fill="white" opacity="0.45">
                      <animate attributeName="opacity" values="0.45;0.08;0.45" dur="3.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="52" cy="92" r="0.6" fill="white" opacity="0.55">
                      <animate attributeName="opacity" values="0.55;0.1;0.55" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="263" cy="86" r="0.7" fill="white" opacity="0.65">
                      <animate attributeName="opacity" values="0.65;0.15;0.65" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="296" cy="94" r="0.5" fill="white" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;0.08;0.5" dur="3.3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="19" cy="122" r="0.8" fill="white" opacity="0.75">
                      <animate attributeName="opacity" values="0.75;0.2;0.75" dur="1.7s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="70" cy="132" r="0.5" fill="white" opacity="0.45">
                      <animate attributeName="opacity" values="0.45;0.08;0.45" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="268" cy="120" r="0.65" fill="white" opacity="0.65">
                      <animate attributeName="opacity" values="0.65;0.15;0.65" dur="2.0s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="292" cy="136" r="0.5" fill="white" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;0.08;0.5" dur="3.9s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="36" cy="150" r="0.75" fill="white" opacity="0.7">
                      <animate attributeName="opacity" values="0.7;0.18;0.7" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="278" cy="154" r="0.6" fill="white" opacity="0.55">
                      <animate attributeName="opacity" values="0.55;0.1;0.55" dur="2.9s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="130" cy="155" r="0.5" fill="white" opacity="0.4">
                      <animate attributeName="opacity" values="0.4;0.08;0.4" dur="4.3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="175" cy="162" r="0.65" fill="white" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;0.12;0.6" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                  </svg>

                  {/* Luna SVG centrada */}
                  <div className="relative flex flex-col items-center py-7 pb-5">
                    <svg
                      width="116"
                      height="116"
                      viewBox="0 0 110 110"
                      role="img"
                      aria-label={moon.phaseName}
                    >
                      <defs>
                        <radialGradient id="moon-surf" cx="36%" cy="28%" r="72%">
                          <stop offset="0%" stopColor="#fef6e0" />
                          <stop offset="38%" stopColor="#eacd84" />
                          <stop offset="100%" stopColor="#a87616" />
                        </radialGradient>
                        <radialGradient id="moon-shad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#07101e" />
                          <stop offset="100%" stopColor="#030810" />
                        </radialGradient>
                        <radialGradient id="moon-glow-r" cx="50%" cy="50%" r="50%">
                          <stop offset="52%" stopColor="transparent" />
                          <stop offset="100%" stopColor="#c8a040" stopOpacity="0.28" />
                        </radialGradient>
                        <radialGradient id="moon-lit" cx="28%" cy="22%" r="68%">
                          <stop offset="0%" stopColor="rgba(255,248,220,0.18)" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <clipPath id="moon-cp">
                          <circle cx="55" cy="55" r={R} />
                        </clipPath>
                      </defs>
                      {/* Glow exterior animado */}
                      <circle cx="55" cy="55" r="54" fill="url(#moon-glow-r)">
                        <animate attributeName="r" values="54;60;54" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.55;1" dur="4s" repeatCount="indefinite" />
                      </circle>
                      {/* Halo secundario */}
                      <circle cx="55" cy="55" r="49" fill="none" stroke="#d4a840" strokeWidth="0.5" opacity="0.18">
                        <animate attributeName="r" values="49;56;49" dur="6.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.18;0.04;0.18" dur="6.5s" repeatCount="indefinite" />
                      </circle>
                      {/* Superficie lunar */}
                      <circle cx="55" cy="55" r={R} fill="url(#moon-surf)" />
                      {/* Cráteres */}
                      <g clipPath="url(#moon-cp)" fill="none">
                        <circle cx="46" cy="47" r="6.5" stroke="#9a7828" strokeWidth="1.5" opacity="0.2" />
                        <circle cx="65" cy="61" r="4.5" stroke="#9a7828" strokeWidth="1.2" opacity="0.16" />
                        <circle cx="50" cy="67" r="3.5" stroke="#9a7828" strokeWidth="1" opacity="0.14" />
                        <circle cx="71" cy="41" r="2.8" stroke="#9a7828" strokeWidth="0.9" opacity="0.14" />
                        <circle cx="38" cy="63" r="2.2" stroke="#9a7828" strokeWidth="0.8" opacity="0.11" />
                        <circle cx="73" cy="71" r="1.8" stroke="#9a7828" strokeWidth="0.7" opacity="0.1" />
                      </g>
                      {/* Luz solar (highlight tenue) */}
                      <circle cx="55" cy="55" r={R} fill="url(#moon-lit)" clipPath="url(#moon-cp)" />
                      {/* Sombra de fase */}
                      {moon.illumination < 99 && (
                        <path d={moonShadowPath} fill="url(#moon-shad)" clipPath="url(#moon-cp)" opacity="0.94" />
                      )}
                      {/* Limbo */}
                      <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1" />
                    </svg>

                    {/* Nombre de fase */}
                    <p className="text-white/50 text-[11px] font-medium mt-2 tracking-wider uppercase">
                      {moon.phaseName}
                    </p>

                    {/* Indicador de fase — 8 puntos */}
                    <div className="flex items-center gap-2 mt-3">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div
                          key={i}
                          className="rounded-full transition-all duration-300"
                          style={
                            i === moonPhaseIndex
                              ? {
                                  width: 10,
                                  height: 10,
                                  background: "#e8cc82",
                                  boxShadow: "0 0 8px 3px rgba(232,204,130,0.55)",
                                }
                              : {
                                  width: 5,
                                  height: 5,
                                  background: "rgba(255,255,255,0.18)",
                                }
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Stats ── */}
                <div className="p-4 space-y-3 flex-1">
                  {/* Iluminación */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">Iluminación</span>
                      <span className="text-sm font-bold tabular-nums">{moon.illumination}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${moon.illumination}%`,
                          background: "linear-gradient(to right, #b87a10, #f0d878)",
                        }}
                      />
                    </div>
                  </div>
                  {/* Próxima luna llena */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Luna llena</span>
                    <span className="font-semibold">
                      {moon.nextFullDate}
                      {moon.daysUntilFull > 0 && (
                        <span className="text-muted-foreground font-normal ml-1">
                          ({moon.daysUntilFull}d)
                        </span>
                      )}
                    </span>
                  </div>
                  {/* Calidad */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                    <Star size={12} strokeWidth={1.5} className={qualityColor} />
                    <span className={`text-xs font-semibold capitalize ${qualityColor}`}>
                      {moon.stargazingQuality}
                    </span>
                    <span className="text-[11px] text-muted-foreground ml-auto text-right leading-tight">
                      {moon.stargazingNote}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Vía Láctea - temporada */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Vía Láctea — temporada desde Patagonia
              </p>
              <Card variant="elevated" className="p-5 h-full">
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  El centro galáctico es visible desde el hemisferio sur entre marzo y septiembre.
                  Los mejores meses son junio y julio, cuando las noches son más largas y el núcleo
                  de la galaxia queda alto en el cielo.
                </p>
                <div className="grid grid-cols-6 gap-1.5">
                  {MILKYWAY.map(({ mes, calidad }) => (
                    <div key={mes} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-full h-8 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                          calidad === "excelente"
                            ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                            : calidad === "buena"
                              ? "bg-sky-500/20 text-sky-400"
                              : calidad === "regular"
                                ? "bg-amber-500/15 text-amber-500/70"
                                : "bg-muted/50 text-muted-foreground/40"
                        }`}
                      >
                        {calidad === "excelente" ? "★" : calidad === "buena" ? "◐" : "·"}
                      </div>
                      <span className="text-[9px] text-muted-foreground">{mes}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <span>★</span> Excelente
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-sky-400">
                    <span>◐</span> Buena
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                    <span>·</span> Fuera de temporada
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </PageShell>
      </Section>

      {/* Lluvia de meteoros */}
      <Section spacing="md">
        <PageShell>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} strokeWidth={1.5} className="text-[var(--color-teal)]" />
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              Lluvias de meteoros 2026–2027
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {meteorsProximos.map((m) => (
              <Card key={`${m.nombre}-${m.pico}`} variant="elevated" className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-foreground">{m.nombre}</p>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                      m.calidad === "excelente"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : m.calidad === "buena"
                          ? "bg-sky-500/15 text-sky-400"
                          : "bg-amber-500/15 text-amber-500"
                    }`}
                  >
                    {m.calidad}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-teal)] font-medium mb-1.5">
                  Pico: {m.pico}
                </p>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">{m.nota}</p>
                <p className="text-[10px] text-muted-foreground/70">
                  Hasta <span className="font-semibold text-foreground">{m.tasaMaxima}</span>{" "}
                  meteoros/hr en condiciones ideales
                </p>
              </Card>
            ))}
          </div>
          {meteorsPasados.length >= PAST_MIN && (
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">
                Anteriores
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 opacity-50">
                {meteorsPasados.map((m) => (
                  <Card key={`${m.nombre}-${m.pico}`} variant="elevated" className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-semibold text-foreground">{m.nombre}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 bg-muted text-muted-foreground">
                        {m.calidad}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium mb-1.5">
                      Pico: {m.pico}
                    </p>
                    <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">{m.nota}</p>
                    <p className="text-[10px] text-muted-foreground/70">
                      Hasta <span className="font-semibold">{m.tasaMaxima}</span>{" "}
                      meteoros/hr en condiciones ideales
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </PageShell>
      </Section>

      {/* Eventos astronómicos */}
      <Section spacing="md" background="muted">
        <PageShell>
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays size={18} strokeWidth={1.5} className="text-[var(--color-teal)]" />
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              Eventos astronómicos 2026–2027
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {eventosProximos.map((ev) => {
              const Icon = EVENTO_ICONS[ev.tipo]
              return (
                <Card key={`${ev.nombre}-${ev.fechaISO}`} variant="elevated" className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className={
                          ev.tipo === "eclipse"
                            ? "text-amber-400"
                            : ev.tipo === "solsticio"
                              ? "text-[var(--color-teal)]"
                              : "text-[var(--color-teal-light)]"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground mb-0.5">{ev.nombre}</p>
                      <p className="text-[11px] text-[var(--color-teal)] font-medium mb-1.5">
                        {ev.fecha}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {ev.descripcion}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
          {eventosPasados.length >= PAST_MIN && (
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">
                Anteriores
              </p>
              <div className="grid sm:grid-cols-2 gap-3 opacity-50">
                {eventosPasados.map((ev) => {
                  const Icon = EVENTO_ICONS[ev.tipo]
                  return (
                    <Card key={`${ev.nombre}-${ev.fechaISO}`} variant="elevated" className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <Icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground mb-0.5">{ev.nombre}</p>
                          <p className="text-[11px] text-muted-foreground font-medium mb-1.5">
                            {ev.fecha}
                          </p>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {ev.descripcion}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </PageShell>
      </Section>

      {/* Cielos oscuros */}
      <Section spacing="md">
        <PageShell>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} strokeWidth={1.5} className="text-[var(--color-teal)]" />
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              Mejores cielos oscuros de la Patagonia
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Patagonia no tiene reservas de cielo oscuro certificadas, pero sí tiene millones de
            hectáreas de parques nacionales sin electricidad. Estos son los puntos con menor
            contaminación lumínica.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SITIOS.map((s) => (
              <Card key={s.nombre} variant="elevated" className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-semibold text-foreground">{s.nombre}</p>
                  <span className="text-[10px] font-medium bg-[var(--color-teal)]/10 text-[var(--color-teal)] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {s.destacado}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground/70 mb-2">{s.ubicacion}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{s.descripcion}</p>
              </Card>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Constelaciones */}
      <Section spacing="md" background="muted">
        <PageShell>
          <div className="flex items-center gap-2 mb-2">
            <Telescope size={18} strokeWidth={1.5} className="text-[var(--color-teal)]" />
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              Constelaciones del hemisferio sur
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Desde Patagonia se ven constelaciones y objetos imposibles de observar desde Europa o
            América del Norte. Una latitud de −45° a −55° abre el cielo austral completo.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CONSTELACIONES.map((c) => (
              <Card key={c.nombre} variant="elevated" className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{c.nombre}</p>
                  {c.circumpolar && (
                    <span className="text-[9px] font-bold uppercase tracking-wide bg-[var(--color-teal)]/10 text-[var(--color-teal)] px-1.5 py-0.5 rounded shrink-0">
                      Circumpolar
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[var(--color-teal)] font-medium mb-1.5">{c.estrella}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                  {c.descripcion}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  Mejor período:{" "}
                  <span className="text-foreground/70 font-medium">{c.mejorMes}</span>
                </p>
              </Card>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Consejo final */}
      <Section
        spacing="md"
        className="bg-gradient-to-br from-[#0d1117] via-[#0f1d2e] to-[#111827] text-[var(--color-cream)]"
      >
        <PageShell>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} strokeWidth={1.5} className="text-[var(--color-teal-light)]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-teal-light)]">
                Consejo
              </p>
            </div>
            <p className="text-base md:text-lg leading-relaxed opacity-90">
              La combinación ganadora para astronomía en Patagonia es luna nueva + invierno austral
              (junio–agosto) + cielo despejado. Con viento calmo y sin nubes, la oscuridad del cielo
              patagónico no tiene comparación en el hemisferio sur.
            </p>
          </div>
        </PageShell>
      </Section>
    </div>
  )
}
