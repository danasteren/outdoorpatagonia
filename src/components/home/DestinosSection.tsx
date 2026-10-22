import Link from "next/link"
import { ChevronRight, Signpost } from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { DESTINOS_CATALOG } from "@/lib/destinos/catalog"

const TEXT = {
  es: {
    eyebrow: "Guías de viaje",
    title: "Destinos de la Patagonia",
    description: "Qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse, con datos de fuentes oficiales.",
    seeAll: "Ver todas",
    seeAllGuides: "Ver todas las guías",
    base: "/destinos",
  },
  en: {
    eyebrow: "Travel guides",
    title: "Patagonia destinations",
    description: "Things to do, month-by-month weather, best time to visit, how to get there and how long to stay, with data from official sources.",
    seeAll: "See all",
    seeAllGuides: "See all guides",
    base: "/en/guides",
  },
}

// Bloque de guías de destino en la home: entra con la 6ª guía (regla en .claude/rules/destinos.md)
export function DestinosSection({ lang = "es" }: { lang?: "es" | "en" }) {
  if (DESTINOS_CATALOG.length === 0) return null
  const t = TEXT[lang]

  return (
    <Section spacing="md">
      <PageShell>
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-teal)]">
              <Signpost className="w-4 h-4" strokeWidth={1.5} />
              {t.eyebrow}
            </p>
            <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              {t.description}
            </p>
          </div>
          <Link
            href={t.base}
            className="hidden sm:inline-flex items-center gap-0.5 shrink-0 text-sm font-medium text-[var(--color-teal)] hover:underline"
          >
            {t.seeAll}
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DESTINOS_CATALOG.map((d) => (
            <Link
              key={d.slug}
              href={`${t.base}/${d.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-border bg-card hover:border-[var(--color-teal)] hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                {d.nombre}
              </h3>
              <p className="text-xs text-muted-foreground">{d[lang].subtitulo}</p>
            </Link>
          ))}
        </div>

        <Link
          href={t.base}
          className="sm:hidden mt-4 inline-flex items-center gap-0.5 text-sm font-medium text-[var(--color-teal)]"
        >
          {t.seeAllGuides}
          <ChevronRight size={14} />
        </Link>
      </PageShell>
    </Section>
  )
}
