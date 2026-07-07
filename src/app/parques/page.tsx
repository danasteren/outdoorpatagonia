import type { Metadata } from "next"
import Link from "next/link"
import { Mountain } from "lucide-react"
import { PARQUES_CATALOG } from "@/lib/parques/catalog"
import { Badge } from "@/components/primitives/Badge"

export const metadata: Metadata = {
  title: "Parques Nacionales de la Patagonia | Outdoor Patagonia",
  description:
    "Guía de parques nacionales patagónicos: torres del paine, los glaciares, nahuel huapi, tierra del fuego y más. Senderos, fauna, clima y cómo llegar.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/parques",
  },
}

const COUNTRY_LABEL: Record<string, string> = {
  ar: "Argentina",
  cl: "Chile",
}

const COUNTRY_COLORS: Record<string, string> = {
  ar: "bg-sky-500/10 text-sky-600",
  cl: "bg-red-500/10 text-red-600",
}

const TABS = [
  { key: "ar", label: "Argentina" },
  { key: "cl", label: "Chile" },
]

export default async function ParquesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ pais?: string }>
}) {
  const { pais } = await searchParams
  const activePais = pais === "cl" ? "cl" : "ar"

  const parks = PARQUES_CATALOG.filter((p) => p.country === activePais).sort((a, b) =>
    a.name.localeCompare(b.name, "es")
  )

  return (
    <div className="min-h-screen">
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-6 h-6 opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">
              Guía de parques
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Parques Nacionales
          </h1>
          <p className="mt-3 text-[var(--color-cream)]/70 max-w-xl text-base leading-relaxed">
            Los parques nacionales de la Patagonia argentina y chilena: cómo llegar,
            qué ver, senderos, fauna y mejor época para visitarlos.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <div className="flex gap-1">
            {TABS.map(({ key, label }) => {
              const isActive = key === activePais
              const count = PARQUES_CATALOG.filter((p) => p.country === key).length
              return (
                <Link
                  key={key}
                  href={`/parques?pais=${key}`}
                  className={`px-4 py-2.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-b-2 border-[var(--color-forest)] text-[var(--color-forest)] -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
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
            <h2 className="text-xl font-bold">{COUNTRY_LABEL[activePais]}</h2>
            <span className="text-sm text-muted-foreground">
              {parks.length} {parks.length === 1 ? "parque" : "parques"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parks.map((p) => (
              <Link
                key={p.slug}
                href={`/parques/${p.slug}`}
                className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                      {p.name}
                    </p>
                    {(p.province ?? p.region) && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.province ?? p.region}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shrink-0 ${COUNTRY_COLORS[activePais]}`}
                  >
                    {COUNTRY_LABEL[activePais]}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-muted-foreground/60">
                    {p.surface}
                  </span>
                  <Badge variant="outline" size="sm">
                    Ver parque →
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
