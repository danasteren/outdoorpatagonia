// Selector ES | EN. El idioma actual va sin link. El otro es un <a> común y no
// un <Link>: el layout (header, footer, <html lang>) toma el idioma de la ruta
// en el servidor y una navegación del cliente lo dejaría en el idioma anterior.
export function LangToggle({
  esHref,
  enHref,
  currentLang,
}: {
  esHref: string | null
  enHref: string | null
  currentLang: 'es' | 'en'
}) {
  const option = (lang: 'es' | 'en', href: string | null, label: string) => {
    if (lang === currentLang) {
      return <span className="text-foreground" aria-current="true">{lang.toUpperCase()}</span>
    }
    if (!href) return <span className="text-foreground/25">{lang.toUpperCase()}</span>
    return (
      <a
        href={href}
        hrefLang={lang}
        lang={lang}
        aria-label={label}
        className="text-foreground/40 hover:text-foreground/70 transition-colors"
      >
        {lang.toUpperCase()}
      </a>
    )
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase">
      {option('es', esHref, 'Ver en español')}
      <span className="text-foreground/25" aria-hidden="true">|</span>
      {option('en', enHref, 'View in English')}
    </div>
  )
}
