"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Compass, Heart } from "lucide-react"
import {
  type Subarea,
  type Desplome,
  gradeIndex,
  ESTILO_LABELS,
  DESPLOME_LABELS,
} from "@/lib/escalada/catalog"

const NIVELES = [
  { label: "Fácil", max: "5c", chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { label: "Intermedio", min: "6a", max: "6c+", chip: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { label: "Avanzado", min: "7a", max: "7c+", chip: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { label: "Elite", min: "8a", chip: "bg-red-500/10 text-red-600 dark:text-red-400" },
] as const

const DESPLOMES: Desplome[] = ["aplomada", "vertical", "desplomada"]

function matchesNivel(grado: string, nivel: typeof NIVELES[number]): boolean {
  const idx = gradeIndex(grado)
  const minIdx = "min" in nivel && nivel.min ? gradeIndex(nivel.min) : 0
  const maxIdx = "max" in nivel && nivel.max ? gradeIndex(nivel.max) : 999
  return idx >= minIdx && idx <= maxIdx
}

function nivelChip(grado: string): string {
  return NIVELES.find((n) => matchesNivel(grado, n))?.chip ?? "bg-muted text-muted-foreground"
}

const subareaKey = (s: Subarea) => `${s.zona ?? ""}/${s.nombre}`

function Chip({
  active,
  activeClass = "bg-[var(--color-teal)] text-white",
  onClick,
  children,
}: {
  active: boolean
  activeClass?: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
        active ? activeClass : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

type Props = {
  subareas: Subarea[]
}

export function RoutesTable({ subareas }: Props) {
  const [closed, setClosed] = useState<Set<string>>(() => new Set())
  const [selectedNivel, setSelectedNivel] = useState<string | null>(null)
  const [selectedZona, setSelectedZona] = useState<string | null>(null)
  const [selectedDesplome, setSelectedDesplome] = useState<Desplome | null>(null)
  const [soloRecomendadas, setSoloRecomendadas] = useState(false)

  const allRoutes = useMemo(() => subareas.flatMap((s) => s.rutas), [subareas])
  const totalCount = allRoutes.length
  const hasRecomendadas = allRoutes.some((r) => r.recomendada)
  const hasDesplome = allRoutes.some((r) => r.desplome)
  const hasChapas = allRoutes.some((r) => r.chapas)

  // Zonas en el orden del catálogo, con su cantidad de vías
  const zonas = useMemo(() => {
    const counts = new Map<string, number>()
    for (const s of subareas) {
      if (!s.zona) continue
      counts.set(s.zona, (counts.get(s.zona) ?? 0) + s.rutas.length)
    }
    return [...counts.entries()]
  }, [subareas])

  const filteredSubareas = useMemo(() => {
    const nivel = NIVELES.find((n) => n.label === selectedNivel)
    return subareas
      .filter((sub) => !selectedZona || sub.zona === selectedZona)
      .map((sub) => ({
        ...sub,
        rutas: sub.rutas.filter(
          (r) =>
            (!nivel || matchesNivel(r.grado, nivel)) &&
            (!selectedDesplome || r.desplome === selectedDesplome) &&
            (!soloRecomendadas || r.recomendada)
        ),
      }))
      .filter((sub) => sub.rutas.length > 0)
  }, [subareas, selectedNivel, selectedZona, selectedDesplome, soloRecomendadas])

  const filteredCount = filteredSubareas.reduce((acc, s) => acc + s.rutas.length, 0)
  const hasFilters = selectedNivel || selectedZona || selectedDesplome || soloRecomendadas

  function toggleSubarea(key: string) {
    setClosed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function clearFilters() {
    setSelectedNivel(null)
    setSelectedZona(null)
    setSelectedDesplome(null)
    setSoloRecomendadas(false)
  }

  return (
    <div>
      {/* Zonas */}
      {zonas.length > 1 && (
        <div className="-mx-4 px-4 mb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <Chip active={!selectedZona} onClick={() => setSelectedZona(null)}>
            Todos los sectores
          </Chip>
          {zonas.map(([nombre, count]) => (
            <Chip
              key={nombre}
              active={selectedZona === nombre}
              onClick={() => setSelectedZona((v) => (v === nombre ? null : nombre))}
            >
              {nombre}
              <span className="opacity-60 font-normal">{count}</span>
            </Chip>
          ))}
        </div>
      )}

      {/* Filtros */}
      <div className="-mx-4 px-4 mb-3 flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap">
        {NIVELES.map((n) => (
          <Chip
            key={n.label}
            active={selectedNivel === n.label}
            activeClass={`${n.chip} ring-1 ring-current`}
            onClick={() => setSelectedNivel((v) => (v === n.label ? null : n.label))}
          >
            {n.label}
          </Chip>
        ))}
        {hasRecomendadas && (
          <Chip
            active={soloRecomendadas}
            activeClass="bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-current"
            onClick={() => setSoloRecomendadas((v) => !v)}
          >
            <Heart className="w-3 h-3" fill="currentColor" />
            Recomendadas
          </Chip>
        )}
        {hasDesplome &&
          DESPLOMES.map((d) => (
            <Chip
              key={d}
              active={selectedDesplome === d}
              onClick={() => setSelectedDesplome((v) => (v === d ? null : d))}
            >
              {DESPLOME_LABELS[d]}
            </Chip>
          ))}
      </div>

      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
        <span aria-live="polite">
          {filteredCount} de {totalCount} vías
        </span>
        {hasFilters && (
          <button onClick={clearFilters} className="font-semibold text-[var(--color-teal)]">
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Acordeón por subsector, agrupado por zona */}
      <div className="space-y-3">
        {filteredSubareas.map((sub, i) => {
          const key = subareaKey(sub)
          const isOpen = !closed.has(key)
          const showZona = sub.zona && sub.zona !== filteredSubareas[i - 1]?.zona
          return (
            <div key={key}>
              {showZona && (
                <h3 className={`font-heading text-lg font-bold mb-2 ${i > 0 ? "mt-8" : ""}`}>
                  {sub.zona}
                </h3>
              )}
              <div className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => toggleSubarea(key)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
                >
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-semibold text-sm">{sub.nombre}</span>
                  {sub.orientacion && (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground"
                      title={`Orientación ${sub.orientacion}`}
                    >
                      <Compass className="w-3 h-3" />
                      {sub.orientacion}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground shrink-0 ml-auto">
                    {sub.rutas.length} {sub.rutas.length === 1 ? "vía" : "vías"}
                  </span>
                </button>

                {isOpen && (
                  <>
                    {sub.descripcion && (
                      <p className="px-4 py-2.5 text-xs text-muted-foreground leading-relaxed border-b border-border/50">
                        {sub.descripcion}
                      </p>
                    )}
                    <ul>
                      {sub.rutas.map((r, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 px-4 py-3 border-b border-border/30 last:border-b-0"
                        >
                          <span
                            className={`shrink-0 w-12 text-center rounded-md py-1 font-mono font-bold text-sm ${nivelChip(r.grado)}`}
                          >
                            {r.grado}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm leading-snug">
                              {r.numero !== undefined && (
                                <span className="text-muted-foreground font-normal mr-1.5">{r.numero}.</span>
                              )}
                              {r.nombre}
                              {r.recomendada && (
                                <Heart
                                  className="inline w-3.5 h-3.5 ml-1.5 -mt-0.5 text-rose-500"
                                  fill="currentColor"
                                  aria-label="Vía recomendada"
                                />
                              )}
                            </p>
                            {r.firstAscent && (
                              <p className="text-[11px] text-muted-foreground mt-0.5">{r.firstAscent}</p>
                            )}
                            {(r.estilo === "clasica" || r.aleje || (r.desplome && r.desplome !== "vertical")) && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {r.estilo === "clasica" && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-terracotta)]/15 text-[var(--color-terracotta)] font-semibold">
                                    {ESTILO_LABELS[r.estilo]}
                                  </span>
                                )}
                                {r.desplome && r.desplome !== "vertical" && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                                    {DESPLOME_LABELS[r.desplome]}
                                  </span>
                                )}
                                {r.aleje && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold">
                                    Aleje entre chapas
                                  </span>
                                )}
                              </div>
                            )}
                            {r.descripcion && (
                              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                                {r.descripcion}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 text-right text-xs text-muted-foreground leading-snug">
                            <p className="font-semibold text-foreground/80">{r.largo}</p>
                            {r.chapas && <p>{r.chapas} ch.</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )
        })}

        {filteredSubareas.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">
            No hay vías que coincidan con el filtro seleccionado.
          </p>
        )}
      </div>

      {hasChapas && (
        <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
          «ch.» son las chapas / cintas express de cada vía, tal como figuran en la guía de origen.
          El número delante del nombre es el de la vía en el croquis de la guía.
        </p>
      )}
    </div>
  )
}
