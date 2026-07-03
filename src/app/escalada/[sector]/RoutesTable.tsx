"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { type Subarea, gradeIndex, gradeColor, ESTILO_LABELS } from "@/lib/escalada/catalog"

const NIVELES = [
  { label: "Fácil", max: "5c", chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { label: "Intermedio", min: "6a", max: "6c+", chip: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { label: "Avanzado", min: "7a", max: "7c+", chip: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { label: "Elite", min: "8a", chip: "bg-red-500/10 text-red-600 dark:text-red-400" },
] as const

function matchesNivel(grado: string, nivel: typeof NIVELES[number]): boolean {
  const idx = gradeIndex(grado)
  const minIdx = "min" in nivel && nivel.min ? gradeIndex(nivel.min) : 0
  const maxIdx = "max" in nivel && nivel.max ? gradeIndex(nivel.max) : 999
  return idx >= minIdx && idx <= maxIdx
}

type Props = {
  subareas: Subarea[]
}

export function RoutesTable({ subareas }: Props) {
  const [openSubareas, setOpenSubareas] = useState<Set<string>>(
    () => new Set(subareas.map((s) => s.nombre))
  )
  const [selectedNivel, setSelectedNivel] = useState<string | null>(null)
  const [selectedSubarea, setSelectedSubarea] = useState<string | null>(null)

  const totalCount = useMemo(
    () => subareas.reduce((acc, s) => acc + s.rutas.length, 0),
    [subareas]
  )

  const filteredSubareas = useMemo(() => {
    return subareas
      .filter((sub) => !selectedSubarea || sub.nombre === selectedSubarea)
      .map((sub) => ({
        ...sub,
        rutas: sub.rutas
          .filter((r) => {
            if (!selectedNivel) return true
            const nivel = NIVELES.find((n) => n.label === selectedNivel)
            return nivel ? matchesNivel(r.grado, nivel) : true
          })
          .sort((a, b) => gradeIndex(a.grado) - gradeIndex(b.grado)),
      }))
      .filter((sub) => sub.rutas.length > 0)
  }, [subareas, selectedNivel, selectedSubarea])

  const filteredCount = filteredSubareas.reduce((acc, s) => acc + s.rutas.length, 0)

  function toggleSubarea(nombre: string) {
    setOpenSubareas((prev) => {
      const next = new Set(prev)
      next.has(nombre) ? next.delete(nombre) : next.add(nombre)
      return next
    })
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {NIVELES.map((n) => (
          <button
            key={n.label}
            onClick={() => setSelectedNivel((v) => (v === n.label ? null : n.label))}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedNivel === n.label
                ? n.chip + " ring-1 ring-current"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {n.label}
          </button>
        ))}

        {subareas.length > 1 && (
          <>
            <div className="w-px h-4 bg-border mx-1" />
            <select
              value={selectedSubarea ?? ""}
              onChange={(e) => setSelectedSubarea(e.target.value || null)}
              className="text-xs bg-muted rounded-full px-3 py-1 text-muted-foreground border-none outline-none cursor-pointer"
            >
              <option value="">Todas las zonas</option>
              {subareas.map((s) => (
                <option key={s.nombre} value={s.nombre}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </>
        )}

        <span className="ml-auto text-xs text-muted-foreground">
          {filteredCount} de {totalCount} vías
        </span>
      </div>

      {/* Acordeón por subárea */}
      <div className="space-y-3">
        {filteredSubareas.map((sub) => {
          const isOpen = openSubareas.has(sub.nombre)
          return (
            <div key={sub.nombre} className="border border-border rounded-xl overflow-hidden">
              {/* Header subárea */}
              <button
                onClick={() => toggleSubarea(sub.nombre)}
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-semibold text-sm">{sub.nombre}</span>
                  {sub.descripcion && (
                    <span className="hidden sm:block text-xs text-muted-foreground">
                      — {sub.descripcion}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">
                  {sub.rutas.length} vías
                </span>
              </button>

              {/* Tabla de rutas */}
              {isOpen && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                          Vía
                        </th>
                        <th className="text-left py-2 px-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest w-20">
                          Grado
                        </th>
                        <th className="text-left py-2 px-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest w-24 hidden sm:table-cell">
                          Largo
                        </th>
                        <th className="text-left py-2 px-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest hidden md:table-cell">
                          Estilo
                        </th>
                        <th className="text-left py-2 px-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest hidden lg:table-cell">
                          Equipamiento
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub.rutas.map((r, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-2.5 px-4 font-medium">{r.nombre}</td>
                          <td className={`py-2.5 px-4 font-mono font-bold text-sm ${gradeColor(r.grado)}`}>
                            {r.grado}
                          </td>
                          <td className="py-2.5 px-4 text-muted-foreground text-xs hidden sm:table-cell">
                            {r.largo}
                          </td>
                          <td className="py-2.5 px-4 hidden md:table-cell">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)] font-medium">
                              {ESTILO_LABELS[r.estilo]}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-xs text-muted-foreground capitalize hidden lg:table-cell">
                            {r.equipamiento ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}

        {filteredSubareas.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">
            No hay vías que coincidan con el filtro seleccionado.
          </p>
        )}
      </div>
    </div>
  )
}
