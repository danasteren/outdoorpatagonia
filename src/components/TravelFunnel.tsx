import { ArrowRight, ExternalLink } from "lucide-react"
import { SiteLink } from "@/components/SiteLink"
import { getDestinoEntry } from "@/lib/destinos/catalog"
import { gygSearchUrl } from "@/lib/affiliates/getyourguide"

type Lang = "es" | "en"

// Bloque "Planeá tu viaje" de los artículos con embudo (src/lib/article-funnels.ts).
// Los links llevan data-funnel: AffiliateClickTracker los mide con placement_type "embudo".
export function TravelFunnel({ slugs, lang }: { slugs: string[]; lang: Lang }) {
  const guias = slugs.map((s) => getDestinoEntry(s)).filter((g) => g !== undefined)
  if (guias.length === 0) return null

  const en = lang === "en"
  const base = en ? "/en/guides" : "/destinos"
  const gygQuery = guias.flatMap((g) => g[lang].queHacer.map((q) => q.gygQuery)).find(Boolean)
  const first = guias[0]

  return (
    <aside
      aria-labelledby="travel-funnel-title"
      className="my-8 rounded-2xl border border-border bg-card p-5 md:p-6"
    >
      <h2 id="travel-funnel-title" className="!mt-0 !mb-1 text-xl font-bold">
        {en ? "Plan your trip" : "Planeá tu viaje"}
      </h2>
      <p className="!mb-0 text-sm text-muted-foreground">
        {en
          ? "Ready to go? These guides cover what to do, when to go and how to get there."
          : "¿Te dieron ganas de ir? Estas guías te cuentan qué hacer, cuándo ir y cómo llegar."}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {guias.map((g) => (
          <SiteLink
            key={g.slug}
            lang={lang}
            href={`${base}/${g.slug}`}
            data-funnel="guia"
            className="group !text-foreground !no-underline flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:border-[var(--color-teal)]"
          >
            <span className="min-w-0">
              <span className="block font-semibold">{g.nombre}</span>
              <span className="block text-xs !text-muted-foreground">{g[lang].subtitulo}</span>
            </span>
            <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 text-[var(--color-teal)]" />
          </SiteLink>
        ))}
      </div>
      {gygQuery && (
        <a
          href={gygSearchUrl(gygQuery)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          data-funnel="gyg"
          className="mt-4 inline-flex !no-underline items-center gap-1.5 text-sm font-medium text-[var(--color-teal)] hover:underline"
        >
          {en ? `Tours and activities near ${first.nombre}` : `Excursiones y actividades cerca de ${first.nombre}`}
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
      )}
    </aside>
  )
}
