// Embudo de viaje: artículos con mucho tráfico que muestran el bloque "Planeá tu viaje"
// (TravelFunnel) con links a guías de destino y a GetYourGuide.
// Decisión 2026-11-17 (docs/DECISIONS.md). Sumar un artículo = una entrada nueva.
// Clave: `${idioma}:${slug}` del artículo en Supabase. Valor: slugs de las guías en
// src/lib/destinos/guias/ (el idioma de la página decide si va a /destinos o a /en/guides).

export const ARTICLE_FUNNELS: Record<string, string[]> = {
  "es:estrecho-de-magallanes-historia-y-relevancia": ["punta-arenas", "puerto-natales"],
  "en:strait-of-magellan-history-significance": ["punta-arenas", "puerto-natales"],
}

export function getArticleFunnel(language: string, slug: string): string[] | null {
  return ARTICLE_FUNNELS[`${language}:${slug}`] ?? null
}
