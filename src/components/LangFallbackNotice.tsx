'use client'

import { useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { NO_PAIR_HASH, langOfPath } from '@/lib/lang-alternate'

// Aviso cuando el selector de idioma trajo al lector a la home porque la
// página de la que venía no tiene versión en este idioma.

const TEXT = {
  en: { body: "That page isn't available in English yet, so we brought you to the English home.", close: 'Close' },
  es: { body: 'Esa página todavía no está en español, así que te trajimos a la portada en español.', close: 'Cerrar' },
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function LangFallbackNotice() {
  const pathname = usePathname()
  const hasHash = useSyncExternalStore(subscribe, () => window.location.hash === NO_PAIR_HASH, () => false)
  if (!hasHash || (pathname !== '/' && pathname !== '/en')) return null

  const t = TEXT[langOfPath(pathname)]
  function dismiss() {
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return (
    <div role="status" className="border-b border-border bg-muted/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3 text-xs text-muted-foreground">
        <p className="flex-1">{t.body}</p>
        <button
          onClick={dismiss}
          aria-label={t.close}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-muted hover:text-foreground transition-colors"
        >
          <X size={13} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}
