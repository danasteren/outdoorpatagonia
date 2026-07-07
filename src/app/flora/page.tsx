import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Leaf } from "lucide-react"
import {
  FLORA_CATALOG,
  CATEGORY_LABELS,
  CATEGORY_LABELS_PLURAL,
  type FloraCategory,
} from "@/lib/flora/catalog"
import { Badge } from "@/components/primitives/Badge"
import { fetchTaxonPhotos } from "@/lib/apis/inaturalist"

export const metadata: Metadata = {
  title: "Flora de la Patagonia — Guía de Plantas | Outdoor Patagonia",
  description:
    "Guía de flora patagónica: lenga, alerce, araucaria, calafate, chilco y más. Observaciones recientes, temporada de floración y dónde encontrar cada especie.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/flora",
  },
}

const CATEGORY_COLORS: Record<FloraCategory, string> = {
  arbol: "bg-[var(--color-forest)]/10 text-[var(--color-forest)]",
  arbusto: "bg-[var(--color-teal)]/10 text-[var(--color-teal)]",
  "herbácea": "bg-amber-500/10 text-amber-600",
  enredadera: "bg-purple-500/10 text-purple-600",
}

const CATEGORY_THUMB_BG: Record<FloraCategory, string> = {
  arbol: "bg-[var(--color-forest)]/15 text-[var(--color-forest)]",
  arbusto: "bg-[var(--color-teal)]/15 text-[var(--color-teal)]",
  "herbácea": "bg-amber-500/15 text-amber-600",
  enredadera: "bg-purple-500/15 text-purple-600",
}

function getAvailableCategories(): FloraCategory[] {
  const cats = [...new Set(FLORA_CATALOG.map((e) => e.category))]
  return cats.sort((a, b) =>
    CATEGORY_LABELS_PLURAL[a].localeCompare(CATEGORY_LABELS_PLURAL[b], "es")
  )
}

export default async function FloraIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const categories = getAvailableCategories()
  const activeCategory: FloraCategory =
    categories.includes(cat as FloraCategory) ? (cat as FloraCategory) : categories[0]

  const species = FLORA_CATALOG.filter((e) => e.category === activeCategory).sort(
    (a, b) => a.commonNameEs.localeCompare(b.commonNameEs, "es")
  )

  const taxonIds = species.flatMap((e) => (e.taxonId ? [e.taxonId] : []))
  const photoMap = await fetchTaxonPhotos(taxonIds)

  return (
    <div className="min-h-screen">
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-6 h-6 opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">
              Guía de especies
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Flora de la Patagonia
          </h1>
          <p className="mt-3 text-[var(--color-cream)]/70 max-w-xl text-base leading-relaxed">
            Árboles, arbustos y plantas nativas de la Patagonia argentina y chilena.
            Observaciones recientes, temporada de floración y dónde encontrar cada especie.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <div className="flex gap-1">
            {categories.map((cat) => {
              const isActive = cat === activeCategory
              const count = FLORA_CATALOG.filter((e) => e.category === cat).length
              return (
                <Link
                  key={cat}
                  href={`/flora?cat=${cat}`}
                  className={`px-4 py-2.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-b-2 border-[var(--color-forest)] text-[var(--color-forest)] -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {CATEGORY_LABELS_PLURAL[cat]}
                  <span className="ml-1.5 text-xs opacity-60">({count})</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">{CATEGORY_LABELS_PLURAL[activeCategory]}</h2>
            <span className="text-sm text-muted-foreground">
              {species.length} {species.length === 1 ? "especie" : "especies"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {species.map((e) => {
              const photoUrl = e.taxonId ? photoMap.get(e.taxonId) : undefined
              return (
                <Link
                  key={e.slug}
                  href={`/flora/${e.slug}`}
                  className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                          {e.commonNameEs}
                        </p>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shrink-0 ${CATEGORY_COLORS[e.category]}`}
                        >
                          {CATEGORY_LABELS[e.category]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {e.scientificName}
                      </p>
                    </div>
                    <div
                      className={`shrink-0 w-11 h-11 rounded-full overflow-hidden ring-2 ring-border flex items-center justify-center ${!photoUrl ? CATEGORY_THUMB_BG[e.category] : ""}`}
                    >
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={e.commonNameEs}
                          width={44}
                          height={44}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Leaf className="w-5 h-5 opacity-70" />
                      )}
                    </div>
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
                    Ver observaciones →
                  </Badge>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
