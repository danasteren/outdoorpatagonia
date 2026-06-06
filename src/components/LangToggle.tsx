'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function LangToggle() {
  const pathname = usePathname()
  const isEN = pathname.startsWith('/en')
  const rawSlug = isEN
    ? pathname.replace(/^\/en\/?/, '')
    : pathname.replace(/^\//, '')
  const esHref = rawSlug ? `/${rawSlug}` : '/'
  const enHref = rawSlug ? `/en/${rawSlug}` : '/en'

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase">
      <Link
        href={esHref}
        className={
          !isEN
            ? 'text-foreground'
            : 'text-foreground/40 hover:text-foreground/70 transition-colors'
        }
      >
        ES
      </Link>
      <span className="text-foreground/25">|</span>
      <Link
        href={enHref}
        className={
          isEN
            ? 'text-foreground'
            : 'text-foreground/40 hover:text-foreground/70 transition-colors'
        }
      >
        EN
      </Link>
    </div>
  )
}
