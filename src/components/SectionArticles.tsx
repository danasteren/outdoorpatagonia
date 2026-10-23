import { createClient } from "@supabase/supabase-js"
import { ArticleTile } from "@/components/ArticleTile"
import { toCategorySlug } from "@/lib/category"
import { articleRedirect } from "@/lib/article-redirects"

interface SectionArticlesProps {
  /** Slug de la categoría de `articles` (clave de CATEGORY_SECTIONS). */
  categorySlug: string
  /** Slugs del catálogo de la sección: un artículo con el mismo slug queda tapado por la ficha. */
  catalogSlugs: string[]
}

/**
 * Bloque "Artículos" debajo del catálogo de una sección: los artículos ES
 * publicados de su categoría, más nuevos primero. Si no queda ninguno, no se
 * muestra. Ver CATEGORY_SECTIONS en src/lib/category.ts.
 */
export async function SectionArticles({ categorySlug, catalogSlugs }: SectionArticlesProps) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from("articles")
    .select("title, excerpt, category, reading_time_min, published_at, cover_image_url, slug, language")
    .eq("language", "es")
    .eq("status", "published")
    .not("category", "is", null)
    .order("published_at", { ascending: false })

  const catalog = new Set(catalogSlugs)
  const articles = (data ?? []).filter(
    (a) =>
      toCategorySlug(a.category as string) === categorySlug &&
      !catalog.has(a.slug) &&
      !articleRedirect(`/${categorySlug}/${a.slug}`)
  )
  if (articles.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-10 pb-14">
      <div className="border-t border-border pt-10">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold">Artículos</h2>
          <span className="text-sm text-muted-foreground">
            {articles.length} {articles.length === 1 ? "artículo" : "artículos"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleTile key={article.slug} {...article} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  )
}
