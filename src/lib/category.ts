export function toCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Categorías de `articles` (ES) que tienen sección propia: sus artículos se
// listan debajo del catálogo de la sección y /categoria/{slug} redirige ahí
// con 301 (proxy.ts). Solo entran slugs que coinciden exacto con la ruta de
// la sección. Lo leen proxy.ts, ArticleLayout y el sitemap.
export const CATEGORY_SECTIONS: Record<string, string> = {
  fauna: "/fauna",
  flora: "/flora",
  gastronomia: "/gastronomia",
};

export function categorySection(slug: string): string | undefined {
  return Object.hasOwn(CATEGORY_SECTIONS, slug) ? CATEGORY_SECTIONS[slug] : undefined;
}

export function categoryHref(category: string, language: string): string {
  const slug = toCategorySlug(category);
  if (language === "en") return `/en/category/${slug}`;
  return categorySection(slug) ?? `/categoria/${slug}`;
}

// Slug de cada categoría de `articles` en ES y en EN: en WordPress los nombres
// se tradujeron, así que no se pueden emparejar por slug. Lo usan el hreflang
// de las páginas de categoría y de las secciones de CATEGORY_SECTIONS.
// Recursos descargables queda afuera: en español redirige a la home.
const CATEGORY_PAIRS: { es: string; en: string }[] = [
  { es: "consejos", en: "tips" },
  { es: "cultura", en: "culture" },
  { es: "domo", en: "dome" },
  { es: "fauna", en: "fauna" },
  { es: "flora", en: "flora" },
  { es: "gastronomia", en: "gastronomy" },
  { es: "historia", en: "history" },
  { es: "hongo", en: "fungi" },
  { es: "impacto-ambiental", en: "environmental-impact" },
  { es: "lugares", en: "destinations" },
  { es: "paisajes", en: "landscapes" },
];

/** Ruta de la categoría `slug` en el otro idioma (`to`), o null si no tiene par. */
export function categoryAltPath(slug: string, to: "es" | "en"): string | null {
  const pair = CATEGORY_PAIRS.find((p) => (to === "en" ? p.es : p.en) === slug);
  if (!pair) return null;
  return to === "en" ? `/en/category/${pair.en}` : categorySection(pair.es) ?? `/categoria/${pair.es}`;
}
