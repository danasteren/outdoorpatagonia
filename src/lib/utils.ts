import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// WordPress lazy-load uses data-src/data-lazy-src with a data:image/svg+xml placeholder.
// Since this runs server-side there's no JS to swap them, so we do it at render time.
export function fixWpLazyLoad(html: string): string {
  return youtubeFacades(html)
    .replace(/\bsrc="data:image\/svg\+xml[^"]*"\s*/g, "")
    .replace(/\bdata-lazy-src=/g, "src=")
    .replace(/\bdata-src=/g, "src=");
}

// Los iframes de YouTube del WordPress (class="lazyload", sin el script que los
// difería) cargaban ~1 MB apenas se abría el artículo. Se reemplazan por una
// fachada: la miniatura del video, que es un link a YouTube. Al hacer clic,
// `YouTubeFacades` (montado en el layout) la cambia por el reproductor. Estilos
// inline: la fachada queda dentro del `.wp-block-embed__wrapper` 16:9 y el
// `!important` gana a las reglas de `img` de `.article-body`.
const YOUTUBE_IFRAME = /<iframe\b[^>]*\bsrc="https:\/\/www\.youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})([^"]*)"[^>]*>\s*<\/iframe>/g;

const YOUTUBE_PLAY_ICON =
  '<svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">' +
  '<path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.3.3 34 .3 34 .3s-21.3 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00"/>' +
  '<path d="M45 24 27 14v20z" fill="#fff"/></svg>';

function youtubeFacades(html: string): string {
  return html.replace(YOUTUBE_IFRAME, (iframe, id: string, query: string) => {
    const title = iframe.match(/\btitle="([^"]*)"/)?.[1] || "YouTube";
    const start = query.match(/[?&]start=(\d+)/)?.[1];
    const href = `https://www.youtube.com/watch?v=${id}${start ? `&amp;t=${start}s` : ""}`;
    return (
      `<a href="${href}" class="yt-facade" data-yt-id="${id}"${start ? ` data-yt-start="${start}"` : ""} data-yt-title="${title}" target="_blank" rel="noopener noreferrer" ` +
      `style="position:relative;display:block;width:100%;aspect-ratio:16/9;overflow:hidden;background:#000;border-radius:0.375rem">` +
      `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${title}" loading="lazy" decoding="async" width="480" height="360" ` +
      `style="width:100% !important;height:100% !important;margin:0 !important;object-fit:cover;border-radius:0">` +
      YOUTUBE_PLAY_ICON +
      `</a>`
    );
  });
}

// Migrated WordPress content credits some photos to their Instagram author only in the
// (invisible) alt text — e.g. `alt="... photographed by Name (@handle)"`,
// `alt="... Image taken from Instagram (@handle)"` or `alt="... Foto: @handle — Instagram"`
// — with no visible caption or backlink. This extracts that credit so it can be
// rendered as a real, clickable link.
export function extractPhotoCredit(alt: string): { name: string | null; handle: string } | null {
  const namedCredit = /(?:photographed by|fotografiada? por)\s+([^(<]+?)\s*\(@([a-zA-Z0-9_.]+)\)/i;
  const parenthesesCredit = /(?:Image taken from Instagram|Imagen tomada de Instagram)\s*\(@([a-zA-Z0-9_.]+)\)/i;
  const inlineCredit = /Foto:\s*@([a-zA-Z0-9_.]+)\s*(?:—|-)?\s*Instagram/i;

  const named = alt.match(namedCredit);
  if (named) return { name: named[1].trim(), handle: named[2] };

  const parentheses = alt.match(parenthesesCredit);
  if (parentheses) return { name: null, handle: parentheses[1] };

  const inline = alt.match(inlineCredit);
  if (inline) return { name: null, handle: inline[1] };

  return null;
}

export function photoCreditCaption(
  credit: { name: string | null; handle: string },
  isEnglish: boolean,
): string {
  const label = isEnglish ? "Photo" : "Foto";
  const text = credit.name ? `${credit.name} (@${credit.handle})` : `@${credit.handle}`;
  return `<figcaption>${label}: <a href="https://www.instagram.com/${credit.handle}/" target="_blank" rel="noopener noreferrer nofollow">${text}</a></figcaption>`;
}

export function addInstagramPhotoCredits(html: string, isEnglish: boolean): string {
  return html.replace(/<img\b[^>]*>/g, (imgTag) => {
    const altMatch = imgTag.match(/\balt="([^"]*)"/);
    const alt = altMatch?.[1];
    if (!alt) return imgTag;

    const credit = extractPhotoCredit(alt);
    if (!credit) return imgTag;

    return imgTag + photoCreditCaption(credit, isEnglish);
  });
}
