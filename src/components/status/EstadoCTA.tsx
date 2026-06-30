import Link from "next/link"
import { Flame, ChevronRight } from "lucide-react"
import { Section, PageShell } from "@/components/layout"
import { fetchPatagoniaFires } from "@/lib/apis/nasa-firms"

export async function EstadoCTA() {
  const fires = await fetchPatagoniaFires()

  return (
    <Section spacing="sm">
      <PageShell>
        <Link
          href="/estado"
          className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-6 bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-teal-light)] text-[var(--color-cream)] hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Flame size={24} strokeWidth={1.5} className="hidden sm:block text-[var(--color-cream)] flex-shrink-0" />
            <div>
              <p className="font-bold font-heading">
                {fires.count > 0
                  ? `${fires.count} foco${fires.count !== 1 ? "s" : ""} activo${fires.count !== 1 ? "s" : ""} detectado${fires.count !== 1 ? "s" : ""} ahora`
                  : "Clima, glaciares e incendios, actualizado cada hora"}
              </p>
              <p className="text-sm opacity-80">
                Mirá el panel completo con mapas y todos los datos en tiempo real
              </p>
            </div>
          </div>
          <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--color-cream)] text-[var(--color-teal)] font-semibold text-sm group-hover:bg-white transition-colors">
            Ver estado completo
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </PageShell>
    </Section>
  )
}
