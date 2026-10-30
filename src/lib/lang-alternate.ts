'use client'

import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'
import { langOfPath, type Lang } from '@/lib/hreflang'

// URL de la página actual en el otro idioma, para el selector ES | EN del
// header. No hay mapa de pares propio: se lee el <link rel="alternate"
// hreflang> que ya renderiza la metadata de cada página (pageAlternates en
// src/lib/hreflang.ts), así el selector y el hreflang no se pueden desalinear.
// Si la página no declara par, el selector deja la opción deshabilitada.

export type { Lang }

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

/** `href`: el par; null si la página no tiene; undefined mientras no se leyó (render del servidor). */
export function useAltLang() {
  const pathname = usePathname()
  const current = langOfPath(pathname)
  const to: Lang = current === 'es' ? 'en' : 'es'
  const href = useSyncExternalStore<string | null | undefined>(
    subscribe,
    () => readAltPath(to),
    () => undefined,
  )
  return { pathname, current, href }
}
