import type { Metadata } from "next"
import Link from "next/link"
import { Bone, Footprints, HandMetal, Layers } from "lucide-react"
import {
  ARQUEOLOGIA_CATALOG,
  CATEGORIA_LABELS,
  CATEGORIA_LABELS_PLURAL,
  type ArqueologiaCategoria,
} from "@/lib/arqueologia/catalog"

export const metadata: Metadata = {
  title: "Arqueología de la Patagonia — Dinosaurios, Fósiles y Arte Rupestre",
  description:
    "Guía de arqueología patagónica: dinosaurios gigantes como Argentinosaurus y Patagotitan, fósiles del Mesozoico, sitios humanos como Cueva de las Manos y petroglifos de 10.000 años.",
  openGraph: {
    title: "Arqueología de la Patagonia — Dinosaurios, Fósiles y Arte Rupestre",
    description:
      "Guía de arqueología patagónica: dinosaurios gigantes, fósiles del Mesozoico, Cueva de las Manos y petroglifos de 10.000 años.",
    url: "https://outdoorpatagonia.com/arqueologia",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Arqueología de la Patagonia" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://outdoorpatagonia.com/arqueologia" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Arqueología de la Patagonia",
  description:
    "Guía de sitios y hallazgos arqueológicos y paleontológicos de la Patagonia argentina y chilena: dinosaurios titánicos, fósiles del Mesozoico, arte rupestre y los primeros humanos.",
  url: "https://outdoorpatagonia.com/arqueologia",
  about: {
    "@type": "Thing",
    name: "Patrimonio paleontológico y arqueológico de la Patagonia",
  },
}

const CATEGORIA_ICON: Record<ArqueologiaCategoria, typeof Bone> = {
  dinosaurio: Bone,
  fosil: Layers,
  humano: Footprints,
  petroglifo: HandMetal,
}

const CATEGORIA_COLOR: Record<
  ArqueologiaCategoria,
  { badge: string; tab: string; icon: string; hero: string }
> = {
  dinosaurio: {
    badge: "bg-amber-500/10 text-amber-700",
    tab: "border-amber-600 text-amber-700",
    icon: "bg-amber-500/15 text-amber-700",
    hero: "linear-gradient(135deg, #3d2200 0%, #6b3a00 60%, #3d2200 100%)",
  },
  fosil: {
    badge: "bg-slate-500/10 text-slate-700",
    tab: "border-slate-600 text-slate-700",
    icon: "bg-slate-500/15 text-slate-700",
    hero: "linear-gradient(135deg, #1a1f2e 0%, #2d3a52 60%, #1a1f2e 100%)",
  },
  humano: {
    badge: "bg-[var(--color-teal)]/10 text-[var(--color-teal)]",
    tab: "border-[var(--color-teal)] text-[var(--color-teal)]",
    icon: "bg-[var(--color-teal)]/15 text-[var(--color-teal)]",
    hero: "linear-gradient(135deg, #0a2e2e 0%, #0d4040 60%, #0a2e2e 100%)",
  },
  petroglifo: {
    badge: "bg-violet-500/10 text-violet-700",
    tab: "border-violet-600 text-violet-700",
    icon: "bg-violet-500/15 text-violet-700",
    hero: "linear-gradient(135deg, #1e0a3d 0%, #3a1670 60%, #1e0a3d 100%)",
  },
}

function getAvailableCategories(): ArqueologiaCategoria[] {
  const cats = [...new Set(ARQUEOLOGIA_CATALOG.map((e) => e.categoria))]
  const order: ArqueologiaCategoria[] = ["dinosaurio", "fosil", "humano", "petroglifo"]
  return order.filter((c) => cats.includes(c))
}

export default async function ArqueologiaPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const categories = getAvailableCategories()
  const activeCategory: ArqueologiaCategoria =
    categories.includes(cat as ArqueologiaCategoria)
      ? (cat as ArqueologiaCategoria)
      : categories[0]

  const entries = ARQUEOLOGIA_CATALOG.filter((e) => e.categoria === activeCategory)
  const colors = CATEGORIA_COLOR[activeCategory]
  const CatIcon = CATEGORIA_ICON[activeCategory]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <div style={{ background: colors.hero }} className="text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
            <div className="flex items-center gap-3 mb-4">
              <CatIcon size={22} strokeWidth={1.5} className="opacity-60" />
              <span className="text-sm uppercase tracking-widest opacity-60">
                Patrimonio arqueológico
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Arqueología de la Patagonia
            </h1>
            <p className="mt-3 text-white/70 max-w-xl text-base leading-relaxed">
              Dinosaurios titánicos, fósiles del Mesozoico, los primeros humanos y miles
              de años de arte rupestre en la región más rica en hallazgos prehistóricos de América del Sur.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((cat) => {
                const isActive = cat === activeCategory
                const count = ARQUEOLOGIA_CATALOG.filter((e) => e.categoria === cat).length
                const Icon = CATEGORIA_ICON[cat]
                return (
                  <Link
                    key={cat}
                    href={`/arqueologia?cat=${cat}`}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                      isActive
                        ? `border-b-2 -mb-px ${CATEGORIA_COLOR[cat].tab}`
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {CATEGORIA_LABELS_PLURAL[cat]}
                    <span className="ml-0.5 text-xs opacity-60">({count})</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">{CATEGORIA_LABELS_PLURAL[activeCategory]}</h2>
            <span className="text-sm text-muted-foreground">
              {entries.length} {entries.length === 1 ? "hallazgo" : "hallazgos"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((e) => {
              const Icon = CATEGORIA_ICON[e.categoria]
              return (
                <Link
                  key={e.slug}
                  href={`/arqueologia/${e.slug}`}
                  className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                          {e.nombre}
                        </p>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shrink-0 ${colors.badge}`}
                        >
                          {CATEGORIA_LABELS[e.categoria]}
                        </span>
                      </div>
                      {e.nombreCientifico && (
                        <p className="text-xs text-muted-foreground italic">
                          {e.nombreCientifico}
                        </p>
                      )}
                    </div>
                    <div
                      className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ring-2 ring-border ${colors.icon}`}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{e.era}</span>
                    {e.edadAnios && (
                      <>
                        <span>·</span>
                        <span>{e.edadAnios}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {e.provincia} · {e.pais === "CL" ? "Chile" : e.pais === "CL/AR" ? "Chile/Argentina" : "Argentina"}
                  </p>

                  <span className="text-xs font-medium text-[var(--color-teal)] mt-auto">
                    Ver más →
                  </span>
                </Link>
              )
            })}
          </div>

          {/* GEO content */}
          <div className="mt-12 prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h2 className="text-base font-bold text-foreground">
              La Patagonia, capital mundial de la paleontología
            </h2>
            <p>
              La Patagonia concentra el mayor número de descubrimientos de dinosaurios titanosaurios del
              planeta. La Formación Huincul y la Formación Candeleros, en Neuquén, son los yacimientos
              más prolíficos del mundo para terópodos y saurópodos gigantes del Cretácico Tardío.
              Argentinosaurus, Giganotosaurus y Patagotitan — los candidatos al récord de dinosaurio más
              grande de la historia — provienen de esta región.
            </p>
            <p>
              En cuanto a presencia humana, los primeros patagónicos llegaron hace al menos 13.000 años
              y convivieron con la megafauna del Pleistoceno: mylodones, caballos americanos y
              gliptodontes. La <strong>Cueva de las Manos</strong> (Santa Cruz, Patrimonio UNESCO) es la
              expresión artística más antigua y preservada de estos pueblos — con más de 800 manos
              negativas que abarcan 10.000 años de historia ininterrumpida.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
