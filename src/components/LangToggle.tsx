import Link from 'next/link'

export function LangToggle({
  esHref,
  enHref,
  currentLang,
}: {
  esHref: string | null
  enHref: string | null
  currentLang: 'es' | 'en'
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase">
      {esHref ? (
        <Link
          href={esHref}
          className={
            currentLang === 'es'
              ? 'text-foreground'
              : 'text-foreground/40 hover:text-foreground/70 transition-colors'
          }
        >
          ES
        </Link>
      ) : (
        <span className="text-foreground/25">ES</span>
      )}
      <span className="text-foreground/25">|</span>
      {enHref ? (
        <Link
          href={enHref}
          className={
            currentLang === 'en'
              ? 'text-foreground'
              : 'text-foreground/40 hover:text-foreground/70 transition-colors'
          }
        >
          EN
        </Link>
      ) : (
        <span className="text-foreground/25">EN</span>
      )}
    </div>
  )
}
