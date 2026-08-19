import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { STATIC_SEARCH_INDEX } from '@/lib/search/buildIndex'
import { BuscarClient } from './BuscarClient'
import type { SearchItem } from '@/lib/search/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar — Outdoor Patagonia',
  description: 'Buscá parques, fauna, senderos y artículos sobre la Patagonia.',
}

async function getArticleItems(): Promise<SearchItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title, excerpt, category, slug')
    .eq('language', 'es')
    .eq('status', 'published')
  return (data ?? []).map((a) => ({
    type: 'articulo' as const,
    title: a.title,
    description: a.excerpt ?? '',
    href: `/${a.slug}`,
    meta: a.category ?? undefined,
  }))
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams

  const articleItems = await getArticleItems()

  const allItems = [...articleItems, ...STATIC_SEARCH_INDEX]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1
        className="text-2xl md:text-3xl font-bold text-foreground mb-8"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Buscar
      </h1>
      <Suspense>
        <BuscarClient items={allItems} initialQ={q} />
      </Suspense>
    </div>
  )
}
