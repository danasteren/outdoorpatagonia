"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/primitives"

export type MeteorShower = {
  nombre: string
  pico: string
  tasaMaxima: number
  calidad: "excelente" | "buena" | "regular"
  nota: string
  fechaISO: string
}

const MONTHS_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
const MONTHS_LONG = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

const ALL_KEY = "__todas__"

export function MeteorTabs({ upcoming, past }: { upcoming: MeteorShower[]; past: MeteorShower[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, MeteorShower[]>()
    for (const m of upcoming) {
      const key = m.fechaISO.slice(0, 7)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    const currentYear = new Date().getFullYear()
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, ms]) => {
        const [yearStr, monthStr] = key.split("-")
        const year = Number(yearStr)
        const monthIdx = Number(monthStr) - 1
        const label =
          year !== currentYear
            ? `${MONTHS_SHORT[monthIdx]} '${String(year).slice(2)}`
            : MONTHS_SHORT[monthIdx]
        return { key, label, year, monthIdx, meteors: ms }
      })
  }, [upcoming])

  const [activeKey, setActiveKey] = useState(ALL_KEY)
  const currentMonthKey = new Date().toISOString().slice(0, 7)

  const activeMeters =
    activeKey === ALL_KEY
      ? upcoming
      : (groups.find((g) => g.key === activeKey)?.meteors ?? [])

  if (groups.length === 0) return null

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {/* Todas */}
        <button
          onClick={() => setActiveKey(ALL_KEY)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeKey === ALL_KEY
            ? "bg-[var(--color-teal)] text-white shadow-md"
            : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
        >
          Todas
        </button>

        {/* Month tabs */}
        {groups.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveKey(g.key)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeKey === g.key
              ? "bg-[var(--color-teal)] text-white shadow-md"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
          >
            {g.key === currentMonthKey && (
              <span title="Mes actual" className="absolute -top-1 -right-2 flex items-center justify-center">
                <span className="animate-ping absolute w-3 h-3 rounded-full opacity-60" style={{ backgroundColor: "var(--color-teal)" }} />
                <span className="relative w-2.5 h-2.5 rounded-full ring-2 ring-background" style={{ backgroundColor: "var(--color-teal)" }} />
              </span>
            )}
            {g.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeMeters.map((m) => (
          <MeteorCard key={`${m.nombre}-${m.pico}`} meteor={m} />
        ))}
      </div>

      {/* Past */}
      {past.length >= 1 && (
        <div className="mt-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">
            Anteriores
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 opacity-45">
            {past.map((m) => (
              <MeteorCard key={`${m.nombre}-${m.pico}`} meteor={m} past />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MeteorCard({ meteor: m, past = false }: { meteor: MeteorShower; past?: boolean }) {
  const day = Number(m.fechaISO.slice(8, 10))
  const monthIdx = Number(m.fechaISO.slice(5, 7)) - 1
  const year = Number(m.fechaISO.slice(0, 4))

  return (
    <Card variant="elevated" className="p-5">
      {/* Date block — prominent */}
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
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full self-start shrink-0 ${past
            ? "bg-muted text-muted-foreground"
            : m.calidad === "excelente"
              ? "bg-emerald-500/15 text-emerald-500"
              : m.calidad === "buena"
                ? "bg-sky-500/15 text-sky-400"
                : "bg-amber-500/15 text-amber-500"
            }`}
        >
          {m.calidad}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm font-bold text-foreground mb-2">{m.nombre}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.nota}</p>
      <p className="text-xs text-muted-foreground/70">
        Hasta{" "}
        <span className="font-semibold text-foreground">{m.tasaMaxima}</span>{" "}
        meteoros/hr en condiciones ideales
      </p>
    </Card>
  )
}
