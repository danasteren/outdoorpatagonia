import type { TripFormData, ItineraryResult } from "@/lib/planner/types"
import type { Destino } from "@/lib/planner/packing"
import { resolveRelacionados, type RelacionadoResuelto, type Relacionado } from "@/lib/relacionados"
import { VOLCANES_CATALOG } from "@/lib/volcanes/catalog"
import { PARQUES_CATALOG } from "@/lib/parques/catalog"
import { ARQUEOLOGIA_CATALOG } from "@/lib/arqueologia/catalog"
import { TERMAS_CATALOG } from "@/lib/termas/catalog"
import { GASTRONOMIA_CATALOG } from "@/lib/gastronomia/catalog"

type SavedItinerary = {
  id: string
  form_data: TripFormData
  result: ItineraryResult
}

// Palabras clave para reconocer un destino de /planear/que-llevar en el texto
// libre de `day.location` de un itinerario guardado (ej: "El Chaltén — trekking").
const DESTINO_KEYWORDS: Record<Destino, string[]> = {
  calafate: ["calafate"],
  chalten: ["chaltén", "chalten", "fitz roy"],
  ushuaia: ["ushuaia"],
  madryn: ["madryn", "valdés", "valdes", "peninsula valdes", "península valdés"],
  bariloche: ["bariloche"],
  angostura: ["angostura"],
  "carretera-austral": ["carretera austral", "coyhaique", "futaleufú", "futaleufu"],
  "torres-paine": ["torres del paine", "puerto natales"],
}

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
}

/** Busca el primer destino de /planear/que-llevar mencionado en las ubicaciones del itinerario. */
export function matchDestino(result: ItineraryResult): Destino | null {
  const haystack = normalize(result.days.map((d) => d.location).join(" "))
  for (const key of Object.keys(DESTINO_KEYWORDS) as Destino[]) {
    if (DESTINO_KEYWORDS[key].some((kw) => haystack.includes(normalize(kw)))) return key
  }
  return null
}

export interface UpcomingTrip {
  itinerary: SavedItinerary
  daysUntil: number
  destino: Destino | null
}

/** El próximo viaje guardado con fecha futura (o más cercana), o null si no hay ninguno. */
export function getUpcomingTrip(itineraries: SavedItinerary[]): UpcomingTrip | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let best: UpcomingTrip | null = null
  for (const it of itineraries) {
    const tripDate = new Date(it.form_data.year, it.form_data.month - 1, 1)
    const daysUntil = Math.round((tripDate.getTime() - today.getTime()) / 86_400_000)
    if (daysUntil < 0) continue
    if (!best || daysUntil < best.daysUntil) {
      best = { itinerary: it, daysUntil, destino: matchDestino(it.result) }
    }
  }
  return best
}

const CATALOGS_WITH_RELACIONADOS: Record<string, { slug: string; relacionados?: Relacionado[] }[]> = {
  volcanes: VOLCANES_CATALOG,
  parques: PARQUES_CATALOG,
  arqueologia: ARQUEOLOGIA_CATALOG,
  termas: TERMAS_CATALOG,
  gastronomia: GASTRONOMIA_CATALOG,
}

/** Sugerencias de contenido relacionado a lo que el usuario ya guardó (cross-links de catálogo). */
export function getRecommendations(
  saved: Array<{ slug: string; category: string | null }>,
  limit = 4
): RelacionadoResuelto[] {
  const savedHrefs = new Set(saved.filter((s) => s.category).map((s) => `/${s.category}/${s.slug}`))
  const results: RelacionadoResuelto[] = []
  const seen = new Set<string>()

  for (const item of saved) {
    if (!item.category) continue
    const catalog = CATALOGS_WITH_RELACIONADOS[item.category]
    const entry = catalog?.find((e) => e.slug === item.slug)
    if (!entry?.relacionados) continue

    for (const r of resolveRelacionados(entry.relacionados)) {
      if (savedHrefs.has(r.href) || seen.has(r.href)) continue
      seen.add(r.href)
      results.push(r)
      if (results.length >= limit) return results
    }
  }
  return results
}
