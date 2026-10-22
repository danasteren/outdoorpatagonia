import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { categoryHref, toCategorySlug } from "@/lib/category";
import { articleCover } from "@/lib/legacy-images";

interface ArticleCardProps {
  title: string;
  excerpt: string | null;
  category: string | null;
  reading_time_min: number | null;
  published_at: string | null;
  cover_image_url: string | null;
  slug: string;
  language: string;
  featured?: boolean;
  /** h3 cuando la grilla va debajo de un h2 (bloque "Artículos" de las secciones). */
  headingLevel?: "h2" | "h3";
}

export function ArticleCard({
  title,
  excerpt,
  category,
  reading_time_min,
  published_at,
  cover_image_url,
  slug,
  language,
  featured = false,
  headingLevel = "h2",
}: ArticleCardProps) {
  const Heading = headingLevel;
  const coverImageUrl = articleCover({ slug, cover_image_url })?.url;
  const catSlug = category ? toCategorySlug(category) : "";
  const href =
    language === "en"
      ? `/en/${catSlug}/${slug}`
      : `/${catSlug}/${slug}`;

  const date = published_at
    ? new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-AR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(published_at))
    : null;

  // La tarjeta entera es clickeable con un "stretched link": el ::after del
  // <Link> del título cubre la tarjeta. El badge de categoría queda encima
  // (relative z-10) para no anidar <a> dentro de <a>.
  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-[var(--color-teal)] hover:shadow-xl transition-all duration-200">
      <div
        className={`shrink-0 overflow-hidden bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-teal)] ${
          featured ? "h-56 md:h-80" : "h-44"
        }`}
      >
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {category && (
          <Link
            href={categoryHref(category, language)}
            className="relative z-10 self-start inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--color-terracotta)] text-white mb-3 hover:opacity-80 transition-opacity"
          >
            {category}
          </Link>
        )}
        <Heading
          className={`font-bold leading-snug mb-2 line-clamp-2 group-hover:text-[var(--color-teal)] transition-colors ${
            featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-[var(--color-teal)]"
          >
            {title}
          </Link>
        </Heading>
        {excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          {date && (
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} strokeWidth={1.5} />
              {date}
            </span>
          )}
          {reading_time_min && (
            <span className="inline-flex items-center gap-1">
              <Clock size={11} strokeWidth={1.5} />
              {reading_time_min} min
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
