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
