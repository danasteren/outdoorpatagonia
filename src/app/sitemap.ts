import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { categorySection, toCategorySlug } from "@/lib/category";
import { FAUNA_CATALOG } from "@/lib/fauna/catalog";
import { FLORA_CATALOG } from "@/lib/flora/catalog";
import { PARQUES_CATALOG } from "@/lib/parques/catalog";
import { SENDEROS_CATALOG } from "@/lib/senderos/catalog";
import { VOLCANES_CATALOG } from "@/lib/volcanes/catalog";
import { ARQUEOLOGIA_CATALOG } from "@/lib/arqueologia/catalog";
import { TERMAS_CATALOG } from "@/lib/termas/catalog";
import { ESCALADA_CATALOG } from "@/lib/escalada/catalog";
import { DESTINOS_CATALOG } from "@/lib/destinos/catalog";
import { articleRedirect } from "@/lib/article-redirects";
import { GASTRONOMIA_CATALOG } from "@/lib/gastronomia/catalog";

const BASE = "https://outdoorpatagonia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, language, category, published_at, updated_at")
    .eq("status", "published");

  const rows = articles ?? [];

  // Artículos con el mismo slug que una entrada de catálogo: la ruta muestra
  // la ficha del catálogo, que ya está en el sitemap.
  const catalogPaths = new Set([
    ...FAUNA_CATALOG.map((e) => `/fauna/${e.slug}`),
    ...FLORA_CATALOG.map((e) => `/flora/${e.slug}`),
    ...GASTRONOMIA_CATALOG.map((e) => `/gastronomia/${e.slug}`),
  ]);

  const articleUrls: MetadataRoute.Sitemap = rows
    .filter((a) => {
      const cat = toCategorySlug(a.category ?? "");
      const path = a.language === "en" ? `/en/${cat}/${a.slug}` : `/${cat}/${a.slug}`;
      return !articleRedirect(path) && !catalogPaths.has(path);
    })
    .map((a) => {
    const cat = toCategorySlug(a.category ?? "");
    return {
      url:
        a.language === "en"
          ? `${BASE}/en/${cat}/${a.slug}`
          : `${BASE}/${cat}/${a.slug}`,
      lastModified: new Date(a.updated_at ?? a.published_at ?? Date.now()),
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
  ].filter((cat) => !categorySection(cat));
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

  const floraUrls: MetadataRoute.Sitemap = FLORA_CATALOG.map((e) => ({
    url: `${BASE}/flora/${e.slug}`,
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

  const arqueologiaUrls: MetadataRoute.Sitemap = ARQUEOLOGIA_CATALOG.map((e) => ({
    url: `${BASE}/arqueologia/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const termasUrls: MetadataRoute.Sitemap = TERMAS_CATALOG.map((t) => ({
    url: `${BASE}/termas/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const gastronomiaUrls: MetadataRoute.Sitemap = GASTRONOMIA_CATALOG.map((g) => ({
    url: `${BASE}/gastronomia/${g.slug}`,
    changeFrequency: "monthly" as const,
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

  const escaladaUrls: MetadataRoute.Sitemap = ESCALADA_CATALOG.map((s) => ({
    url: `${BASE}/escalada/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const destinosUrls: MetadataRoute.Sitemap = DESTINOS_CATALOG.flatMap((d) => [
    { url: `${BASE}/destinos/${d.slug}`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/en/guides/${d.slug}`, changeFrequency: "daily" as const, priority: 0.9 },
  ]);

  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/en`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/arqueologia`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/gastronomia`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/fauna`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/flora`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/parques`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/senderos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/articulos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/estado`, changeFrequency: "hourly", priority: 0.7 },
    { url: `${BASE}/astronomia`, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/volcanes`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/termas`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/escalada`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/destinos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/en/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/mapa`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/planear`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/planear/que-llevar`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/operadores`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/anunciar`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/novedades`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/recursos-viaje-patagonia`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/en/resources-traveling-patagonia`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/ahora`, changeFrequency: "hourly", priority: 0.6 },
    { url: `${BASE}/proyecto-patagonia`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/en/patagonia-project`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/contacto`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/en/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/en/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terminos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/en/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...operatorUrls,
    ...parquesUrls,
    ...senderosUrls,
    ...volcanesUrls,
    ...faunaUrls,
    ...floraUrls,
    ...arqueologiaUrls,
    ...termasUrls,
    ...escaladaUrls,
    ...destinosUrls,
    ...gastronomiaUrls,
    ...categoryUrls,
    ...articleUrls,
  ];
}
