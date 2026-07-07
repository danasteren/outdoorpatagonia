'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search, X, PawPrint, Leaf, Mountain, MapPin, Flame, Pickaxe,
  Globe, BookOpen, ArrowRight, Telescope, Activity,
} from 'lucide-react'
import Fuse from 'fuse.js'
import type { SearchResultType } from '@/lib/search/types'
import { STATIC_SEARCH_INDEX } from '@/lib/search/buildIndex'

const TYPE_META: Record<SearchResultType, { Icon: React.ElementType; color: string; label: string }> = {
  pagina:   { Icon: Globe,     color: 'text-[var(--color-teal)]', label: 'Página' },
  articulo: { Icon: BookOpen,  color: 'text-[var(--color-teal)]', label: 'Artículo' },
  fauna:    { Icon: PawPrint,  color: 'text-violet-500',          label: 'Fauna' },
  flora:    { Icon: Leaf,      color: 'text-green-500',           label: 'Flora' },
  parque:   { Icon: Mountain,  color: 'text-emerald-500',         label: 'Parque' },
  sendero:  { Icon: MapPin,    color: 'text-orange-500',          label: 'Sendero' },
  volcan:   { Icon: Flame,     color: 'text-red-500',             label: 'Volcán' },
  sector:   { Icon: Pickaxe,   color: 'text-sky-500',             label: 'Escalada' },
}

const QUICK_LINKS = [
  { href: '/parques',    label: 'Parques',    Icon: Mountain,  color: 'text-emerald-500' },
  { href: '/senderos',   label: 'Senderos',   Icon: MapPin,    color: 'text-orange-500' },
  { href: '/fauna',      label: 'Fauna',      Icon: PawPrint,  color: 'text-violet-500' },
  { href: '/flora',      label: 'Flora',      Icon: Leaf,      color: 'text-green-500' },
  { href: '/volcanes',   label: 'Volcanes',   Icon: Flame,     color: 'text-red-500' },
  { href: '/escalada',   label: 'Escalada',   Icon: Pickaxe,   color: 'text-sky-500' },
  { href: '/estado',     label: 'Estado',     Icon: Activity,  color: 'text-[var(--color-teal)]' },
  { href: '/astronomia', label: 'Astronomía', Icon: Telescope, color: 'text-[var(--color-teal)]' },
]

const fuse = new Fuse(STATIC_SEARCH_INDEX, {
  keys: [
    { name: 'title',          weight: 3 },
    { name: 'description',    weight: 1 },
    { name: 'meta',           weight: 0.5 },
    { name: 'searchableText', weight: 1.5 },
  ],
  threshold: 0.35,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
})

// Resalta las letras coincidentes dentro de un string
function Highlighted({ text, indices }: { text: string; indices?: readonly [number, number][] }) {
  if (!indices || indices.length === 0) return <>{text}</>
  const parts: React.ReactNode[] = []
  let last = 0
  for (const [start, end] of indices) {
    if (start > last) parts.push(text.slice(last, start))
    parts.push(
      <mark key={start} className="bg-transparent text-[var(--color-teal)] font-bold not-italic">
        {text.slice(start, end + 1)}
      </mark>
    )
    last = end + 1
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

type SearchFuseResult = ReturnType<typeof fuse.search>[number]

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const router = useRouter()

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const fuseResults = useMemo<SearchFuseResult[]>(() => {
    const q = query.trim()
    if (q.length < 2) return []
    return fuse.search(q, { limit: 12 })
  }, [query])

  // Reset selection when results change
  useEffect(() => { setSelectedIdx(-1) }, [fuseResults])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (fuseResults.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx((i) => Math.min(i + 1, fuseResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && selectedIdx >= 0) {
      e.preventDefault()
      router.push(fuseResults[selectedIdx].item.href)
      onClose()
    }
  }, [fuseResults, selectedIdx, router, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIdx < 0 || !listRef.current) return
    const li = listRef.current.children[selectedIdx] as HTMLElement
    li?.scrollIntoView({ block: 'nearest' })
  }, [selectedIdx])

  const trimmed = query.trim()
  const showResults = trimmed.length >= 2

  return (
    <div className="fixed inset-0 z-[1002] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search bar */}
      <div className="relative z-10 bg-background/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <Search size={16} className="text-[var(--color-teal)] shrink-0" strokeWidth={1.75} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscá parques, fauna, senderos, volcanes…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Results panel */}
      <div className="relative z-10 bg-background border-b border-border shadow-xl overflow-y-auto max-h-[min(70vh,520px)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">

          {/* Quick links */}
          {!showResults && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">
                Explorar
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {QUICK_LINKS.map(({ href, label, Icon, color }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border hover:border-[var(--color-teal)]/30 hover:bg-muted/50 transition-all text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Icon size={14} strokeWidth={1.75} className={`${color} shrink-0`} />
                    <span className="font-medium truncate">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {showResults && fuseResults.length === 0 && (
            <p className="text-sm text-muted-foreground py-2">
              Sin resultados para <strong className="text-foreground">"{trimmed}"</strong>.
            </p>
          )}

          {/* Results */}
          {showResults && fuseResults.length > 0 && (
            <ul ref={listRef} className="space-y-0.5">
              {fuseResults.map(({ item, matches }, idx) => {
                const { Icon, color } = TYPE_META[item.type]
                const titleMatch = matches?.find((m) => m.key === 'title')
                const isSelected = idx === selectedIdx
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
                        isSelected ? 'bg-muted' : 'hover:bg-muted/60'
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.75} className={`${color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate leading-snug">
                          <Highlighted
                            text={item.title}
                            indices={titleMatch?.indices as [number, number][] | undefined}
                          />
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.meta && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground hidden sm:inline-block">
                            {item.meta}
                          </span>
                        )}
                        <ArrowRight
                          size={13}
                          strokeWidth={1.75}
                          className={`transition-colors ${isSelected ? 'text-[var(--color-teal)]' : 'text-muted-foreground/30 group-hover:text-[var(--color-teal)]'}`}
                        />
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Footer */}
          {showResults && fuseResults.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <Link
                href={`/buscar?q=${encodeURIComponent(trimmed)}`}
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Ver todos los resultados
                <ArrowRight size={11} strokeWidth={1.75} />
              </Link>
              <span className="text-[11px] text-muted-foreground/40 hidden sm:block">
                ↑↓ navegar · Enter abrir · Esc cerrar
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
