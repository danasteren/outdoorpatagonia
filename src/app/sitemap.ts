import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { toCategorySlug } from "@/lib/category";
import { FAUNA_CATALOG } from "@/lib/fauna/catalog";
import { PARQUES_CATALOG } from "@/lib/parques/catalog";
import { SENDEROS_CATALOG } from "@/lib/senderos/catalog";
import { VOLCANES_CATALOG } from "@/lib/volcanes/catalog";

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

  const faunaUrls: MetadataRoute.Sitemap = FAUNA_CATALOG.map((e) => ({
    url: `${BASE}/fauna/${e.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const parquesUrls: MetadataRoute.Sitemap = PARQUES_CATALOG.map((p) => ({
    url: `${BASE}/parques/${p.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const senderosUrls: MetadataRoute.Sitemap = SENDEROS_CATALOG.map((s) => ({
    url: `${BASE}/senderos/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const volcanesUrls: MetadataRoute.Sitemap = VOLCANES_CATALOG.map((v) => ({
    url: `${BASE}/volcanes/${v.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const { data: operatorsData } = await supabase
    .from("operators")
    .select("slug");

  const operatorUrls: MetadataRoute.Sitemap = (operatorsData ?? []).map((op) => ({
    url: `${BASE}/operadores/${op.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/en`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/volcanes`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/mapa`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/planear`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/operadores`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/novedades`, changeFrequency: "weekly", priority: 0.5 },
    ...operatorUrls,
    ...parquesUrls,
    ...senderosUrls,
    ...volcanesUrls,
    ...faunaUrls,
    ...categoryUrls,
    ...articleUrls,
  ];
}
