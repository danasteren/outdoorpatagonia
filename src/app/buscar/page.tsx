import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { FAUNA_CATALOG, CATEGORY_LABELS } from '@/lib/fauna/catalog'
import { PARQUES_CATALOG } from '@/lib/parques/catalog'
import { SENDEROS_CATALOG, DIFICULTAD_LABELS } from '@/lib/senderos/catalog'
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

  const faunaItems: SearchItem[] = FAUNA_CATALOG.map((f) => ({
    type: 'fauna' as const,
    title: f.commonNameEs,
    description: `${f.scientificName} · ${f.parquesRelacionados.map((p) => p.nombre).join(', ')}`,
    href: `/fauna/${f.slug}`,
    meta: CATEGORY_LABELS[f.category],
    searchableText: f.commonNameEn,
  }))

  const parqueItems: SearchItem[] = PARQUES_CATALOG.map((p) => ({
    type: 'parque' as const,
    title: p.name,
    description: p.description,
    href: `/parques/${p.slug}`,
    meta: p.country === 'ar' ? 'Argentina' : 'Chile',
    searchableText: p.highlights.join(' '),
  }))

  const senderoItems: SearchItem[] = SENDEROS_CATALOG.map((s) => ({
    type: 'sendero' as const,
    title: s.title,
    description: s.description,
    href: `/senderos/${s.slug}`,
    meta: DIFICULTAD_LABELS[s.dificultad],
    searchableText: `${s.parqueName} ${s.inicio}`,
  }))

  const allItems = [...articleItems, ...faunaItems, ...parqueItems, ...senderoItems]

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
