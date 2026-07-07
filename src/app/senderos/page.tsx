import type { Metadata } from "next"
import Link from "next/link"
import { Footprints } from "lucide-react"
import {
  SENDEROS_CATALOG,
  DIFICULTAD_LABELS,
  DIFICULTAD_COLORS,
  type Dificultad,
} from "@/lib/senderos/catalog"
import { Badge } from "@/components/primitives/Badge"

export const metadata: Metadata = {
  title: "Senderos de la Patagonia — Guía de Trekking | Outdoor Patagonia",
  description:
    "Guía de senderos patagónicos: Laguna de los Tres, Circuito W, Volcán Lanín y más. Distancias, dificultad, desnivel y consejos para cada trek.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/senderos",
  },
}

const DIFICULTAD_ORDER: Dificultad[] = [
  "baja",
  "baja-moderada",
  "moderada",
  "moderada-alta",
  "alta",
]

export default async function SenderosIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ dif?: string }>
}) {
  const { dif } = await searchParams
  const activeDif: Dificultad = DIFICULTAD_ORDER.includes(dif as Dificultad)
    ? (dif as Dificultad)
    : "baja"

  const senderos = SENDEROS_CATALOG.filter((s) => s.dificultad === activeDif).sort((a, b) =>
    a.title.localeCompare(b.title, "es")
  )

  return (
    <div className="min-h-screen">
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
            {SENDEROS_CATALOG.length} senderos con información detallada: distancia, desnivel,
            temporada y fauna en el camino.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {DIFICULTAD_ORDER.map((dif) => {
              const isActive = dif === activeDif
              const count = SENDEROS_CATALOG.filter((s) => s.dificultad === dif).length
              if (count === 0) return null
              return (
                <Link
                  key={dif}
                  href={`/senderos?dif=${dif}`}
                  className={`px-4 py-2.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "border-b-2 border-[var(--color-forest)] text-[var(--color-forest)] -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {DIFICULTAD_LABELS[dif]}
                  <span className="ml-1.5 text-xs opacity-60">({count})</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-semibold">{DIFICULTAD_LABELS[activeDif]}</h2>
            <Badge className={DIFICULTAD_COLORS[activeDif]}>
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
      </div>
    </div>
  )
}
