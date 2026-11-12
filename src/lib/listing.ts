import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { pageAlternates } from "@/lib/hreflang"

// Listados de sección con filtros por subcategoría (?cat=) y paginación (?page=).
export const PAGE_SIZE = 24

/** `?page` inválido (no numérico, < 1, decimal) cae a 1. */
export function parsePage(raw: string | undefined): number {
  if (!raw || !/^\d+$/.test(raw)) return 1
  const n = Number(raw)
  return n >= 1 ? n : 1
}

/** Devuelve el tramo de la página; fuera de rango → 404 real. */
export function paginate<T>(items: T[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  if (page > totalPages) notFound()
  const start = (page - 1) * PAGE_SIZE
  return { items: items.slice(start, start + PAGE_SIZE), page, totalPages }
}

/** Href de una vista del listado: base sin parámetros, con ?cat= y/o ?page=N (la 1 no lleva parámetro). */
export function listingHref(base: string, cat?: string | null, page = 1): string {
  const qs = new URLSearchParams()
  if (cat) qs.set("cat", cat)
  if (page > 1) qs.set("page", String(page))
  const s = qs.toString()
  return s ? `${base}?${s}` : base
}

/**
 * alternates: con ?cat= válido, canonical a la base; sin filtro, page >= 2 tiene canonical propio.
 * El hreflang sigue siendo el de la base.
 */
export function listingAlternates(
  base: string,
  pair: string | null,
  opts: { filtered: boolean; page: number },
): NonNullable<Metadata["alternates"]> {
  const alt = pageAlternates(base, pair)
  if (!opts.filtered && opts.page >= 2) {
    return { ...alt, canonical: `https://outdoorpatagonia.com${listingHref(base, null, opts.page)}` }
  }
  return alt
}
