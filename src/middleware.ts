import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Current valid first-path-segments — must NOT be treated as old WP categories
const PROTECTED_ES = new Set([
  "categoria",
  "contacto",
  "novedades",
  "privacidad",
  "terminos",
  "mapa",
  "proyecto-patagonia",
  "recursos-viaje-patagonia",
  "en",
]);

const PROTECTED_EN = new Set([
  "category",
  "contact",
  "patagonia-project",
  "resources-traveling-patagonia",
  "privacy",
  "terms",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // Spanish: /oldCategory/slug[/] → /slug
  if (segments.length === 2 && !PROTECTED_ES.has(segments[0])) {
    const url = request.nextUrl.clone();
    url.pathname = `/${segments[1]}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // English: /en/oldCategory/slug[/] → /en/slug
  if (
    segments.length === 3 &&
    segments[0] === "en" &&
    !PROTECTED_EN.has(segments[1])
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/${segments[2]}`;
    return NextResponse.redirect(url, { status: 301 });
  }
}

export const config = {
  matcher: ["/:a/:b", "/en/:a/:b"],
};
