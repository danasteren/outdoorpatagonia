import Link from "next/link";
import { Clock, Calendar } from "lucide-react";

function categoryHref(category: string, language: string) {
  const slug = category.toLowerCase().replace(/ /g, "-");
  return language === "en" ? `/en/category/${slug}` : `/categoria/${slug}`;
}

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
}: ArticleCardProps) {
  const href = language === "en" ? `/en/${slug}` : `/${slug}`;

  const date = published_at
    ? new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-AR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(published_at))
    : null;

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-[var(--color-teal)] hover:shadow-xl transition-all duration-200"
    >
      <div
        className={`overflow-hidden bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-teal)] ${
          featured ? "h-56 md:h-80" : "h-44"
        }`}
      >
        {cover_image_url && (
          <img
            src={cover_image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-5">
        {category && (
          <Link
            href={categoryHref(category, language)}
            onClick={(e) => e.stopPropagation()}
            className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--color-terracotta)] text-white mb-3 hover:opacity-80 transition-opacity"
          >
            {category}
          </Link>
        )}
        <h2
          className={`font-bold leading-snug mb-2 group-hover:text-[var(--color-teal)] transition-colors ${
            featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h2>
        {excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
    </Link>
  );
}
