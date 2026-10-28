// Deterministic "changes every day" content for the homepage hero —
// no client JS or DB needed, just date math. Paired with `revalidate`
// on the page so it refreshes in production.

import { PARQUES_CATALOG } from "@/lib/parques/catalog"
import { SENDEROS_CATALOG } from "@/lib/senderos/catalog"
import { DESTINOS_CATALOG, type DestinoEntry } from "@/lib/destinos/catalog"

export function getDayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const diff = date.getTime() - start
  return Math.floor(diff / 86_400_000)
}

// Día del año según el calendario de Argentina (UTC-3, sin horario de verano):
// el destino del día cambia a medianoche de Argentina, no a medianoche UTC.
export function getDayOfYearAR(date: Date): number {
  const [year, month, day] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .split("-")
    .map(Number)
  return getDayOfYear(new Date(Date.UTC(year, month - 1, day)))
}

// Guía de destino del hero de la home. Rota sobre todas las guías publicadas,
// así que cada guía nueva entra sola. Es la misma en ES y EN.
export function getDestinoDelDia(date: Date = new Date()): DestinoEntry {
  return DESTINOS_CATALOG[getDayOfYearAR(date) % DESTINOS_CATALOG.length]
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

// Parques y senderos solo tienen texto en español: en inglés el dato sale de
// la intro de las guías de destino, que sí tienen versión en inglés.
const HIGHLIGHTS_EN: DailyHighlight[] = DESTINOS_CATALOG.map((d) => ({
  text: leadingExcerpt(d.en.intro[0]),
  href: `/en/guides/${d.slug}`,
  source: d.nombre,
}))

export function getDailyHighlight(lang: "es" | "en" = "es"): DailyHighlight {
  const highlights = lang === "en" ? HIGHLIGHTS_EN : HIGHLIGHTS
  // En inglés el dato también sale de las guías: se corre uno para que no
  // repita el destino del día del título.
  const dayOfYear = getDayOfYearAR(new Date()) + (lang === "en" ? 1 : 0)
  return highlights[dayOfYear % highlights.length]
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

export function getTodayLabel(lang: "es" | "en" = "es"): string {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "numeric",
    month: "long",
  }).format(new Date())
}

// Patagonia local time (hour:minute), shown alongside the date so visitors
// browsing from other time zones know this isn't their own local time.
export function getCurrentTimeLabel(): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date())
}
