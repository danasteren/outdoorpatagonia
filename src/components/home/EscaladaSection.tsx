import Link from "next/link"
import { ChevronRight, Heart, Pickaxe } from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { ESCALADA_CATALOG, gradeBuckets, totalVias } from "@/lib/escalada/catalog"
import { GradeBars } from "@/components/escalada/GradeBars"
import { CountUp, Reveal, ViaDibujada } from "./EscaladaMotion"

// Solo se muestran números de sectores cargados desde una guía con fuente
export function EscaladaSection() {
  const conGuia = ESCALADA_CATALOG.filter((s) => s.fuente && totalVias(s) > 0)
  if (conGuia.length === 0) return null

  const rutas = conGuia.flatMap((s) => s.subareas.flatMap((sub) => sub.rutas))
  const zonas = conGuia.reduce((acc, s) => acc + (s.zonas?.length ?? 1), 0)
  const buckets = gradeBuckets(rutas)
  const gradoMax = buckets.filter((b) => !b.grado.includes("?")).at(-1)?.grado
  const recomendadas = conGuia.flatMap((s) =>
    s.subareas.flatMap((sub) =>
      sub.rutas
        .filter((r) => r.recomendada)
        .map((r) => ({ nombre: r.nombre, grado: r.grado, lugar: sub.zona ?? s.nombre }))
    )
  )
  const destacado = conGuia[0]
  const otros = ESCALADA_CATALOG.filter((s) => !conGuia.includes(s))

  return (
    <Section spacing="md">
      <PageShell>
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-forest)] text-[var(--color-cream)] shadow-card">
          <div className="relative grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10">
            <Reveal>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-teal-light)]">
                    <Pickaxe className="w-4 h-4" strokeWidth={1.5} />
                    Escalada
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mt-3">
                    Escalada en Patagonia, vía por vía
                  </h2>
                </div>
                <ViaDibujada className="shrink-0 w-[5.5rem] h-[8.25rem] -mt-1 -mr-1" />
              </div>
              <p className="text-sm md:text-base text-[var(--color-cream)]/75 leading-relaxed mt-3 max-w-md">
                Grado, metros, chapas y aperturista de cada vía, cargados desde las guías que arman
                los escaladores de cada zona. Empezamos por {destacado.nombre}.
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 max-w-sm">
                <div>
                  <dd className="font-heading text-4xl font-bold">
                    <CountUp value={rutas.length} />
                  </dd>
                  <dt className="text-[10px] uppercase tracking-widest text-[var(--color-cream)]/60 mt-1">
                    Vías
                  </dt>
                </div>
                <div>
                  <dd className="font-heading text-4xl font-bold">
                    <CountUp value={zonas} />
                  </dd>
                  <dt className="text-[10px] uppercase tracking-widest text-[var(--color-cream)]/60 mt-1">
                    Sectores
                  </dt>
                </div>
                {gradoMax && (
                  <div>
                    <dd className="font-heading text-4xl font-bold">{gradoMax}</dd>
                    <dt className="text-[10px] uppercase tracking-widest text-[var(--color-cream)]/60 mt-1">
                      Grado máx.
                    </dt>
                  </div>
                )}
              </dl>

              <div className="mt-7 flex flex-col sm:flex-row gap-2.5">
                <Link
                  href={`/escalada/${destacado.slug}`}
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-cream)] text-[var(--color-forest)] px-5 py-3 text-sm font-bold hover:bg-white transition-colors"
                >
                  Ver las {totalVias(destacado)} vías de {destacado.nombre}
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/escalada"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-cream)]/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Todos los sectores
                </Link>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 p-4 md:p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-cream)]/60">
                  Vías por grado · {conGuia.map((s) => s.nombre).join(", ")}
                </p>
                <GradeBars buckets={buckets} tone="onDark" className="mt-4" />
              </div>
              <p className="text-xs text-[var(--color-cream)]/60 leading-relaxed mt-3">
                Datos de{" "}
                {conGuia.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && ", "}
                    <a
                      href={s.fuente!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--color-teal-light)] hover:underline"
                    >
                      {s.fuente!.nombre}
                    </a>{" "}
                    ({s.fuente!.edicion})
                  </span>
                ))}
                . La guía original tiene los croquis de cada pared.
              </p>
            </Reveal>
          </div>

          {/* Vías recomendadas en cinta continua */}
          {recomendadas.length > 3 && (
            <div className="relative border-t border-white/10 py-3.5 overflow-hidden" aria-label="Vías recomendadas por la guía">
              <ul className="flex w-max gap-2.5 animate-marquee hover:[animation-play-state:paused]">
                {[...recomendadas, ...recomendadas].map((r, i) => (
                  <li
                    key={i}
                    aria-hidden={i >= recomendadas.length}
                    className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white/[0.07] border border-white/10 pl-3 pr-1.5 py-1.5 text-xs"
                  >
                    <Heart className="w-3 h-3 text-rose-400" fill="currentColor" aria-hidden="true" />
                    <span className="font-medium">{r.nombre}</span>
                    <span className="text-[var(--color-cream)]/50">{r.lugar}</span>
                    <span className="rounded-full bg-[var(--color-cream)] text-[var(--color-forest)] px-2 py-0.5 font-mono font-bold">
                      {r.grado}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Resto de los sectores */}
        {otros.length > 0 && (
          <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap">
            {otros.map((s) => (
              <Link
                key={s.slug}
                href={`/escalada/${s.slug}`}
                className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-[var(--color-teal)] hover:border-[var(--color-teal)]/50 transition-colors"
              >
                {s.nombre}
              </Link>
            ))}
          </div>
        )}
      </PageShell>
    </Section>
  )
}
