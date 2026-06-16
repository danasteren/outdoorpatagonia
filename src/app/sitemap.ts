import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { toCategorySlug } from "@/lib/category";

const BASE = "https://outdoorpatagonia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, language, category, published_at")
    .eq("status", "published");

  const rows = articles ?? [];

  const articleUrls: MetadataRoute.Sitemap = rows.map((a) => {
    const cat = toCategorySlug(a.category ?? "");
    return {
      url:
        a.language === "en"
          ? `${BASE}/en/${cat}/${a.slug}`
          : `${BASE}/${cat}/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const esCategories = [
    ...new Set(
      rows
        .filter((a) => a.language === "es" && a.category)
        .map((a) => toCategorySlug(a.category as string))
    ),
  ];
  const enCategories = [
    ...new Set(
      rows
        .filter((a) => a.language === "en" && a.category)
        .map((a) => toCategorySlug(a.category as string))
    ),
  ];

  const categoryUrls: MetadataRoute.Sitemap = [
    ...esCategories.map((cat) => ({
      url: `${BASE}/categoria/${cat}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...enCategories.map((cat) => ({
      url: `${BASE}/en/category/${cat}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/en`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/mapa`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/planear`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/novedades`, changeFrequency: "weekly", priority: 0.5 },
    ...categoryUrls,
    ...articleUrls,
  ];
}
