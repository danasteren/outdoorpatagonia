import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Outdoor Patagonia — Nature, culture and stories from the south",
  description:
    "The definitive guide to Patagonia: trekking, flora, fauna, gastronomy and tools to explore southern Argentina and Chile.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en",
    languages: { es: "https://outdoorpatagonia.com" },
  },
};

async function getArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language"
    )
    .eq("language", "en")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(12);
  return data ?? [];
}

export default async function HomeEN() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Nature, culture and stories
        <br className="hidden md:block" /> from Patagonia.
      </h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured && (
            <div className="md:col-span-2">
              <ArticleCard {...featured} featured />
            </div>
          )}
          {rest.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20">No published articles yet.</p>
      )}
    </div>
  );
}
