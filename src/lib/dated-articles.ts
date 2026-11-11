/**
 * Artículos atados a una fecha: son los únicos que muestran fecha visible
 * (encabezado, bloque "Datos" y tarjetas) y el aviso de "sitio anterior".
 * El resto se ve atemporal. Ver DECISIONS 2026-11-11.
 */
export const DATED_ARTICLE_SLUGS: readonly string[] = [
  "eclipse-solar-anular-esquel-2027",
  "annular-solar-eclipse-2027",
  "tulipanes-trevelin",
  "trevelin-tulip-fields",
]

export function isDatedArticle(slug: string): boolean {
  return DATED_ARTICLE_SLUGS.includes(slug)
}
