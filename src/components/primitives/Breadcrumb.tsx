import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

/** Breadcrumb nav — `variant="light"` (default) for photo/gradient heroes, `variant="dark"` for light backgrounds. */
export function Breadcrumb({
  items,
  className = "",
  variant = "light",
}: {
  items: BreadcrumbItem[]
  className?: string
  variant?: "light" | "dark"
}) {
  const tone =
    variant === "light"
      ? { chevron: "text-white/30", link: "text-white/55 hover:text-white", current: "text-white/85" }
      : { chevron: "text-muted-foreground/30", link: "text-muted-foreground hover:text-foreground", current: "text-foreground" }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-1 text-xs mb-3 ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className={`w-3 h-3 shrink-0 ${tone.chevron}`} />}
          {item.href ? (
            <Link
              href={item.href}
              className={`underline-offset-2 hover:underline transition-colors ${tone.link}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`font-medium ${tone.current}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
