import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { StatusBoard } from "@/components/status/StatusBoard";
import { EstadoCTA } from "@/components/status/EstadoCTA";
import { OzoneSection } from "@/components/status/OzoneSection";
import { ArticleTile } from "@/components/ArticleTile";
import { Hero } from "@/components/home/Hero";
import { TopicCard } from "@/components/home/TopicCard";
import { DestinosSection } from "@/components/home/DestinosSection";
import { EscaladaSection } from "@/components/home/EscaladaSection";
import { Section, PageShell } from "@/components/layout";
import { getHomeTopics } from "@/lib/home-topics";
import { toCategorySlug } from "@/lib/category";
import { articleRedirect } from "@/lib/article-redirects";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Outdoor Patagonia — Nature, culture and stories from the south" },
  description:
    "The definitive guide to Patagonia: trekking, flora, fauna, gastronomy and tools to explore southern Argentina and Chile.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en",
    languages: { es: "https://outdoorpatagonia.com" },
  },
};

async function getLatestArticles() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language"
    )
    .eq("language", "en")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(40);
  // Sin los artículos absorbidos por una guía (301 en proxy.ts)
  return (data ?? [])
    .filter((a) => !articleRedirect(`/en/${toCategorySlug(a.category ?? "")}/${a.slug}`))
    .slice(0, 12);
}

// Misma home que la de español (src/app/page.tsx), en inglés. Sin AhoraSection:
// las publicaciones de /ahora son solo en español. Al final, los últimos artículos.
export default async function HomeEN() {
  const latest = await getLatestArticles();

  return (
    <div>
      <Hero lang="en" />

      {/* Categorías */}
      <Section id="categorias" spacing="lg" className="scroll-mt-20">
        <PageShell>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore by topic
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {getHomeTopics("en").map((c, i) => (
              <TopicCard key={c.href} {...c} index={i} lang="en" />
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Guías de destino */}
      <DestinosSection lang="en" />

      {/* Escalada */}
      <EscaladaSection lang="en" />

      {/* Estado en tiempo real */}
      <StatusBoard lang="en" />
      <EstadoCTA lang="en" />

      {/* Ozono */}
      <Section spacing="sm">
        <PageShell>
          <OzoneSection lang="en" />
        </PageShell>
      </Section>

      {/* Últimos artículos */}
      {latest.length > 0 && (
        <Section spacing="md">
          <PageShell>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Latest articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map((article) => (
                <ArticleTile key={article.slug} {...article} headingLevel="h3" />
              ))}
            </div>
          </PageShell>
        </Section>
      )}
    </div>
  );
}
