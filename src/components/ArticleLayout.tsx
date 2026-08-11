import Link from "next/link";
import { Calendar, Clock, Hash, Sparkles } from "lucide-react";
import { fixWpLazyLoad, addInstagramPhotoCredits, extractPhotoCredit } from "@/lib/utils";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Breadcrumb } from "@/components/primitives/Breadcrumb";
import { toCategorySlug } from "@/lib/category";

interface Article {
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  tags: string[];
  reading_time_min: number | null;
  published_at: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  language: string;
  slug: string;
  wp_id: number | null;
}

export function ArticleLayout({
  article,
  altLangHref,
}: {
  article: Article;
  altLangHref: string | null;
}) {
  const publishedDate = article.published_at
    ? new Intl.DateTimeFormat(article.language === "en" ? "en-US" : "es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(article.published_at))
    : null;

  const altLangLabel = article.language === "es" ? "English" : "Español";

  const isEnglish = article.language === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const bannerText = isEnglish
    ? "You're viewing an article carried over from our previous site."
    : "Estás viendo un artículo que quedó del sitio anterior.";
  const bannerCta = isEnglish ? "See what's new" : "Ver lo nuevo del sitio";

  const categorySlug = article.category ? toCategorySlug(article.category) : null;
  const categoryHref = categorySlug
    ? isEnglish
      ? `/en/category/${categorySlug}`
      : categorySlug === "gastronomia"
        ? "/gastronomia"
        : `/categoria/${categorySlug}`
    : null;
  const isLegacy = article.wp_id != null;
  const breadcrumbItems = [
    { label: isEnglish ? "Home" : "Inicio", href: homeHref },
    ...(article.category && categoryHref
      ? [{ label: article.category, href: categoryHref }]
      : []),
    { label: article.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Legacy content banner — only for articles migrated from the old WordPress site */}
      <header className="sticky top-0 z-10 border-b border-border">
        {isLegacy && (
          <Link
            href={homeHref}
            className="flex items-center justify-center gap-2 bg-[var(--color-teal)] px-4 py-2 text-center text-xs md:text-sm text-white hover:bg-[var(--color-teal)]/90 transition-colors"
          >
            <Sparkles size={14} strokeWidth={1.75} className="shrink-0" />
            <span>
              {bannerText} <span className="font-semibold underline underline-offset-2">{bannerCta}</span>
            </span>
          </Link>
        )}
        {altLangHref && (
          <div className="bg-background/90 backdrop-blur">
            <div className="max-w-4xl mx-auto px-4 h-10 flex items-center justify-end">
              <Link
                href={altLangHref}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {altLangLabel}
              </Link>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
      <article>
          {/* Breadcrumb — links to the current site's home/category pages */}
          <Breadcrumb items={breadcrumbItems} variant="dark" className="mb-4" />

          {/* Category badge */}
          {article.category && categoryHref && (
            <Link
              href={categoryHref}
              className="inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-[var(--color-terracotta)] text-white mb-6 hover:opacity-80 transition-opacity"
            >
              {article.category}
            </Link>
          )}

          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 border-l-4 border-[var(--color-teal)] pl-4">
              {article.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
            {publishedDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} strokeWidth={1.5} />
                {publishedDate}
              </span>
            )}
            {article.reading_time_min && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} strokeWidth={1.5} />
                {article.reading_time_min} min
              </span>
            )}
            <span className="ml-auto">
              <FavoriteButton slug={article.slug} title={article.title} category={article.category} />
            </span>
          </div>

          {/* Cover image */}
          {article.cover_image_url && (
            <div className="mb-10">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full rounded-md object-cover max-h-[480px]"
              />
              {(() => {
                const credit = article.cover_image_alt
                  ? extractPhotoCredit(article.cover_image_alt)
                  : null;
                if (!credit) return null;
                const text = credit.name ? `${credit.name} (@${credit.handle})` : `@${credit.handle}`;
                const label = isEnglish ? "Photo" : "Foto";
                return (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {label}:{" "}
                    <a
                      href={`https://www.instagram.com/${credit.handle}/`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[var(--color-teal)] underline underline-offset-2 hover:text-[var(--color-teal-light)] transition-colors"
                    >
                      {text}
                    </a>
                  </p>
                );
              })()}
            </div>
          )}

          {/* Body */}
          <div
            className="article-body overflow-x-hidden"
            dangerouslySetInnerHTML={{
              __html: addInstagramPhotoCredits(fixWpLazyLoad(article.content ?? ""), isEnglish),
            }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                <Hash size={12} strokeWidth={1.5} />
                <span className="uppercase tracking-widest font-medium">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
      </article>
      </div>
    </div>
  );
}
