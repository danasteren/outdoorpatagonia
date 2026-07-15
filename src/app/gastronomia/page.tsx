import type { Metadata } from "next"
import Link from "next/link"
import { ChefHat } from "lucide-react"
import {
  GASTRONOMIA_CATALOG,
  CATEGORIA_LABELS_PLURAL,
  PAIS_LABELS,
  type GastronomiaCategoria,
} from "@/lib/gastronomia/catalog"

const BASE = "https://outdoorpatagonia.com"

export const metadata: Metadata = {
  title: "Gastronomía Patagónica — Recetas y Productos Típicos",
  description:
    "Gastronomía de la Patagonia: hongos de pino, cordero al asador, curanto, torta galesa y productos típicos de Argentina y Chile. Recetas, origen y temporada.",
  openGraph: {
    title: "Gastronomía Patagónica — Recetas y Productos Típicos",
    description:
      "Gastronomía de la Patagonia: hongos de pino, cordero al asador, curanto, torta galesa y productos típicos de Argentina y Chile.",
    url: `${BASE}/gastronomia`,
  },
  alternates: {
    canonical: `${BASE}/gastronomia`,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Gastronomía Patagónica",
  description:
    "Recetas, productos típicos e ingredientes silvestres de la Patagonia argentina y chilena.",
  url: `${BASE}/gastronomia`,
}

function getAvailableCategorias(): GastronomiaCategoria[] {
  const cats = [...new Set(GASTRONOMIA_CATALOG.map((e) => e.categoria))]
  return cats.sort((a, b) => CATEGORIA_LABELS_PLURAL[a].localeCompare(CATEGORIA_LABELS_PLURAL[b], "es"))
}

export default async function GastronomiaPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const categorias = getAvailableCategorias()
  const activeCategoria: GastronomiaCategoria =
    categorias.includes(cat as GastronomiaCategoria) ? (cat as GastronomiaCategoria) : categorias[0]

  const entradas = GASTRONOMIA_CATALOG
    .filter((e) => e.categoria === activeCategoria)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen">
        <div style={{ background: "linear-gradient(135deg, #2a1508 0%, #4d2e10 60%, #2a1508 100%)" }} className="text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
            <div className="flex items-center gap-3 mb-4">
              <ChefHat size={22} strokeWidth={1.5} className="opacity-60" />
              <span className="text-sm uppercase tracking-widest opacity-60">Gastronomía</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Gastronomía Patagónica
            </h1>
            <p className="mt-3 text-white/70 max-w-xl text-base leading-relaxed">
              Ingredientes silvestres, recetas tradicionales y productos típicos de la Patagonia
              argentina y chilena: hongos de pino, cordero al asador, curanto y más.
            </p>
          </div>
        </div>

        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <div className="flex gap-1 overflow-x-auto">
              {categorias.map((c) => {
                const isActive = c === activeCategoria
                const count = GASTRONOMIA_CATALOG.filter((e) => e.categoria === c).length
                return (
                  <Link
                    key={c}
                    href={`/gastronomia?cat=${c}`}
                    className={`px-4 py-2.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-b-2 border-[var(--color-terracotta)] text-[var(--color-terracotta)] -mb-px"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {CATEGORIA_LABELS_PLURAL[c]}
                    <span className="ml-1.5 text-xs opacity-60">({count})</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">{CATEGORIA_LABELS_PLURAL[activeCategoria]}</h2>
            <span className="text-sm text-muted-foreground">
              {entradas.length} {entradas.length === 1 ? "entrada" : "entradas"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entradas.map((e) => (
              <Link
                key={e.slug}
                href={`/gastronomia/${e.slug}`}
                className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                      {e.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{PAIS_LABELS[e.pais]}</p>
                  </div>
                  <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center ring-2 ring-border bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
                    <ChefHat size={18} strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-xs font-medium text-[var(--color-teal)] mt-auto">Ver más →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
