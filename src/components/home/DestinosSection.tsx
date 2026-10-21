import Link from "next/link"
import { ChevronRight, Signpost } from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { DESTINOS_CATALOG } from "@/lib/destinos/catalog"

// Bloque de guías de destino en la home: entra con la 6ª guía (regla en .claude/rules/destinos.md)
export function DestinosSection() {
  if (DESTINOS_CATALOG.length === 0) return null

  return (
    <Section spacing="md">
      <PageShell>
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-teal)]">
              <Signpost className="w-4 h-4" strokeWidth={1.5} />
              Guías de viaje
            </p>
            <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Destinos de la Patagonia
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse, con datos de fuentes oficiales.
            </p>
          </div>
          <Link
            href="/destinos"
            className="hidden sm:inline-flex items-center gap-0.5 shrink-0 text-sm font-medium text-[var(--color-teal)] hover:underline"
          >
            Ver todas
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DESTINOS_CATALOG.map((d) => (
            <Link
              key={d.slug}
              href={`/destinos/${d.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-border bg-card hover:border-[var(--color-teal)] hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                {d.nombre}
              </h3>
              <p className="text-xs text-muted-foreground">{d.es.subtitulo}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/destinos"
          className="sm:hidden mt-4 inline-flex items-center gap-0.5 text-sm font-medium text-[var(--color-teal)]"
        >
          Ver todas las guías
          <ChevronRight size={14} />
        </Link>
      </PageShell>
    </Section>
  )
}
