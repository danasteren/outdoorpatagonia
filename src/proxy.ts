import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { toCategorySlug } from "@/lib/category";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // /categoria/gastronomia moved to its own dedicated section at /gastronomia
  if (pathname.replace(/\/+$/, "") === "/categoria/gastronomia") {
    return NextResponse.redirect(new URL("/gastronomia", request.url), 301);
  }

  // Orphan backlinked URL with no matching flora catalog entry or iNaturalist
  // match — real HTTP 301 to the actual entry, since redirect() from inside
  // the [especie] page component only produces a 200 + meta-refresh, not a
  // true redirect, in this Next.js version.
  if (pathname.replace(/\/+$/, "") === "/flora/frutos-rojos-patagonia") {
    return NextResponse.redirect(new URL("/flora/calafate", request.url), 301);
  }

  // Redirect old flat-slug article URLs: /{slug} or /en/{slug}
  const isEsFlat = segments.length === 1;
  const isEnFlat = segments.length === 2 && segments[0] === "en";

  if (isEsFlat || isEnFlat) {
    const articleSlug = isEnFlat ? segments[1] : segments[0];
    const lang = isEnFlat ? "en" : "es";

    const lookup = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );
    const { data } = await lookup
      .from("articles")
      .select("category")
      .eq("slug", articleSlug)
      .eq("language", lang)
      .eq("status", "published")
      .maybeSingle();

    if (data) {
      const catSlug = toCategorySlug(data.category ?? "");
      if (catSlug === "recursos-descargables") {
        return NextResponse.redirect(new URL("/", request.url), 301);
      }
      const target = lang === "en"
        ? `/en/${catSlug}/${articleSlug}`
        : `/${catSlug}/${articleSlug}`;
      return NextResponse.redirect(new URL(target, request.url), 301);
    }
  }

  // Redirect stale WordPress article URLs — wrong/old category prefix
  // (/lugares-patagonia/chalten-...) or deeper dead page hierarchy
  // (/proyecto-patagonia/espacios/domo/preparacion-terreno-domo) — both are
  // leftover links baked into migrated article content. The real article
  // slug is always the last segment; a mismatch against its current
  // category means everything before it is stale. This must run as a real
  // HTTP redirect here rather than in the page component: `redirect()` /
  // `permanentRedirect()` called from a Server Component only inserts a
  // client-side meta-refresh tag (200 OK) in this Next.js version, not an
  // actual 301 — see next/dist/client/components/redirect.d.ts.
  const RESERVED_FIRST_SEGMENTS = new Set(["api", "admin", "auth"]);
  if (segments.length >= 2 && !RESERVED_FIRST_SEGMENTS.has(segments[0])) {
    const isEnDeep = segments[0] === "en";
    const lang = isEnDeep ? "en" : "es";
    const articleSlug = segments[segments.length - 1];

    const lookup = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );
    const { data } = await lookup
      .from("articles")
      .select("category")
      .eq("slug", articleSlug)
      .eq("language", lang)
      .eq("status", "published")
      .maybeSingle();

    if (data) {
      const catSlug = toCategorySlug(data.category ?? "");
      const target =
        catSlug === "recursos-descargables"
          ? "/"
          : isEnDeep
            ? `/en/${catSlug}/${articleSlug}`
            : `/${catSlug}/${articleSlug}`;
      if (pathname.replace(/\/+$/, "") !== target) {
        return NextResponse.redirect(new URL(target, request.url), 301);
      }
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  let supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request: { headers: requestHeaders },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
