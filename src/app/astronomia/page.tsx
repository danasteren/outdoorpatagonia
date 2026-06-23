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
}

const METEOROS: MeteorShower[] = [
  {
    nombre: "η Acuáridas",
    pico: "6 de mayo, 2026",
    tasaMaxima: 50,
    calidad: "excelente",
    nota: "La mejor lluvia austral del año. El radiante de Acuario queda alto en el cielo desde Patagonia.",
  },
  {
    nombre: "δ Acuáridas Sur",
    pico: "30 de julio, 2026",
    tasaMaxima: 25,
    calidad: "buena",
    nota: "Buena visibilidad desde latitudes australes. Se superpone con el inicio de las Perseidas.",
  },
  {
    nombre: "Perseidas",
    pico: "12 de agosto, 2026",
    tasaMaxima: 100,
    calidad: "regular",
    nota: "Muy populares en el hemisferio norte. Desde Patagonia el radiante queda bajo, pero igual vale.",
  },
  {
    nombre: "Oriónidas",
    pico: "21 de octubre, 2026",
    tasaMaxima: 20,
    calidad: "buena",
    nota: "Restos del cometa Halley. Orión sube bien desde latitudes australes en primavera.",
  },
  {
    nombre: "Leónidas",
    pico: "17 de noviembre, 2026",
    tasaMaxima: 15,
    calidad: "buena",
    nota: "Meteoros rápidos y brillantes. Buena visibilidad desde el sur.",
  },
  {
    nombre: "Gemínidas",
    pico: "13 de diciembre, 2026",
    tasaMaxima: 120,
    calidad: "buena",
    nota: "La lluvia más activa del año. El radiante no sube mucho desde el sur, pero la cantidad compensa.",
  },
  {
    nombre: "η Acuáridas",
    pico: "6 de mayo, 2027",
    tasaMaxima: 50,
    calidad: "excelente",
    nota: "Segunda oportunidad para la mejor lluvia del hemisferio sur.",
  },
]

type AstroEvent = {
  nombre: string
  fecha: string
  tipo: "eclipse" | "solsticio" | "equinoccio" | "planeta" | "especial"
  descripcion: string
}

const EVENTOS: AstroEvent[] = [
  {
    nombre: "Solsticio de invierno",
    fecha: "21 de junio, 2026",
    tipo: "solsticio",
    descripcion:
      "La noche más larga del año en el hemisferio sur. En Ushuaia hay más de 17 horas de oscuridad — el momento ideal para la astronomía.",
  },
  {
    nombre: "Lluvia de η Acuáridas",
    fecha: "6 de mayo, 2026",
    tipo: "especial",
    descripcion:
      "La mejor lluvia de meteoros para el hemisferio sur. Hasta 50 meteoros por hora en condiciones ideales. Madrugada hacia el noreste.",
  },
  {
    nombre: "Solsticio de invierno",
    fecha: "21 de junio, 2027",
    tipo: "solsticio",
    descripcion:
      "Nueva noche más larga del año. La Vía Láctea en su máximo esplendor austral. Combinar con luna nueva para cielos perfectos.",
  },
  {
    nombre: "Eclipse solar total",
    fecha: "2 de agosto, 2027",
    tipo: "eclipse",
    descripcion:
      "Eclipse solar total con camino de totalidad sobre el sur de España, norte de África y Medio Oriente. Desde el extremo norte de Argentina puede verse como eclipse parcial al amanecer.",
  },
  {
    nombre: "Lluvia de η Acuáridas",
    fecha: "6 de mayo, 2027",
    tipo: "especial",
    descripcion:
      "Segunda oportunidad para la mejor lluvia austral. La madrugada del 6 de mayo sigue siendo la cita astronómica más esperada del año en Patagonia.",
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
              <Card variant="elevated" className="p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-center">
                    <span className="text-5xl leading-none" role="img" aria-label={moon.phaseName}>
                      {moon.phaseEmoji}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
                      {moon.phaseName}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Iluminación</span>
                        <span className="text-xs font-semibold">{moon.illumination}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${moon.illumination}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Próxima luna llena:{" "}
                      <span className="text-foreground font-medium">{moon.nextFullDate}</span>
                      {moon.daysUntilFull > 0 && (
                        <span className="text-muted-foreground"> ({moon.daysUntilFull} días)</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star size={12} strokeWidth={1.5} className={qualityColor} />
                      <span className={`text-xs font-medium capitalize ${qualityColor}`}>
                        {moon.stargazingQuality}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">{moon.stargazingNote}</p>
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
            {METEOROS.map((m) => (
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
            {EVENTOS.map((ev) => {
              const Icon = EVENTO_ICONS[ev.tipo]
              return (
                <Card key={`${ev.nombre}-${ev.fecha}`} variant="elevated" className="p-4">
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
