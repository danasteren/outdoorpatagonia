import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { toCategorySlug } from "@/lib/category";
import { HeaderShell, type AuthUser } from "./HeaderShell";

function makeSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getCategories(lang: string) {
  const { data } = await makeSupabase()
    .from("articles")
    .select("category")
    .eq("language", lang)
    .eq("status", "published")
    .not("category", "is", null);

  const EXCLUDE = new Set(["fauna"])
  return [...new Set((data ?? []).map((a) => a.category as string))]
    .filter((c) => !EXCLUDE.has(c.toLowerCase()))
    .sort()
}

async function getLangHrefs(pathname: string): Promise<{
  esHref: string | null;
  enHref: string | null;
  currentLang: "es" | "en";
}> {
  const isEN = pathname.startsWith("/en");

  if (pathname === "/" || pathname === "") {
    return { esHref: "/", enHref: "/en", currentLang: "es" };
  }
  if (pathname === "/en" || pathname === "/en/") {
    return { esHref: "/", enHref: "/en", currentLang: "en" };
  }

  const catEsMatch = pathname.match(/^\/categoria\/(.+)$/);
  if (catEsMatch) {
    return { esHref: pathname, enHref: `/en/category/${catEsMatch[1]}`, currentLang: "es" };
  }

  const catEnMatch = pathname.match(/^\/en\/category\/(.+)$/);
  if (catEnMatch) {
    return { esHref: `/categoria/${catEnMatch[1]}`, enHref: pathname, currentLang: "en" };
  }

  if (!isEN) {
    const artEsMatch = pathname.match(/^\/([^/]+)\/?$/);
    if (artEsMatch) {
      const slug = artEsMatch[1];
      const { data } = await makeSupabase()
        .from("articles")
        .select("slug")
        .eq("slug", slug)
        .eq("language", "en")
        .eq("status", "published")
        .maybeSingle();
      return { esHref: pathname, enHref: data ? `/en/${slug}` : null, currentLang: "es" };
    }
  }

  const artEnMatch = pathname.match(/^\/en\/([^/]+)\/?$/);
  if (artEnMatch) {
    const slug = artEnMatch[1];
    const { data } = await makeSupabase()
      .from("articles")
      .select("slug")
      .eq("slug", slug)
      .eq("language", "es")
      .eq("status", "published")
      .maybeSingle();
    return { esHref: data ? `/${slug}` : null, enHref: pathname, currentLang: "en" };
  }

  return { esHref: "/", enHref: "/en", currentLang: isEN ? "en" : "es" };
}

export async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "es";

  const supabase = await createServerClient();
  const { data: { user: rawUser } } = await supabase.auth.getUser();

  const authUser: AuthUser = rawUser ? {
    name: (rawUser.user_metadata?.full_name as string | undefined) ?? rawUser.email ?? 'Usuario',
    email: rawUser.email ?? '',
    avatarUrl: (rawUser.user_metadata?.avatar_url as string | undefined) ?? null,
  } : null;

  const [rawCategories, langHrefs] = await Promise.all([
    getCategories(lang),
    getLangHrefs(pathname),
  ]);

  const categories = rawCategories.map((cat) => ({
    label: cat,
    href: lang === "en"
      ? `/en/category/${toCategorySlug(cat)}`
      : `/categoria/${toCategorySlug(cat)}`,
  }));

  return <HeaderShell categories={categories} langHrefs={langHrefs} lang={lang} user={authUser} />;
}
