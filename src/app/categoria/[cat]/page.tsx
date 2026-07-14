import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createClient as createBuildClient } from "@supabase/supabase-js";
import { ArticleCard } from "@/components/ArticleCard";
import { toCategorySlug } from "@/lib/category";

async function resolveCategoryName(slug: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("category")
    .eq("language", "es")
    .eq("status", "published")
    .not("category", "is", null);

  const cats = [...new Set((data ?? []).map((r) => r.category as string))];
  return cats.find((c) => toCategorySlug(c) === slug) ?? null;
}

async function getArticlesByCategory(categoryName: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language"
    )
    .eq("language", "es")
    .eq("status", "published")
    .eq("category", categoryName)
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
  return cats
    .map((cat) => toCategorySlug(cat))
    .filter((cat) => cat !== "gastronomia")
    .map((cat) => ({ cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const categoryName = await resolveCategoryName(cat);
  const label = categoryName ?? cat.replace(/-/g, " ");
  return {
    title: `${label} — Outdoor Patagonia`,
    description: `Artículos sobre ${label.toLowerCase()} en Outdoor Patagonia.`,
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
  if (cat === "gastronomia") notFound(); // real 301 handled in proxy.ts

  const categoryName = await resolveCategoryName(cat);
  if (!categoryName) notFound();

  const articles = await getArticlesByCategory(categoryName);
  if (articles.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Categoría
      </p>
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {categoryName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
