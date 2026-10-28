import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BookOpen, ChefHat, Globe, Hash, Leaf, PawPrint, Sparkles } from "lucide-react";
import { fixWpLazyLoad, addInstagramPhotoCredits, extractPhotoCredit } from "@/lib/utils";
import { DetailHero } from "@/components/DetailHero";
import { Card, CardBody } from "@/components/primitives/Card";
import { categoryHref as categoryHrefFor, toCategorySlug } from "@/lib/category";
import { articleCover, fixLegacyImages } from "@/lib/legacy-images";
import { decodeEntities } from "@/lib/text";

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

// Ícono del hero según la categoría; el resto usa BookOpen
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  flora: Leaf,
  fauna: PawPrint,
  gastronomia: ChefHat,
  gastronomy: ChefHat,
};

/** Página de artículo con el diseño de las fichas de catálogo: DetailHero + columna principal y sidebar. */
export function ArticleLayout({
  article,
  altLangHref,
}: {
  article: Article;
  altLangHref: string | null;
}) {
  const isEnglish = article.language === "en";
  const title = decodeEntities(article.title);
  const publishedDate = article.published_at
    ? new Intl.DateTimeFormat(isEnglish ? "en-US" : "es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(article.published_at))
    : null;

  const cover = articleCover(article);
  const homeHref = isEnglish ? "/en" : "/";
  const bannerText = isEnglish
    ? "You're viewing an article carried over from our previous site."
    : "Estás viendo un artículo que quedó del sitio anterior.";
  const bannerCta = isEnglish ? "See what's new" : "Ver lo nuevo del sitio";

  const categoryHref = article.category
    ? categoryHrefFor(article.category, article.language)
    : null;
  const isLegacy = article.wp_id != null;
  const Icon = (article.category && CATEGORY_ICONS[toCategorySlug(article.category)]) || BookOpen;

  // Crédito de la portada: Wikimedia (reemplazos) o Instagram (foto original de WordPress)
  const igCredit = !cover?.credit && article.cover_image_alt
    ? extractPhotoCredit(article.cover_image_alt)
    : null;
  const heroImage = cover
    ? {
        url: cover.url,
        // En los migrados, cover_image_alt es el texto de WordPress (a veces solo un crédito);
        // en los nuevos describe la portada
        alt: (!isLegacy && article.cover_image_alt) || title,
        creditLabel: isEnglish ? "Photo" : "Foto",
        ...(cover.credit
          ? {
              credit: `${cover.credit.author} / Wikimedia Commons (${cover.credit.license ?? (isEnglish ? "public domain" : "dominio público")})`,
              creditUrl: cover.credit.sourceUrl,
            }
          : igCredit
            ? {
                credit: igCredit.name ? `${igCredit.name} (@${igCredit.handle})` : `@${igCredit.handle}`,
                creditUrl: `https://www.instagram.com/${igCredit.handle}/`,
              }
            : {}),
      }
    : null;

  const meta = [publishedDate, article.reading_time_min ? `${article.reading_time_min} min` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="min-h-screen">
      <DetailHero
        image={heroImage}
        fallbackGradient="linear-gradient(135deg, var(--color-forest) 0%, var(--color-teal) 100%)"
        breadcrumb={[
          { label: isEnglish ? "Home" : "Inicio", href: homeHref },
          ...(article.category && categoryHref
            ? [{ label: article.category, href: categoryHref }]
            : []),
          { label: title },
        ]}
        icon={Icon}
        eyebrow={article.category ?? (isEnglish ? "Article" : "Artículo")}
        title={title}
        subtitle={meta || undefined}
        save={{ slug: article.slug, title: article.title, category: article.category ?? "" }}
      />

      {/* Aviso de artículo migrado del WordPress; va debajo del hero para que no lo tapen los botones fijos de HeroActions */}
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

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <article className="lg:col-span-2 min-w-0">
            {/* En los migrados, el excerpt es el corte automático de WordPress: repite el primer párrafo */}
            {!isLegacy && article.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}
            <div
              className="article-body overflow-x-hidden"
              dangerouslySetInnerHTML={{
                __html: addInstagramPhotoCredits(fixWpLazyLoad(fixLegacyImages(article.content ?? "")), isEnglish),
              }}
            />
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <Card variant="elevated">
              <CardBody className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {isEnglish ? "Details" : "Datos"}
                </h2>
                <dl className="space-y-2.5">
                  {article.category && categoryHref && (
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground/70 uppercase tracking-wider">
                        {isEnglish ? "Category" : "Categoría"}
                      </dt>
                      <dd className="text-sm font-medium">
                        <Link href={categoryHref} className="text-[var(--color-teal)] hover:underline">
                          {article.category}
                        </Link>
                      </dd>
                    </div>
                  )}
                  {publishedDate && (
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground/70 uppercase tracking-wider">
                        {isEnglish ? "Published" : "Publicado"}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">{publishedDate}</dd>
                    </div>
                  )}
                  {article.reading_time_min && (
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground/70 uppercase tracking-wider">
                        {isEnglish ? "Reading time" : "Lectura"}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">{article.reading_time_min} min</dd>
                    </div>
                  )}
                </dl>
              </CardBody>
            </Card>

            {altLangHref && (
              <Card variant="elevated">
                <CardBody className="p-5">
                  {/* <a> y no <Link>: el layout toma el idioma de la ruta en el servidor (ver LangToggle) */}
                  <a
                    href={altLangHref}
                    hrefLang={isEnglish ? "es" : "en"}
                    lang={isEnglish ? "es" : "en"}
                    className="flex items-center gap-2 text-sm text-[var(--color-teal)] hover:underline"
                  >
                    <Globe size={14} strokeWidth={1.5} />
                    {isEnglish ? "Leer en español" : "Read in English"}
                  </a>
                </CardBody>
              </Card>
            )}

            {article.tags && article.tags.length > 0 && (
              <Card variant="elevated">
                <CardBody className="p-5">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Hash size={14} strokeWidth={1.5} />
                    Tags
                  </h2>
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
                </CardBody>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
