import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Badge } from "@/components/primitives/Badge"
import { toCategorySlug } from "@/lib/category"
import { articleCover } from "@/lib/legacy-images"
import { decodeEntities } from "@/lib/text"

interface ArticleTileProps {
  title: string
  excerpt: string | null
  category: string | null
  reading_time_min: number | null
  published_at: string | null
  cover_image_url: string | null
  slug: string
  language: string
  /** h3 cuando la grilla va debajo de un h2. */
  headingLevel?: "h2" | "h3"
}

/** Tarjeta de artículo con el mismo diseño que las de los catálogos (fauna, flora, gastronomía). */
export function ArticleTile({
  title,
  excerpt,
  category,
  reading_time_min,
  published_at,
  cover_image_url,
  slug,
  language,
  headingLevel = "h2",
}: ArticleTileProps) {
  const Heading = headingLevel
  const cleanTitle = decodeEntities(title)
  const isEnglish = language === "en"
  const catSlug = category ? toCategorySlug(category) : ""
  const href = isEnglish ? `/en/${catSlug}/${slug}` : `/${catSlug}/${slug}`
  const coverUrl = articleCover({ slug, cover_image_url })?.url
  const year = published_at ? new Date(published_at).getFullYear() : null
  const meta = [reading_time_min ? `${reading_time_min} min` : null, year].filter(Boolean).join(" · ")

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Heading className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
            {cleanTitle}
          </Heading>
          {meta && <p className="text-xs text-muted-foreground mt-0.5">{meta}</p>}
        </div>
        <div className="shrink-0 w-11 h-11 rounded-full overflow-hidden ring-2 ring-border flex items-center justify-center bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt={cleanTitle} loading="lazy" className="object-cover w-full h-full" />
          ) : (
            <BookOpen size={18} strokeWidth={1.5} />
          )}
        </div>
      </div>

      {excerpt && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{decodeEntities(excerpt)}</p>
      )}

      <Badge variant="outline" size="sm" className="self-start mt-auto">
        {isEnglish ? "Read article →" : "Leer artículo →"}
      </Badge>
    </Link>
  )
}
