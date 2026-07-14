import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/ArticleCard";

const BASE = "https://outdoorpatagonia.com";

export const metadata: Metadata = {
  title: "Gastronomía Patagónica — Recetas y Productos Típicos",
  description:
    "Gastronomía de la Patagonia: hongos de pino, calafate, cordero al asador y productos típicos de Argentina y Chile. Recetas, recolección y temporada.",
  openGraph: {
    title: "Gastronomía Patagónica — Recetas y Productos Típicos",
    description:
      "Gastronomía de la Patagonia: hongos de pino, calafate, cordero al asador y productos típicos de Argentina y Chile. Recetas, recolección y temporada.",
    url: `${BASE}/gastronomia`,
  },
  alternates: {
    canonical: `${BASE}/gastronomia`,
  },
};

async function getGastronomiaArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language"
    )
    .eq("language", "es")
    .eq("status", "published")
    .eq("category", "Gastronomía")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function GastronomiaPage() {
  const articles = await getGastronomiaArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gastronomía Patagónica",
    description:
      "Recetas, productos típicos e ingredientes silvestres de la Patagonia argentina y chilena.",
    url: `${BASE}/gastronomia`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Gastronomía
      </p>
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Gastronomía Patagónica
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-10">
        Ingredientes silvestres, recetas tradicionales y productos típicos de la Patagonia
        argentina y chilena: hongos de pino, calafate, cordero al asador y más.
      </p>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Todavía no hay artículos publicados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}
