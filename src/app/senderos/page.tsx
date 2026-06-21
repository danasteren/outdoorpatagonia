import type { Metadata } from "next"
import Link from "next/link"
import { Footprints } from "lucide-react"
import { SENDEROS_CATALOG, DIFICULTAD_LABELS, DIFICULTAD_COLORS, type Dificultad } from "@/lib/senderos/catalog"
import { Badge } from "@/components/primitives/Badge"

export const metadata: Metadata = {
  title: "Senderos de la Patagonia — Guía de Trekking | Outdoor Patagonia",
  description:
    "Guía de senderos patagónicos: Laguna de los Tres, Circuito W, Volcán Lanín y más. Distancias, dificultad, desnivel y consejos para cada trek.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/senderos",
  },
}

const DIFICULTAD_ORDER: Dificultad[] = ["baja", "baja-moderada", "moderada", "moderada-alta", "alta"]

export default function SenderosIndexPage() {
  const byDificultad = DIFICULTAD_ORDER.reduce<Record<Dificultad, typeof SENDEROS_CATALOG>>(
    (acc, d) => {
      acc[d] = SENDEROS_CATALOG.filter((s) => s.dificultad === d)
      return acc
    },
    { baja: [], "baja-moderada": [], moderada: [], "moderada-alta": [], alta: [] }
  )

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Footprints className="w-6 h-6 opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">
              Guía de trekking
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Senderos de la Patagonia
          </h1>
          <p className="mt-4 text-lg opacity-75 max-w-2xl">
            {SENDEROS_CATALOG.length} senderos con información detallada: distancia, desnivel, temporada y fauna en el camino.
          </p>
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 space-y-12">
        {DIFICULTAD_ORDER.map((dificultad) => {
          const senderos = byDificultad[dificultad]
          if (senderos.length === 0) return null
          return (
            <section key={dificultad}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-semibold">{DIFICULTAD_LABELS[dificultad]}</h2>
                <Badge className={DIFICULTAD_COLORS[dificultad]}>
                  {senderos.length} {senderos.length === 1 ? "sendero" : "senderos"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {senderos.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/senderos/${s.slug}`}
                    className="group block border border-border rounded-xl p-5 hover:border-[var(--color-teal)] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-foreground group-hover:text-[var(--color-teal)] transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <Badge className={`${DIFICULTAD_COLORS[s.dificultad]} shrink-0 text-[10px]`}>
                        {DIFICULTAD_LABELS[s.dificultad]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{s.distancia}</span>
                      <span>{s.duracion}</span>
                      {s.desnivel && <span>{s.desnivel}</span>}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground/70">{s.parqueName}</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
