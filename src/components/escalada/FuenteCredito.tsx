import { BookOpen, Download, ExternalLink, HandHeart } from "lucide-react"
import type { Fuente } from "@/lib/escalada/catalog"

/** Crédito a la guía de origen de los datos, con links para bajarla y apoyar a quienes la hacen. */
export function FuenteCredito({ fuente }: { fuente: Fuente }) {
  return (
    <aside
      aria-label="Fuente de los datos"
      className="rounded-2xl border border-[var(--color-teal)]/30 bg-[var(--color-teal)]/[0.06] p-5"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-teal)] text-[var(--color-cream)]">
          <BookOpen className="w-5 h-5" strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-teal)]">
            Datos de la guía local
          </p>
          <p className="font-heading font-bold text-lg leading-snug mt-0.5">
            <a href={fuente.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {fuente.nombre}
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{fuente.edicion}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mt-4">
        Las vías, grados, metros y aperturistas de esta página salen de esa guía, hecha por
        escaladores de la zona. Los croquis y las fotos de cada pared están en la guía original:
        bajala antes de ir.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        {fuente.descargaUrl && (
          <a
            href={fuente.descargaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-teal)] text-[var(--color-cream)] px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Bajar la guía gratis
          </a>
        )}
        {fuente.aportesUrl && (
          <a
            href={fuente.aportesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-teal)]/50 text-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--color-teal)]/10 transition-colors"
          >
            <HandHeart className="w-4 h-4" />
            Aportar para equipar vías
          </a>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed mt-4">
        {fuente.creditos}
        {fuente.instagram && (
          <>
            {" "}
            <a
              href={fuente.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-semibold text-[var(--color-teal)] hover:underline"
            >
              Instagram
              <ExternalLink className="w-3 h-3" />
            </a>
          </>
        )}
      </p>
    </aside>
  )
}
