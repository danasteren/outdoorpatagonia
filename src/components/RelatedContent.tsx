import Link from "next/link"
import { Badge } from "@/components/primitives/Badge"

export type RelatedItem = {
  name: string
  scientificName?: string
  categoryLabel: string
  href: string
}

type Props = {
  heading: string
  items: RelatedItem[]
  seeAllHref: string
  seeAllLabel: string
}

export function RelatedContent({ heading, items, seeAllHref, seeAllLabel }: Props) {
  if (items.length === 0) return null

  return (
    <section className="border-t border-border mt-10 pt-10 pb-14 max-w-6xl mx-auto px-4 md:px-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{heading}</h2>
        <Link
          href={seeAllHref}
          className="text-sm text-[var(--color-teal)] hover:underline shrink-0 ml-4"
        >
          {seeAllLabel}
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-border bg-card hover:border-[var(--color-teal)] hover:shadow-sm transition-all p-3 flex flex-col gap-1.5"
          >
            <Badge variant="category" size="sm" className="w-fit">
              {item.categoryLabel}
            </Badge>
            <span className="font-semibold text-sm group-hover:text-[var(--color-teal)] transition-colors leading-snug">
              {item.name}
            </span>
            {item.scientificName && (
              <span className="text-[11px] text-muted-foreground italic leading-snug">
                {item.scientificName}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
