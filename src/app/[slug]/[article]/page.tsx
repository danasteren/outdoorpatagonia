import { notFound, permanentRedirect } from "next/navigation";
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
  return (data ?? [])
    .filter((a) => {
      const cat = toCategorySlug(a.category ?? "");
      return cat !== "fauna" && cat !== "recursos-descargables";
    })
    .map((a) => ({
      slug: toCategorySlug(a.category ?? "articulos"),
      article: a.slug,
    }));
}

async function getArticle(article: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, content, category, tags, reading_time_min, published_at, cover_image_url, language, slug, seo_title, seo_description"
    )
    .eq("slug", article)
    .eq("language", "es")
    .eq("status", "published")
    .single();
  return data;
}

async function getAltLang(article: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug, category")
    .eq("slug", article)
    .eq("language", "en")
    .eq("status", "published")
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}): Promise<Metadata> {
  const { article } = await params;
  const articleData = await getArticle(article);
  if (!articleData) return {};

  const catSlug = toCategorySlug(articleData.category ?? "");
  const canonicalUrl = `https://outdoorpatagonia.com/${catSlug}/${article}`;
  const altLang = await getAltLang(article);

  return {
    title: articleData.seo_title || articleData.title,
    description: articleData.seo_description || articleData.excerpt || undefined,
    alternates: {
      canonical: canonicalUrl,
      ...(altLang && {
        languages: {
          en: `https://outdoorpatagonia.com/en/${toCategorySlug(altLang.category ?? "")}/${article}`,
        },
      }),
    },
    openGraph: {
      title: articleData.seo_title || articleData.title,
      description: articleData.seo_description || articleData.excerpt || undefined,
      url: canonicalUrl,
      images: articleData.cover_image_url ? [articleData.cover_image_url] : [],
      locale: "es_AR",
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}) {
  const { slug, article } = await params;
  const [articleData, altLang] = await Promise.all([
    getArticle(article),
    getAltLang(article),
  ]);

  if (!articleData) notFound();

  const correctCategory = toCategorySlug(articleData.category ?? "");
  if (correctCategory === "recursos-descargables") permanentRedirect("/");
  if (slug !== correctCategory) {
    permanentRedirect(`/${correctCategory}/${article}`);
  }

  const altLangHref = altLang
    ? `/en/${toCategorySlug(altLang.category ?? "")}/${article}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleData.title,
    description: articleData.excerpt ?? undefined,
    image: articleData.cover_image_url ?? undefined,
    datePublished: articleData.published_at ?? undefined,
    inLanguage: "es",
    author: { "@type": "Organization", name: "Outdoor Patagonia" },
    publisher: {
      "@type": "Organization",
      name: "Outdoor Patagonia",
      url: "https://outdoorpatagonia.com",
    },
    url: `https://outdoorpatagonia.com/${correctCategory}/${article}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout article={articleData} altLangHref={altLangHref} />
    </>
  );
}
