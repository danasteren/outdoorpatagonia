// Pares ES ↔ EN de la tabla `articles` cuyo slug cambia según el idioma. Los
// que comparten slug se emparejan solos (getAltLang busca el mismo slug en el
// otro idioma); estos necesitan el par explícito para el hreflang y el link de
// cambio de idioma.
const PAIRS: { es: string; en: string }[] = [
  { es: "lupinos", en: "lupins-in-patagonia" },
  { es: "tulipanes-trevelin", en: "trevelin-tulip-fields" },
];

/** Slug del mismo artículo en el otro idioma (el mismo slug si no hay par cargado). */
export function altLangSlug(slug: string, to: "es" | "en"): string {
  const pair = PAIRS.find((p) => (to === "en" ? p.es : p.en) === slug);
  return pair ? pair[to] : slug;
}
