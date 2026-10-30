import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createClient as createBuildClient } from "@supabase/supabase-js";
import { BookOpen } from "lucide-react";
import { ArticleTile } from "@/components/ArticleTile";
import { PageHero } from "@/components/PageHero";
import { categoryAltPath, toCategorySlug } from "@/lib/category";
import { pageAlternates } from "@/lib/hreflang";
import { articleRedirect } from "@/lib/article-redirects";

async function resolveCategoryName(slug: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("category")
    .eq("language", "en")
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
    .eq("language", "en")
    .eq("status", "published")
    .eq("category", categoryName)
    .order("published_at", { ascending: false });
  // Sin los artículos absorbidos por una guía o una ficha (301 en proxy.ts)
  return (data ?? []).filter(
    (a) => !articleRedirect(`/en/${toCategorySlug(categoryName)}/${a.slug}`)
  );
}

export async function generateStaticParams() {
  const supabase = createBuildClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("articles")
    .select("category")
    .eq("language", "en")
    .eq("status", "published")
    .not("category", "is", null);

  const cats = [...new Set((data ?? []).map((r) => r.category as string))];
  return cats.map((cat) => ({ cat: toCategorySlug(cat) }));
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
    title: `${label}`,
    description: `Articles about ${label.toLowerCase()} on Outdoor Patagonia.`,
    alternates: pageAlternates(`/en/category/${cat}`, categoryAltPath(cat, "es")),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const categoryName = await resolveCategoryName(cat);
  if (!categoryName) notFound();

  const articles = await getArticlesByCategory(categoryName);
  if (articles.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    url: `https://outdoorpatagonia.com/en/category/${cat}`,
    inLanguage: "en",
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        icon={BookOpen}
        eyebrow="Category"
        title={categoryName}
        description={`${articles.length} Outdoor Patagonia ${articles.length === 1 ? "article" : "articles"} about ${categoryName.toLowerCase()}.`}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleTile key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
