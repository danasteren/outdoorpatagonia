import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleLayout } from "@/components/ArticleLayout";

async function getArticle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, content, category, tags, reading_time_min, published_at, cover_image_url, language, slug, seo_title, seo_description"
    )
    .eq("slug", slug)
    .eq("language", "en")
    .eq("status", "published")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || undefined,
    alternates: {
      canonical: `https://outdoorpatagonia.com/en/${slug}`,
      languages: { es: `https://outdoorpatagonia.com/${slug}` },
    },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || undefined,
      url: `https://outdoorpatagonia.com/en/${slug}`,
      images: article.cover_image_url ? [article.cover_image_url] : [],
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return <ArticleLayout article={article} />;
}
