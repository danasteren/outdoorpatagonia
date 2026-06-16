import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createClient as createBuildClient } from "@supabase/supabase-js";
import { ArticleLayout } from "@/components/ArticleLayout";
import { toCategorySlug } from "@/lib/category";

export async function generateStaticParams() {
  const supabase = createBuildClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("articles")
    .select("slug, category")
    .eq("language", "es")
    .eq("status", "published");
  return (data ?? []).map((a) => ({
    category: toCategorySlug(a.category ?? "articulos"),
    slug: a.slug,
  }));
}

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

async function getAltLang(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug, category")
    .eq("slug", slug)
    .eq("language", "en")
    .eq("status", "published")
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const catSlug = toCategorySlug(article.category ?? "");
  const canonicalUrl = `https://outdoorpatagonia.com/${catSlug}/${slug}`;
  const altLang = await getAltLang(slug);

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || undefined,
    alternates: {
      canonical: canonicalUrl,
      ...(altLang && {
        languages: {
          en: `https://outdoorpatagonia.com/en/${toCategorySlug(altLang.category ?? "")}/${slug}`,
        },
      }),
    },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || undefined,
      url: canonicalUrl,
      images: article.cover_image_url ? [article.cover_image_url] : [],
      locale: "es_AR",
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const [article, altLang] = await Promise.all([
    getArticle(slug),
    getAltLang(slug),
  ]);

  if (!article) notFound();

  const correctCategory = toCategorySlug(article.category ?? "");
  if (category !== correctCategory) {
    redirect(`/${correctCategory}/${slug}`);
  }

  const altLangHref = altLang
    ? `/en/${toCategorySlug(altLang.category ?? "")}/${slug}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? undefined,
    image: article.cover_image_url ?? undefined,
    datePublished: article.published_at ?? undefined,
    inLanguage: "es",
    author: { "@type": "Organization", name: "Outdoor Patagonia" },
    publisher: {
      "@type": "Organization",
      name: "Outdoor Patagonia",
      url: "https://outdoorpatagonia.com",
    },
    url: `https://outdoorpatagonia.com/${correctCategory}/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout article={article} altLangHref={altLangHref} />
    </>
  );
}
