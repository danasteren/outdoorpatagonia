import type { Metadata } from "next";

// alternates de la metadata de todas las páginas que tienen par en el otro
// idioma. Con par, el hreflang lista las dos versiones (cada página se
// incluye a sí misma, como pide Google) y x-default va a la versión en
// español. Sin par, solo canonical. El selector ES | EN del header lee este
// mismo hreflang (src/lib/lang-alternate.ts), así que no hay otro mapa.

export const SITE = "https://outdoorpatagonia.com";

export type Lang = "es" | "en";

export function langOfPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

function toPath(pathOrUrl: string): string {
  const path = pathOrUrl.startsWith(SITE) ? pathOrUrl.slice(SITE.length) : pathOrUrl;
  return path === "" ? "/" : path;
}

function toUrl(path: string): string {
  return path === "/" ? SITE : SITE + path;
}

/** `path` es la página actual y `pair`, su versión en el otro idioma (paths o URLs absolutas). */
export function pageAlternates(
  path: string,
  pair?: string | null,
): NonNullable<Metadata["alternates"]> {
  const self = toPath(path);
  const canonical = toUrl(self);
  if (!pair) return { canonical };

  const other = toPath(pair);
  const es = langOfPath(self) === "es" ? self : other;
  const en = langOfPath(self) === "en" ? self : other;
  return {
    canonical,
    languages: { es: toUrl(es), en: toUrl(en), "x-default": toUrl(es) },
  };
}
