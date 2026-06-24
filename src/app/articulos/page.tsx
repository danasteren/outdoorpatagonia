import type { Metadata } from "next";
import Link from "next/link";
import { createClient as createBuildClient } from "@supabase/supabase-js";
import { ArticleCard } from "@/components/ArticleCard";
import { toCategorySlug } from "@/lib/category";
import {
  PawPrint,
  Leaf,
  Mountain,
  MapPin,
  Pickaxe,
  Telescope,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Artículos — Outdoor Patagonia",
  description:
    "Todos los artículos de Outdoor Patagonia: fauna, flora, parques, senderos, escalada y más. Contenido migrado del sitio anterior y nuevo material organizado por categoría.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/articulos",
  },
};

const CATEGORY_SECTIONS = [
  {
    label: "Fauna",
    href: "/fauna",
    icon: PawPrint,
    description:
      "Guías de aves, mamíferos marinos y terrestres. Avistamientos en tiempo real vía iNaturalist.",
    color: "bg-[var(--color-forest)]",
  },
  {
    label: "Flora",
    href: "/flora",
    icon: Leaf,
    description:
      "Catálogo de plantas nativas, ecosistemas y bosques patagónicos.",
    color: "bg-[var(--color-teal)]",
  },
  {
    label: "Parques",
    href: "/parques",
    icon: Mountain,
    description:
      "Áreas protegidas de Argentina y Chile: accesos, condiciones y qué ver.",
    color: "bg-[var(--color-charcoal)]",
  },
  {
    label: "Senderos",
    href: "/senderos",
    icon: MapPin,
    description:
      "Trekking y caminatas con distancias, dificultad y temporada recomendada.",
    color: "bg-[#3a5a2a]",
  },
  {
    label: "Escalada",
    href: "/escalada",
    icon: Pickaxe,
    description:
      "Sectores y vías de roca de Patagonia con clima en tiempo real.",
    color: "bg-[#5a4a3a]",
  },
  {
    label: "Astronomía",
    href: "/astronomia",
    icon: Telescope,
    description:
      "Cielos oscuros, fase lunar, lluvia de meteoros y eventos astronómicos.",
    color: "bg-[#0f1d2e]",
  },
];

async function getAllArticles() {
  const supabase = createBuildClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("articles")
    .select(
      "title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language"
    )
    .eq("language", "es")
    .eq("status", "published")
    .not("category", "ilike", "recursos-descargables")
    .order("published_at", { ascending: false });
  return (data ?? []).filter(
    (a) => toCategorySlug(a.category ?? "") !== "recursos-descargables"
  );
}

export default async function ArticulosPage() {
  const articles = await getAllArticles();

  return (
    <div>
      {/* Hero */}
      <div className="bg-[var(--color-charcoal)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-teal-light)] mb-4">
            Artículos
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            El sitio se renovó. El contenido sigue acá.
          </h1>
          <p className="text-base md:text-lg text-[var(--color-cream)]/70 leading-relaxed max-w-2xl mb-6">
            Migramos todos los artículos del sitio anterior y los reorganizamos
            por categoría. Además sumamos herramientas nuevas: mapa interactivo,
            datos en tiempo real, catálogo de especies y más. Si llegaste desde
            un link viejo, el artículo que buscás sigue disponible.
          </p>
          <Link
            href="/novedades"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-teal-light)] hover:underline"
          >
            Ver qué hay de nuevo en el sitio
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Qué hay en cada categoría */}
      <div className="bg-[var(--color-cream)]/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h2
            className="text-xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contenido organizado por categoría
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_SECTIONS.map(({ label, href, icon: Icon, description, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 hover:border-[var(--color-teal)] hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`${color} rounded-lg p-2.5 shrink-0 flex items-center justify-center`}
                >
                  <Icon size={20} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground group-hover:text-[var(--color-teal)] transition-colors mb-0.5">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Artículos */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2
          className="text-xl font-bold mb-6 text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Todos los artículos{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({articles.length})
          </span>
        </h2>

        {articles.length === 0 ? (
          <p className="text-muted-foreground">No hay artículos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
