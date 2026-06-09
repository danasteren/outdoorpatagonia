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
