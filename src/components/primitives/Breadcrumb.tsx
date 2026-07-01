import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

/** Light-on-dark breadcrumb for photo/gradient heroes. */
export function Breadcrumb({
  items,
  className = "",
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-1 text-xs mb-3 ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-white/30 shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-white/55 hover:text-white underline-offset-2 hover:underline transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/85 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
