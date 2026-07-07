'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { Search, BookOpen, PawPrint, Leaf, Mountain, ChevronRight } from 'lucide-react'
import type { SearchItem, SearchResultType } from '@/lib/search/types'

const TYPE_CONFIG: Record<
  SearchResultType,
  { label: string; Icon: React.ElementType; colorClass: string; badgeClass: string }
> = {
  articulo: {
    label: 'Artículos',
    Icon: BookOpen,
    colorClass: 'text-[var(--color-teal)]',
    badgeClass: 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]',
  },
  fauna: {
    label: 'Fauna',
    Icon: PawPrint,
    colorClass: 'text-violet-500',
    badgeClass: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400',
  },
  parque: {
    label: 'Parques',
    Icon: Leaf,
    colorClass: 'text-green-600',
    badgeClass: 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  },
  sendero: {
    label: 'Senderos',
    Icon: Mountain,
    colorClass: 'text-orange-500',
    badgeClass: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400',
  },
}

const GROUP_ORDER: SearchResultType[] = ['articulo', 'fauna', 'parque', 'sendero']

export function BuscarClient({ items, initialQ }: { items: SearchItem[]; initialQ: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQ)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 1 },
          { name: 'meta', weight: 1 },
          { name: 'searchableText', weight: 1.5 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
        includeScore: true,
      }),
    [items]
  )

  const results = useMemo(() => {
    const q = query.trim()
    if (q.length < 2) return []
    return fuse.search(q, { limit: 40 }).map((r) => r.item)
  }, [fuse, query])

  const grouped = useMemo(() => {
    const map = new Map<SearchResultType, SearchItem[]>()
    for (const item of results) {
      if (!map.has(item.type)) map.set(item.type, [])
      map.get(item.type)!.push(item)
    }
    return GROUP_ORDER.filter((t) => map.has(t)).map((t) => ({
      type: t,
      items: map.get(t)!,
    }))
  }, [results])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    const params = new URLSearchParams()
    if (val) params.set('q', val)
    const qs = params.toString()
    router.replace(`/buscar${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const trimmed = query.trim()

  useEffect(() => {
    if (trimmed.length < 3) return
    const timer = setTimeout(() => {
      fetch('/api/search-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, results_count: results.length }),
      }).catch(() => {})
    }, 800)
    return () => clearTimeout(timer)
  }, [trimmed, results.length])

  return (
    <div>
      {/* Input */}
      <div className="relative mb-8">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          strokeWidth={1.75}
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInput}
          placeholder="Parques, fauna, senderos, artículos…"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition-colors"
        />
      </div>

      {/* Empty prompt */}
      {trimmed.length < 2 && (
        <p className="text-sm text-muted-foreground">
          Escribí al menos 2 caracteres para buscar en los {items.length} contenidos del sitio.
        </p>
      )}

      {/* No results */}
      {trimmed.length >= 2 && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Sin resultados para{' '}
          <strong className="text-foreground font-semibold">"{trimmed}"</strong>. Probá con otra palabra.
        </p>
      )}

      {/* Results summary */}
      {trimmed.length >= 2 && results.length > 0 && (
        <p className="text-xs text-muted-foreground mb-6">
          {results.length} resultado{results.length !== 1 ? 's' : ''} para{' '}
          <strong className="text-foreground font-medium">"{trimmed}"</strong>
        </p>
      )}

      {/* Grouped results */}
      {grouped.map(({ type, items: groupItems }) => {
        const { label, Icon, colorClass, badgeClass } = TYPE_CONFIG[type]
        return (
          <section key={type} className="mb-8">
            <h2
              className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest mb-3 ${colorClass}`}
            >
              <Icon size={12} strokeWidth={2} />
              {label}
              <span className="ml-auto text-[10px] font-normal text-muted-foreground normal-case tracking-normal">
                {groupItems.length}
              </span>
            </h2>
            <ul className="space-y-1.5">
              {groupItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl border border-border hover:border-[var(--color-teal)]/30 hover:bg-muted/40 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-[var(--color-teal)] transition-colors leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      {item.meta && (
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md capitalize ${badgeClass}`}
                        >
                          {item.meta}
                        </span>
                      )}
                      <ChevronRight
                        size={14}
                        strokeWidth={1.75}
                        className="text-muted-foreground/40 group-hover:text-[var(--color-teal)] transition-colors"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
