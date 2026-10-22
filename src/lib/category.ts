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
