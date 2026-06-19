export type SearchResultType = 'articulo' | 'fauna' | 'parque' | 'sendero'

export type SearchItem = {
  type: SearchResultType
  title: string
  description: string
  href: string
  meta?: string
  searchableText?: string
}
