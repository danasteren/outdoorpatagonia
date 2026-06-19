import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { toCategorySlug } from "@/lib/category";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

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
