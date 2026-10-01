import Link from "next/link"
import { Compass } from "lucide-react"
import { DESTINOS_CATALOG, type DestinoLang } from "@/lib/destinos/catalog"

const T = {
  es: {
    eyebrow: "Guías de viaje",
    title: "Destinos de la Patagonia",
    lead: "Guías de viaje por destino: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse, con datos de fuentes oficiales.",
    href: (s: string) => `/destinos/${s}`,
    cta: "Ver guía →",
  },
  en: {
    eyebrow: "Travel guides",
    title: "Patagonia travel guides",
    lead: "Destination guides: things to do, month-by-month weather, best time to visit, how to get there and how many days to stay, based on official sources.",
    href: (s: string) => `/en/guides/${s}`,
    cta: "Read guide →",
  },
} as const

export function DestinosIndex({ lang }: { lang: DestinoLang }) {
  const t = T[lang]
  return (
    <div className="min-h-screen">
      <div style={{ background: "linear-gradient(135deg, #0a2233 0%, #103a4d 60%, #0a2233 100%)" }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Compass size={22} strokeWidth={1.5} className="opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">{t.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.title}
          </h1>
          <p className="mt-3 text-white/70 max-w-xl text-base leading-relaxed">{t.lead}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINOS_CATALOG.map((d) => (
            <Link
              key={d.slug}
              href={t.href(d.slug)}
              className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                    {d.nombre}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{d[lang].subtitulo}</p>
                </div>
                <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center ring-2 ring-border bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
                  <Compass size={18} strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{d[lang].metaDescription}</p>
              <span className="text-xs font-medium text-[var(--color-teal)] mt-auto">{t.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
