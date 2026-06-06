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
    .eq("language", "es")
    .eq("status", "published")
    .single();
  return data;
}

async function hasAltLang(slug: string, lang: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug")
    .eq("slug", slug)
    .eq("language", lang)
    .eq("status", "published")
    .maybeSingle();
  return !!data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const enExists = await hasAltLang(slug, "en");

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || undefined,
    alternates: {
      canonical: `https://outdoorpatagonia.com/${slug}`,
      ...(enExists && {
        languages: { en: `https://outdoorpatagonia.com/en/${slug}` },
      }),
    },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || undefined,
      url: `https://outdoorpatagonia.com/${slug}`,
      images: article.cover_image_url ? [article.cover_image_url] : [],
      locale: "es_AR",
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
  const [article, enExists] = await Promise.all([
    getArticle(slug),
    hasAltLang(slug, "en"),
  ]);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      altLangHref={enExists ? `/en/${slug}` : null}
    />
  );
}
