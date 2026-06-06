import Link from 'next/link'
import { DarkModeToggle } from './DarkModeToggle'
import { LangToggle } from './LangToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/brand/op_02.svg"
            alt="Outdoor Patagonia"
            className="h-9 w-auto dark:brightness-0 dark:invert"
          />
        </Link>
        <div className="flex items-center gap-4">
          <LangToggle />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}
