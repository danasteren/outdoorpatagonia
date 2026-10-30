'use client'

import { useId, useState } from 'react'

// Selector ES | EN. El idioma actual va sin link. El otro es un <a> común y no
// un <Link>: el layout (header, footer, <html lang>) toma el idioma de la ruta
// en el servidor y una navegación del cliente lo dejaría en el idioma anterior.
// Si la página no tiene par (href null), la opción queda deshabilitada y al
// tocarla o pasar el mouse muestra el aviso. undefined: todavía no se leyó el
// hreflang (render del servidor), se muestra igual que un link sin acción.

const NO_PAIR = {
  es: 'Esta página todavía no está en inglés',
  en: 'This page is not yet available in Spanish',
}

export function LangToggle({
  esHref,
  enHref,
  currentLang,
}: {
  esHref: string | null | undefined
  enHref: string | null | undefined
  currentLang: 'es' | 'en'
}) {
  const [showNotice, setShowNotice] = useState(false)
  const noticeId = useId()

  const option = (lang: 'es' | 'en', href: string | null | undefined, label: string) => {
    if (lang === currentLang) {
      return <span className="text-foreground" aria-current="true">{lang.toUpperCase()}</span>
    }
    if (href === undefined) return <span className="text-foreground/40">{lang.toUpperCase()}</span>
    if (href === null) {
      return (
        <button
          type="button"
          aria-disabled="true"
          aria-describedby={noticeId}
          // En el celular el toque dispara mouseenter y después click: un toggle lo cerraría.
          onClick={() => setShowNotice(true)}
          onMouseEnter={() => setShowNotice(true)}
          onMouseLeave={() => setShowNotice(false)}
          onBlur={() => setShowNotice(false)}
          className="text-foreground/25 cursor-not-allowed uppercase tracking-widest"
        >
          {lang.toUpperCase()}
        </button>
      )
    }
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

  const noPair = (currentLang === 'es' ? enHref : esHref) === null

  return (
    <div className="relative flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase">
      {option('es', esHref, 'Ver en español')}
      <span className="text-foreground/25" aria-hidden="true">|</span>
      {option('en', enHref, 'View in English')}
      {noPair && (
        <span
          id={noticeId}
          role="tooltip"
          className={`absolute max-md:left-1/2 max-md:-translate-x-1/2 md:right-0 top-full mt-2 z-50 w-max max-w-[16rem] rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-normal normal-case tracking-normal text-muted-foreground shadow-md${showNotice ? '' : ' sr-only'}`}
        >
          {NO_PAIR[currentLang]}
        </span>
      )}
    </div>
  )
}
