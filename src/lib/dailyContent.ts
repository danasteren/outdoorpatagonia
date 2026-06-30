// Deterministic "changes every day" content for the homepage hero —
// no client JS or DB needed, just date math. Paired with `revalidate`
// on the page so it refreshes in production.

import { PARQUES_CATALOG } from "@/lib/parques/catalog"
import { SENDEROS_CATALOG } from "@/lib/senderos/catalog"

export function getDayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const diff = date.getTime() - start
  return Math.floor(diff / 86_400_000)
}

// Leading excerpt of a longer description, cut at the last full sentence
// within the budget — keeps the hero card punchy without duplicating the
// full editorial copy on the target page. The `(?!\d)` guard stops it from
// treating a decimal/thousands separator (e.g. "3.405 m") as a sentence end.
function leadingExcerpt(text: string, maxLength = 190): string {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  const window = trimmed.slice(0, maxLength)
  const sentenceMatch = window.match(/^.*[.!?](?!\d)(?=\s)/)
  if (sentenceMatch && sentenceMatch[0].length > 40) return sentenceMatch[0].trim()
  const lastSpace = window.lastIndexOf(" ")
  return `${window.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}

export type DailyHighlight = {
  text: string
  href: string
  source: string
}

// Pulled straight from the real parque/sendero catalogs (same data that
// powers /parques and /senderos) so the link always lands on a real,
// already-published page — never an invented fact.
const HIGHLIGHTS: DailyHighlight[] = [
  ...PARQUES_CATALOG.map((p) => ({
    text: leadingExcerpt(p.description),
    href: `/parques/${p.slug}`,
    source: p.name,
  })),
  ...SENDEROS_CATALOG.map((s) => ({
    text: leadingExcerpt(s.description),
    href: `/senderos/${s.slug}`,
    source: s.title,
  })),
]

export function getDailyHighlight(): DailyHighlight {
  const dayOfYear = getDayOfYear(new Date())
  return HIGHLIGHTS[dayOfYear % HIGHLIGHTS.length]
}

export type TimeOfDay = "amanecer" | "dia" | "atardecer" | "noche"

export function getTimeOfDay(): TimeOfDay {
  const hour = Number(
    new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
  )
  if (hour >= 6 && hour < 9) return "amanecer"
  if (hour >= 9 && hour < 18) return "dia"
  if (hour >= 18 && hour < 21) return "atardecer"
  return "noche"
}

export function getTodayLabel(): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "numeric",
    month: "long",
  }).format(new Date())
}
