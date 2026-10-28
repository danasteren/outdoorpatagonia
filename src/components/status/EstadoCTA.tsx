import { Flame, ChevronRight } from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { fetchPatagoniaFires } from "@/lib/apis/nasa-firms"
import { SiteLink } from "@/components/SiteLink"

function firesLabel(count: number, lang: "es" | "en"): string {
  const s = count !== 1 ? "s" : ""
  if (lang === "en") return `${count} active fire${s} detected right now`
  return `${count} foco${s} activo${s} detectado${s} ahora`
}

const TEXT = {
  es: {
    noFires: "Clima, glaciares e incendios, actualizado cada hora",
    description: "Mirá el panel completo con mapas y todos los datos en tiempo real",
    cta: "Ver estado completo",
  },
  en: {
    noFires: "Weather, glaciers and wildfires, updated hourly",
    description: "See the full dashboard with maps and all the live data",
    cta: "See full conditions",
  },
}

export async function EstadoCTA({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = TEXT[lang]
  const fires = await fetchPatagoniaFires()

  return (
    <Section spacing="sm">
      <PageShell>
        <SiteLink
          lang={lang}
          href="/estado"
          className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-6 bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-teal-light)] text-[var(--color-cream)] hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Flame size={24} strokeWidth={1.5} className="hidden sm:block text-[var(--color-cream)] flex-shrink-0" />
            <div>
              <p className="font-bold font-heading">
                {fires.count > 0 ? firesLabel(fires.count, lang) : t.noFires}
              </p>
              <p className="text-sm opacity-80">
                {t.description}
              </p>
            </div>
          </div>
          <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--color-cream)] text-[var(--color-teal)] font-semibold text-sm group-hover:bg-white transition-colors">
            {t.cta}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </SiteLink>
      </PageShell>
    </Section>
  )
}
