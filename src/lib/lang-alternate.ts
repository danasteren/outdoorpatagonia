'use client'

import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'

// URL de la página actual en el otro idioma, para el selector ES | EN del
// header. No hay mapa de pares propio: se lee el <link rel="alternate"
// hreflang> que ya renderiza la metadata de cada página (alternates.languages),
// así el selector y el hreflang no se pueden desalinear. Si la página no
// declara par, se va a la home del otro idioma con NO_PAIR_HASH, que muestra
// el aviso de LangFallbackNotice.

export type Lang = 'es' | 'en'

export const NO_PAIR_HASH = '#sin-traduccion'

export function langOfPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

// El hreflang de las categorías empareja por slug y casi todos difieren entre
// idiomas (historia ↔ history): apunta a URLs que dan 404 (ver STATUS). Hasta
// arreglarlo, el selector no lo usa.
const UNRELIABLE_HREFLANG = [/^\/categoria\//, /^\/en\/category\//]

// La metadata se streamea y cambia en cada navegación: hay que volver a leerla.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.head, { childList: true, subtree: true, attributes: true })
  observer.observe(document.body, { childList: true })
  return () => observer.disconnect()
}

function readAltPath(to: Lang): string | null {
  const href = document
    .querySelector(`link[rel="alternate"][hreflang="${to}"]`)
    ?.getAttribute('href')
  if (!href) return null
  try {
    // Solo el path: el hreflang es absoluto (producción) y así funciona en local.
    return new URL(href, window.location.origin).pathname
  } catch {
    return null
  }
}

export function useAltLang() {
  const pathname = usePathname()
  const current = langOfPath(pathname)
  const to: Lang = current === 'es' ? 'en' : 'es'
  const reliable = !UNRELIABLE_HREFLANG.some((r) => r.test(pathname))
  const pair = useSyncExternalStore(
    subscribe,
    () => (reliable ? readAltPath(to) : null),
    () => null,
  )
  const href = pair ?? `${to === 'en' ? '/en' : '/'}${NO_PAIR_HASH}`
  return { pathname, current, href }
}
