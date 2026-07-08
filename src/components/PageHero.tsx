import type { LucideIcon } from "lucide-react"
import { Breadcrumb, type BreadcrumbItem } from "@/components/primitives/Breadcrumb"

const TONES = {
  forest: "bg-[var(--color-forest)] text-[var(--color-cream)]",
  teal: "bg-[var(--color-teal)] text-white",
  terracotta: "bg-[var(--color-terracotta)] text-white",
  muted: "bg-muted text-foreground",
} as const

interface PageHeroProps {
  icon?: LucideIcon
  eyebrow: string
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
  tone?: keyof typeof TONES
  /** Low, fixed-height band (used above /mapa) instead of the full py-14 hero. */
  compact?: boolean
}

/** Solid-color band hero for pages without a photo — utility pages, index pages. */
export function PageHero({
  icon: Icon,
  eyebrow,
  title,
  description,
  breadcrumb,
  tone = "forest",
  compact = false,
}: PageHeroProps) {
  const toneClasses = TONES[tone]
  const isDark = tone !== "muted"

  if (compact) {
    return (
      <div className={`h-16 flex items-center overflow-hidden ${toneClasses}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-10 w-full flex items-center gap-3">
          {Icon && <Icon size={18} strokeWidth={1.5} className="opacity-70 shrink-0" />}
          <div className="min-w-0">
            <h1 className="text-sm font-bold leading-none truncate">{title}</h1>
            {description && (
              <p className="text-xs opacity-70 truncate mt-0.5 hidden sm:block">{description}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={toneClasses}>
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
        {breadcrumb && <Breadcrumb items={breadcrumb} variant={isDark ? "light" : "dark"} />}
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon size={22} strokeWidth={1.5} className="opacity-60" />}
          <span className="text-sm uppercase tracking-widest opacity-60">{eyebrow}</span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-3 opacity-75 max-w-xl text-base leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}
