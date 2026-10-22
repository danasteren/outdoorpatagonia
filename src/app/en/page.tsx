import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ChefHat,
  Download,
  Landmark,
  Leaf,
  Lightbulb,
  Mountain,
  PawPrint,
  Recycle,
  ScrollText,
  Signpost,
  Sprout,
  Tent,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { PageHero } from "@/components/PageHero";
import { ArticleTile } from "@/components/ArticleTile";
import { TopicCard } from "@/components/home/TopicCard";
import { DestinosSection } from "@/components/home/DestinosSection";
import { Section, PageShell } from "@/components/layout";
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

// Ícono y color de cada categoría en inglés para "Explore by topic"; el resto usa el default
const TOPIC_STYLES: Record<string, { icon: LucideIcon; color: string }> = {
  fauna: { icon: PawPrint, color: "from-[var(--color-forest)] to-[var(--color-teal)]" },
  flora: { icon: Leaf, color: "from-[var(--color-teal)] to-[var(--color-teal-light)]" },
  fungi: { icon: Sprout, color: "from-[#5a4a3a] to-[var(--color-forest)]" },
  gastronomy: { icon: ChefHat, color: "from-[#2a1508] to-[#4d2e10]" },
  destinations: { icon: Signpost, color: "from-[#0a2233] to-[#103a4d]" },
  landscapes: { icon: Mountain, color: "from-[var(--color-charcoal)] to-[var(--color-forest)]" },
  history: { icon: ScrollText, color: "from-[#8a4d22] to-[var(--color-charcoal)]" },
  culture: { icon: Landmark, color: "from-[var(--color-terracotta)] to-[#8a4d22]" },
  tips: { icon: Lightbulb, color: "from-[#1a6a8a] to-[var(--color-charcoal)]" },
  "environmental-impact": { icon: Recycle, color: "from-[#3a5a2a] to-[var(--color-forest)]" },
  dome: { icon: Tent, color: "from-[var(--color-charcoal)] to-[#3a322f]" },
  "downloadable-resources": { icon: Download, color: "from-[var(--color-teal)] to-[#1a6a8a]" },
};
const DEFAULT_TOPIC = { icon: BookOpen, color: "from-[var(--color-forest)] to-[var(--color-teal)]" };

async function getArticles() {
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
    .order("published_at", { ascending: false });
  // Sin los artículos absorbidos por una guía (301 en proxy.ts)
  return (data ?? []).filter(
    (a) => !articleRedirect(`/en/${toCategorySlug(a.category ?? "")}/${a.slug}`)
  );
}

export default async function HomeEN() {
  const articles = await getArticles();

  const counts = new Map<string, { label: string; count: number }>();
  for (const a of articles) {
    if (!a.category) continue;
    const slug = toCategorySlug(a.category);
    if (slug === "sin-categorizar") continue;
    const entry = counts.get(slug) ?? { label: a.category, count: 0 };
    entry.count++;
    counts.set(slug, entry);
  }
  const topics = [...counts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([slug, { label, count }]) => ({
      label,
      href: `/en/category/${slug}`,
      description: `${count} ${count === 1 ? "article" : "articles"}`,
      ...(TOPIC_STYLES[slug] ?? DEFAULT_TOPIC),
    }));
  const latest = articles.slice(0, 12);

  return (
    <div>
      <PageHero
        icon={Mountain}
        eyebrow="Outdoor Patagonia"
        title="Nature, culture and stories from Patagonia"
        description="Travel guides, wildlife, plants, food and history from southern Argentina and Chile."
      />

      {topics.length > 0 && (
        <Section spacing="lg">
          <PageShell>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Explore by topic
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {topics.map((t, i) => (
                <TopicCard key={t.href} {...t} index={i} />
              ))}
            </div>
          </PageShell>
        </Section>
      )}

      <DestinosSection lang="en" />

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
