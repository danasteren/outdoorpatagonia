import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { DarkModeToggle } from "./DarkModeToggle";
import { LangToggle } from "./LangToggle";
import { toCategorySlug } from "@/lib/category";

async function getCategories(lang: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("articles")
    .select("category")
    .eq("language", lang)
    .eq("status", "published")
    .not("category", "is", null);

  return [
    ...new Set((data ?? []).map((a) => a.category as string)),
  ].sort();
}

function categoryHref(category: string, lang: string) {
  const slug = category.toLowerCase().replace(/ /g, "-");
  return lang === "en" ? `/en/category/${slug}` : `/categoria/${slug}`;
}

export async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "es";

  const categories = await getCategories(lang);

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
          <LangToggle />
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
