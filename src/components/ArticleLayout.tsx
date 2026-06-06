import Link from "next/link";

interface Article {
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  tags: string[];
  reading_time_min: number | null;
  published_at: string | null;
  cover_image_url: string | null;
  language: string;
  slug: string;
}

export function ArticleLayout({ article }: { article: Article }) {
  const publishedDate = article.published_at
    ? new Intl.DateTimeFormat(article.language === "en" ? "en-US" : "es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(article.published_at))
    : null;

  const altLangHref =
    article.language === "es"
      ? `/en/${article.slug}`
      : `/${article.slug}`;

  const altLangLabel = article.language === "es" ? "English" : "Español";

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-sm tracking-wider uppercase text-foreground hover:text-[var(--color-teal)] transition-colors"
          >
            Outdoor Patagonia
          </Link>
          <Link
            href={altLangHref}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {altLangLabel}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          {/* Category badge */}
          {article.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-[var(--color-terracotta)] text-white mb-6">
              {article.category}
            </span>
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
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
            {publishedDate && <span>{publishedDate}</span>}
            {article.reading_time_min && (
              <span>
                {article.reading_time_min} min de lectura
              </span>
            )}
          </div>

          {/* Cover image */}
          {article.cover_image_url && (
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full rounded-md mb-10 object-cover max-h-[480px]"
            />
          )}

          {/* Body */}
          <div
            className="article-body overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
