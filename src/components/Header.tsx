import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { DarkModeToggle } from "./DarkModeToggle";
import { LangToggle } from "./LangToggle";
import { toCategorySlug } from "@/lib/category";

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

  return [
    ...new Set((data ?? []).map((a) => a.category as string)),
  ].sort();
}

async function getLangHrefs(pathname: string): Promise<{
  esHref: string | null;
  enHref: string | null;
  currentLang: "es" | "en";
}> {
  const isEN = pathname.startsWith("/en");

  // Home
  if (pathname === "/" || pathname === "") {
    return { esHref: "/", enHref: "/en", currentLang: "es" };
  }
  if (pathname === "/en" || pathname === "/en/") {
    return { esHref: "/", enHref: "/en", currentLang: "en" };
  }

  // Category ES: /categoria/[cat] → EN: /en/category/[cat]
  const catEsMatch = pathname.match(/^\/categoria\/(.+)$/);
  if (catEsMatch) {
    return { esHref: pathname, enHref: `/en/category/${catEsMatch[1]}`, currentLang: "es" };
  }

  // Category EN: /en/category/[cat] → ES: /categoria/[cat]
  const catEnMatch = pathname.match(/^\/en\/category\/(.+)$/);
  if (catEnMatch) {
    return { esHref: `/categoria/${catEnMatch[1]}`, enHref: pathname, currentLang: "en" };
  }

  // Article ES: /[slug] — check if EN translation (same slug) exists
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

  // Article EN: /en/[slug] — check if ES translation (same slug) exists
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

  // Fallback
  return { esHref: "/", enHref: "/en", currentLang: isEN ? "en" : "es" };
}

function categoryHref(category: string, lang: string) {
  const slug = toCategorySlug(category);
  return lang === "en" ? `/en/category/${slug}` : `/categoria/${slug}`;
}

export async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "es";

  const [categories, langHrefs] = await Promise.all([
    getCategories(lang),
    getLangHrefs(pathname),
  ]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Main row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={lang === "en" ? "/en" : "/"} className="flex items-center shrink-0">
          <img
            src="/brand/op_02.svg"
            alt="Outdoor Patagonia"
            className="h-9 w-auto dark:brightness-0 dark:invert"
          />
        </Link>
        <div className="flex items-center gap-4">
          <LangToggle {...langHrefs} />
          <DarkModeToggle />
        </div>
      </div>

      {/* Category nav */}
      {categories.length > 0 && (
        <div className="border-t border-border overflow-x-auto scrollbar-none">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-6 py-2.5 w-max min-w-full">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={categoryHref(cat, lang)}
                className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
