"use client"

import { useState } from "react"
import Link from "next/link"
import { type Sector, type ClimbingStyle, ESTILO_LABELS, PAIS_LABELS } from "@/lib/escalada/catalog"
import { Badge } from "@/components/primitives/Badge"

const ALL_ESTILOS: ClimbingStyle[] = ["deporte", "trad", "big wall", "bouldering", "alpinismo"]

function FilterBtn({
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
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        active
          ? "bg-[var(--color-teal)] text-white"
          : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
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
      <div className="border-b border-border bg-background sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground uppercase tracking-widest mr-1 shrink-0">
            País
          </span>
          {(["AR", "CL"] as const).map((p) => (
            <FilterBtn
              key={p}
              active={filterPais === p}
              onClick={() => setFilterPais((v) => (v === p ? null : p))}
            >
              {PAIS_LABELS[p]}
            </FilterBtn>
          ))}

          <div className="w-px h-4 bg-border mx-1 shrink-0" />

          <span className="text-xs text-muted-foreground uppercase tracking-widest mr-1 shrink-0">
            Estilo
          </span>
          {ALL_ESTILOS.map((e) => (
            <FilterBtn
              key={e}
              active={filterEstilos.includes(e)}
              onClick={() => toggleEstilo(e)}
            >
              {ESTILO_LABELS[e]}
            </FilterBtn>
          ))}

          {hasFilters && (
            <button
              onClick={() => {
                setFilterPais(null)
                setFilterEstilos([])
              }}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Limpiar filtros
            </button>
          )}
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
              <Link
                key={s.slug}
                href={`/escalada/${s.slug}`}
                className="group block border border-border rounded-xl p-5 hover:border-[var(--color-teal)] hover:shadow-sm transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[var(--color-teal)] transition-colors leading-snug">
                      {s.nombre}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.region}</p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      s.pais === "AR"
                        ? "bg-sky-500/10 text-sky-600"
                        : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {s.pais}
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {s.descripcion}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
                  <span>{s.gradosMin}–{s.gradosMax}</span>
                  <span>{s.altitud.toLocaleString("es-AR")} msnm</span>
                  <span>{s.temporada.join(", ")}</span>
                </div>

                {/* Estilos */}
                <div className="flex flex-wrap gap-1">
                  {s.estilos.map((e) => (
                    <Badge key={e} size="sm" className="text-[var(--color-teal)]">
                      {ESTILO_LABELS[e]}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
