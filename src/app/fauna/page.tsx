import type { Metadata } from "next"
import Link from "next/link"
import { PawPrint } from "lucide-react"
import {
  FAUNA_CATALOG,
  CATEGORY_LABELS,
  type FaunaCategory,
} from "@/lib/fauna/catalog"
import { Badge } from "@/components/primitives/Badge"

export const metadata: Metadata = {
  title: "Fauna de la Patagonia — Guía de Especies | Outdoor Patagonia",
  description:
    "Guía de fauna patagónica: guanaco, puma, cóndor andino, pingüino de Magallanes y más. Avistamientos recientes, temporada y dónde verlos en los parques nacionales.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/fauna",
  },
}

const CATEGORY_ORDER: FaunaCategory[] = [
  "mamifero",
  "ave",
  "reptil",
  "anfibio",
  "pez",
]

const CATEGORY_COLORS: Record<FaunaCategory, string> = {
  mamifero: "bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)]",
  ave: "bg-[var(--color-teal)]/10 text-[var(--color-teal)]",
  reptil: "bg-amber-500/10 text-amber-600",
  anfibio: "bg-blue-500/10 text-blue-600",
  pez: "bg-indigo-500/10 text-indigo-600",
}

export default function FaunaIndexPage() {
  const byCategory = CATEGORY_ORDER.reduce<
    Record<FaunaCategory, typeof FAUNA_CATALOG>
  >(
    (acc, cat) => {
      acc[cat] = FAUNA_CATALOG.filter((e) => e.category === cat)
      return acc
    },
    { mamifero: [], ave: [], reptil: [], anfibio: [], pez: [] }
  )

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <PawPrint className="w-6 h-6 opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">
              Guía de especies
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Fauna de la Patagonia
          </h1>
          <p className="mt-3 text-[var(--color-cream)]/70 max-w-xl text-base leading-relaxed">
            Avistamientos recientes, temporada y dónde ver cada especie en los
            parques nacionales de la Patagonia argentina y chilena.
          </p>
        </div>
      </div>

      {/* Species by category */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 space-y-12">
        {CATEGORY_ORDER.map((cat) => {
          const species = byCategory[cat]
          if (species.length === 0) return null
          return (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold">
                  {CATEGORY_LABELS[cat]}s
                </h2>
                <span className="text-sm text-muted-foreground">
                  {species.length} {species.length === 1 ? "especie" : "especies"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {species.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/fauna/${e.slug}`}
                    className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                          {e.commonNameEs}
                        </p>
                        <p className="text-xs text-muted-foreground italic mt-0.5">
                          {e.scientificName}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shrink-0 ${CATEGORY_COLORS[e.category]}`}
                      >
                        {CATEGORY_LABELS[e.category]}
                      </span>
                    </div>

                    {e.parquesRelacionados.length > 0 && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {e.parquesRelacionados
                          .slice(0, 3)
                          .map((p) => p.nombre)
                          .join(" · ")}
                        {e.parquesRelacionados.length > 3 && " · …"}
                      </p>
                    )}

                    <Badge variant="outline" size="sm" className="self-start mt-auto">
                      Ver avistamientos →
                    </Badge>
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
