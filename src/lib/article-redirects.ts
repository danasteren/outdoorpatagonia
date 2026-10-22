import { LEGACY_TO_GUIDE } from "@/lib/destinos/redirects";

// Artículos de `articles` absorbidos por una ficha de catálogo: 301 en
// proxy.ts. Los artículos absorbidos por una guía están en LEGACY_TO_GUIDE.
export const ARTICLE_TO_CATALOG: Record<string, string> = {
  "/flora/frutos-rojos-patagonia": "/flora/calafate",
};

// Destino del 301 de un artículo (ruta sin barra final), o undefined si no
// redirige. El sitemap y los listados lo usan para no enlazar URLs que redirigen.
export function articleRedirect(path: string): string | undefined {
  return LEGACY_TO_GUIDE[path] ?? ARTICLE_TO_CATALOG[path];
}
