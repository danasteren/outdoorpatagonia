import { LEGACY_IMAGES } from "@/data/legacy-images";
import { COVER_FALLBACKS, type CoverFallback } from "@/data/cover-fallbacks";

// Las fotos de los artículos migrados de WordPress vivían en
// outdoorpatagonia.dreamhosters.com, un hosting que ya no existe. Las que se
// pudieron recuperar están en Supabase Storage (bucket público "wp-uploads"),
// una por imagen original — sin las variantes de tamaño que generaba WordPress.
// La base de datos sigue guardando las URLs viejas; acá se traducen al
// renderizar. Las que no tienen copia se ocultan en vez de mostrar el ícono roto.

const DEAD_PREFIX = /^https?:\/\/outdoorpatagonia\.dreamhosters\.com\/wp-content\/uploads\//;
const DEAD_URL = /https?:\/\/outdoorpatagonia\.dreamhosters\.com\/wp-content\/uploads\/[^"'\s)<>,]+/g;
const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wp-uploads/`;

// "2024/09/foto-300x200.jpg" y "2024/09/foto-scaled.jpg" → "2024/09/foto.jpg"
function originalPath(path: string): string {
  return path.replace(/-\d+x\d+(\.\w+)$/, "$1").replace(/-scaled(\.\w+)$/, "$1");
}

function isLegacy(url: string): boolean {
  return DEAD_PREFIX.test(url);
}

function recover(url: string): string | null {
  const path = originalPath(url.replace(DEAD_PREFIX, "").split("?")[0]);
  return LEGACY_IMAGES.has(path) ? STORAGE_BASE + path : null;
}

/** URL de imagen lista para usar: traduce las del hosting viejo, o `null` si esa foto se perdió. */
export function legacyImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return isLegacy(url) ? recover(url) : url;
}

function legacyImgUrls(html: string): string[] {
  return (html.match(/<img\b[^>]*>/g) ?? []).flatMap((tag) => {
    const src = tag.match(/\b(?:data-src|src)="(https?:\/\/outdoorpatagonia\.dreamhosters\.com[^"]+)"/);
    return src ? [src[1]] : [];
  });
}

// Un bloque (figura con epígrafe, ítem de galería) se quita entero cuando
// todas sus fotos se perdieron, para no dejar epígrafes o celdas huérfanas.
function dropIfAllLost(block: string): string {
  const urls = legacyImgUrls(block);
  return urls.length > 0 && urls.every((u) => !recover(u)) ? "" : block;
}

/** Reescribe las imágenes del hosting viejo dentro del HTML de un artículo. */
export function fixLegacyImages(html: string): string {
  if (!html.includes("outdoorpatagonia.dreamhosters.com")) return html;

  return html
    .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/g, dropIfAllLost)
    .replace(/<div class="w-gallery-item">[\s\S]*?<\/div>[\s\S]*?<\/div>/g, dropIfAllLost)
    .replace(/<img\b[^>]*>/g, (tag) => {
      const [url] = legacyImgUrls(tag);
      if (!url) return tag;
      const recovered = recover(url);
      if (!recovered) return "";
      return tag
        .replace(/\s(?:data-)?(?:srcset|sizes)="[^"]*"/g, "")
        .replace(DEAD_URL, recovered);
    })
    .replace(/\shref="(https?:\/\/outdoorpatagonia\.dreamhosters\.com[^"]+)"/g, (_, url: string) => {
      const recovered = recover(url);
      return recovered ? ` href="${recovered}"` : "";
    })
    .replace(DEAD_URL, (url) => recover(url) ?? url);
}

export type ArticleCover = { url: string; credit: CoverFallback | null };

/** Portada de un artículo: la propia si existe; si se perdió, la de reemplazo de Wikimedia Commons. */
export function articleCover(article: { slug: string; cover_image_url: string | null }): ArticleCover | null {
  const own = legacyImageUrl(article.cover_image_url);
  if (own) return { url: own, credit: null };
  const fallback = COVER_FALLBACKS[article.slug];
  return fallback ? { url: STORAGE_BASE + fallback.path, credit: fallback } : null;
}
