import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// WordPress lazy-load uses data-src/data-lazy-src with a data:image/svg+xml placeholder.
// Since this runs server-side there's no JS to swap them, so we do it at render time.
export function fixWpLazyLoad(html: string): string {
  return html
    .replace(/\bsrc="data:image\/svg\+xml[^"]*"\s*/g, "")
    .replace(/\bdata-lazy-src=/g, "src=")
    .replace(/\bdata-src=/g, "src=");
}

// Migrated WordPress content credits some photos to their Instagram author only in the
// (invisible) alt text — e.g. `alt="... photographed by Name (@handle)"` or
// `alt="... Image taken from Instagram (@handle)"` — with no visible caption or backlink.
// This surfaces that credit as a real, clickable link right under the image.
export function addInstagramPhotoCredits(html: string, isEnglish: boolean): string {
  const namedCredit = /(?:photographed by|fotografiada? por)\s+([^(<]+?)\s*\(@([a-zA-Z0-9_.]+)\)/i;
  const unnamedCredit = /(?:Image taken from Instagram|Imagen tomada de Instagram)\s*\(@([a-zA-Z0-9_.]+)\)/i;
  const label = isEnglish ? "Photo" : "Foto";

  return html.replace(/<img\b[^>]*>/g, (imgTag) => {
    const altMatch = imgTag.match(/\balt="([^"]*)"/);
    const alt = altMatch?.[1];
    if (!alt) return imgTag;

    let name: string | null = null;
    let handle: string | null = null;

    const named = alt.match(namedCredit);
    if (named) {
      name = named[1].trim();
      handle = named[2];
    } else {
      const unnamed = alt.match(unnamedCredit);
      if (unnamed) handle = unnamed[1];
    }

    if (!handle) return imgTag;

    const credit = name ? `${name} (@${handle})` : `@${handle}`;
    const caption = `<figcaption>${label}: <a href="https://www.instagram.com/${handle}/" target="_blank" rel="noopener noreferrer nofollow">${credit}</a></figcaption>`;
    return imgTag + caption;
  });
}
