// Re-export all types so existing imports keep working
export type { ClimbingStyle, Equipment, Route, Subarea, Sector, FrenchGrade } from "./types"
export { ESTILO_LABELS, PAIS_LABELS, FRENCH_GRADES, gradeIndex, gradeColor, totalVias } from "./types"

import type { Sector } from "./types"
import { fitzRoy } from "./sectores/fitz-roy"
import { cerroTorre } from "./sectores/cerro-torre"
import { piedrasBlancas } from "./sectores/piedras-blancas"
import { cerroCatedral } from "./sectores/cerro-catedral"
import { laPaloma } from "./sectores/la-paloma"
import { piedraParada } from "./sectores/piedra-parada"
import { torresDelPaine } from "./sectores/torres-del-paine"
import { cochamo } from "./sectores/cochamo"
import { cerroCastillo } from "./sectores/cerro-castillo"
import { laEsfinge } from "./sectores/la-esfinge"
import { valleDelFrances } from "./sectores/valle-del-frances"

export const ESCALADA_CATALOG: Sector[] = [
  // ─── Argentina ──────────────────────────────────────────────────
  fitzRoy,
  cerroTorre,
  piedrasBlancas,
  cerroCatedral,
  laPaloma,
  piedraParada,
  // ─── Chile ──────────────────────────────────────────────────────
  torresDelPaine,
  cochamo,
  cerroCastillo,
  laEsfinge,
  valleDelFrances,
]

export function getSectorEntry(slug: string): Sector | null {
  return ESCALADA_CATALOG.find((s) => s.slug === slug) ?? null
}
