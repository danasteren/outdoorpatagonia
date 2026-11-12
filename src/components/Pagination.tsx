import { listingHref } from "@/lib/listing"

/** Paginador con <a> reales (funciona sin JS). No renderiza nada si hay una sola página. */
export function Pagination({
  base,
  cat,
  page,
  totalPages,
}: {
  base: string
  cat?: string | null
  page: number
  totalPages: number
}) {
  if (totalPages <= 1) return null
  const item =
    "inline-flex min-w-10 h-10 items-center justify-center px-3 rounded-lg border border-border text-sm font-medium hover:border-[var(--color-teal)] transition-colors"
  return (
    <nav aria-label="Paginación" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <a href={listingHref(base, cat, page - 1)} rel="prev" className={item}>
          ← Anterior
        </a>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <a
          key={n}
          href={listingHref(base, cat, n)}
          aria-current={n === page ? "page" : undefined}
          aria-label={`Página ${n}`}
          className={`${item} ${n === page ? "bg-[var(--color-teal)] text-white border-[var(--color-teal)]" : ""}`}
        >
          {n}
        </a>
      ))}
      {page < totalPages && (
        <a href={listingHref(base, cat, page + 1)} rel="next" className={item}>
          Siguiente →
        </a>
      )}
    </nav>
  )
}
