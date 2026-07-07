"use client"

import { useState, useMemo } from "react"
import { Sun, Moon, Orbit, Stars, Sparkles } from "lucide-react"
import { Card } from "@/components/primitives"

export type AstroEvent = {
  nombre: string
  fecha: string
  tipo: "eclipse" | "solsticio" | "equinoccio" | "planeta" | "especial"
  descripcion: string
  fechaISO: string
}

const MONTHS_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
const MONTHS_LONG = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

const TIPO_ICONS = {
  eclipse: Sun,
  solsticio: Moon,
  equinoccio: Orbit,
  planeta: Stars,
  especial: Sparkles,
} as const

const TIPO_COLORS: Record<AstroEvent["tipo"], string> = {
  eclipse: "text-amber-400",
  solsticio: "text-[var(--color-teal)]",
  equinoccio: "text-[var(--color-teal-light)]",
  planeta: "text-[var(--color-teal-light)]",
  especial: "text-[var(--color-teal-light)]",
}

const ALL_KEY = "__todas__"

export function EventoTabs({ upcoming, past }: { upcoming: AstroEvent[]; past: AstroEvent[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, AstroEvent[]>()
    for (const ev of upcoming) {
      const key = ev.fechaISO.slice(0, 7)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(ev)
    }
    const currentYear = new Date().getFullYear()
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, evs]) => {
        const [yearStr, monthStr] = key.split("-")
        const year = Number(yearStr)
        const monthIdx = Number(monthStr) - 1
        const label =
          year !== currentYear
            ? `${MONTHS_SHORT[monthIdx]} '${String(year).slice(2)}`
            : MONTHS_SHORT[monthIdx]
        return { key, label, year, monthIdx, eventos: evs }
      })
  }, [upcoming])

  const [activeKey, setActiveKey] = useState(ALL_KEY)
  const currentMonthKey = new Date().toISOString().slice(0, 7)

  const activeEventos =
    activeKey === ALL_KEY
      ? upcoming
      : (groups.find((g) => g.key === activeKey)?.eventos ?? [])

  if (groups.length === 0) return null

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveKey(ALL_KEY)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeKey === ALL_KEY
              ? "bg-[var(--color-teal)] text-white shadow-md"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          Todas
        </button>
        {groups.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveKey(g.key)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeKey === g.key
                ? "bg-[var(--color-teal)] text-white shadow-md"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {g.key === currentMonthKey && (
              <span title="Mes actual" className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
                <span className="animate-ping absolute w-3 h-3 rounded-full opacity-60" style={{ backgroundColor: "var(--color-teal)" }} />
                <span className="relative w-2.5 h-2.5 rounded-full ring-2 ring-background" style={{ backgroundColor: "var(--color-teal)" }} />
              </span>
            )}
            {g.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {activeEventos.map((ev) => (
          <EventoCard key={`${ev.nombre}-${ev.fechaISO}`} evento={ev} />
        ))}
      </div>

      {/* Past */}
      {past.length >= 1 && (
        <div className="mt-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">
            Anteriores
          </p>
          <div className="grid sm:grid-cols-2 gap-3 opacity-45">
            {past.map((ev) => (
              <EventoCard key={`${ev.nombre}-${ev.fechaISO}`} evento={ev} past />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EventoCard({ evento: ev, past = false }: { evento: AstroEvent; past?: boolean }) {
  const day = Number(ev.fechaISO.slice(8, 10))
  const monthIdx = Number(ev.fechaISO.slice(5, 7)) - 1
  const year = Number(ev.fechaISO.slice(0, 4))
  const Icon = TIPO_ICONS[ev.tipo]
  const iconColor = past ? "text-muted-foreground" : TIPO_COLORS[ev.tipo]

  return (
    <Card variant="elevated" className="p-5">
      {/* Date block */}
      <div className="flex items-end gap-3 mb-4 pb-4 border-b border-border/40">
        <span
          className="text-5xl font-bold tabular-nums leading-none"
          style={{ color: past ? undefined : "var(--color-teal)" }}
        >
          {day}
        </span>
        <div className="pb-0.5 flex-1">
          <p
            className="text-sm font-bold uppercase tracking-widest leading-tight"
            style={{ color: past ? undefined : "var(--color-teal)" }}
          >
            {MONTHS_LONG[monthIdx]}
          </p>
          <p className="text-xs text-muted-foreground">{year}</p>
        </div>
        <Icon size={22} strokeWidth={1.5} className={`self-start mt-1 shrink-0 ${iconColor}`} />
      </div>

      {/* Content */}
      <p className="text-base font-bold text-foreground mb-2">{ev.nombre}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{ev.descripcion}</p>
    </Card>
  )
}
