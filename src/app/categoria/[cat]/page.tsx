import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createClient as createBuildClient } from "@supabase/supabase-js";
import { ArticleCard } from "@/components/ArticleCard";

async function getArticlesByCategory(cat: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language"
    )
    .eq("language", "es")
    .eq("status", "published")
    .ilike("category", cat.replace(/-/g, " "))
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function generateStaticParams() {
  const supabase = createBuildClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("articles")
    .select("category")
    .eq("language", "es")
    .eq("status", "published")
    .not("category", "is", null);

  const cats = [...new Set((data ?? []).map((r) => r.category as string))];
  return cats.map((cat) => ({ cat: cat.toLowerCase().replace(/ /g, "-") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const label = cat.replace(/-/g, " ");
  const title = label.charAt(0).toUpperCase() + label.slice(1);
  return {
    title: `${title} — Outdoor Patagonia`,
    description: `Artículos sobre ${label} en Outdoor Patagonia.`,
    alternates: {
      canonical: `https://outdoorpatagonia.com/categoria/${cat}`,
      languages: { en: `https://outdoorpatagonia.com/en/category/${cat}` },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const articles = await getArticlesByCategory(cat);

  if (articles.length === 0) notFound();

  const label = cat.replace(/-/g, " ");
  const title = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Categoría
      </p>
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
