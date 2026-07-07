"use client"

import { useState } from "react"
import Link from "next/link"
import {
  type Sector,
  type ClimbingStyle,
  ESTILO_LABELS,
  PAIS_LABELS,
  totalVias,
} from "@/lib/escalada/catalog"

const ALL_ESTILOS: ClimbingStyle[] = ["deportiva", "clasica", "boulder"]

const ESTILO_ACCENT: Record<ClimbingStyle, string> = {
  deportiva: "from-[var(--color-teal)] to-sky-400",
  clasica: "from-[var(--color-forest)] to-[var(--color-teal)]",
  boulder: "from-[var(--color-terracotta)] to-amber-500",
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
        active
          ? "bg-[var(--color-teal)] text-white shadow-sm"
          : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
      }`}
    >
      {children}
    </button>
  )
}

function PaisBadge({ pais }: { pais: "AR" | "CL" }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
        pais === "AR"
          ? "bg-sky-500/10 text-sky-600"
          : "bg-red-500/10 text-red-600"
      }`}
    >
      {PAIS_LABELS[pais]}
    </span>
  )
}

function SectorCard({ s }: { s: Sector }) {
  const vias = totalVias(s)
  const primaryEstilo = s.estilos[0]

  return (
    <Link
      href={`/escalada/${s.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-background hover:border-[var(--color-teal)] hover:shadow-lg transition-all duration-200"
    >
      {/* Accent stripe */}
      <div className={`h-1.5 bg-gradient-to-r ${ESTILO_ACCENT[primaryEstilo]} shrink-0`} />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className="font-bold text-lg leading-snug group-hover:text-[var(--color-teal)] transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {s.nombre}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{s.region}</p>
          </div>
          <PaisBadge pais={s.pais} />
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-3 flex-1">
          {s.descripcion}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm pt-1 border-t border-border/50">
          <span className="font-bold font-mono text-[var(--color-teal)]">
            {s.gradosMin}–{s.gradosMax}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground text-xs">{s.altitud.toLocaleString("es-AR")} msnm</span>
          {vias > 0 && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs font-semibold text-foreground/70">
                {vias}{s.totalViasEstimado ? "+" : ""} vías
              </span>
            </>
          )}
        </div>

        {/* Estilos */}
        <div className="flex flex-wrap gap-1.5">
          {s.estilos.map((e) => (
            <span
              key={e}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)]"
            >
              {ESTILO_LABELS[e]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function EscaladaClient({ catalog }: { catalog: Sector[] }) {
  const [filterPais, setFilterPais] = useState<"AR" | "CL" | null>(null)
  const [filterEstilos, setFilterEstilos] = useState<ClimbingStyle[]>([])

  function toggleEstilo(e: ClimbingStyle) {
    setFilterEstilos((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    )
  }

  const visible = catalog.filter((s) => {
    if (filterPais && s.pais !== filterPais) return false
    if (filterEstilos.length > 0 && !filterEstilos.some((e) => s.estilos.includes(e))) return false
    return true
  })

  const hasFilters = filterPais !== null || filterEstilos.length > 0

  return (
    <div>
      {/* Filtros */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest mr-1 shrink-0 font-semibold">
            País
          </span>
          {(["AR", "CL"] as const).map((p) => (
            <FilterChip
              key={p}
              active={filterPais === p}
              onClick={() => setFilterPais((v) => (v === p ? null : p))}
            >
              {PAIS_LABELS[p]}
            </FilterChip>
          ))}

          <div className="w-px h-4 bg-border mx-2 shrink-0" />

          <span className="text-[10px] text-muted-foreground uppercase tracking-widest mr-1 shrink-0 font-semibold">
            Estilo
          </span>
          {ALL_ESTILOS.map((e) => (
            <FilterChip
              key={e}
              active={filterEstilos.includes(e)}
              onClick={() => toggleEstilo(e)}
            >
              {ESTILO_LABELS[e]}
            </FilterChip>
          ))}

          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {visible.length} sector{visible.length !== 1 ? "es" : ""}
            </span>
            {hasFilters && (
              <button
                onClick={() => { setFilterPais(null); setFilterEstilos([]) }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grilla */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        {visible.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No hay sectores que coincidan con los filtros seleccionados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((s) => (
              <SectorCard key={s.slug} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
