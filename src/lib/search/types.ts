export type SearchResultType = 'articulo' | 'fauna' | 'flora' | 'parque' | 'sendero' | 'volcan' | 'sector' | 'arqueologia' | 'terma' | 'gastronomia' | 'pagina'

export type SearchItem = {
  type: SearchResultType
  title: string
  description: string
  href: string
  meta?: string
  searchableText?: string
}
