import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { DESTINOS_CATALOG, getDestinoEntry } from "@/lib/destinos/catalog"
import { buildDestinoMetadata, loadDestinoData } from "@/lib/destinos/page"
import { DestinoGuide } from "@/components/destinos/DestinoGuide"

// El clima "ahora" se refresca cada hora.
export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return DESTINOS_CATALOG.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return buildDestinoMetadata(slug, "es")
}

export default async function DestinoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = getDestinoEntry(slug)
  if (!entry) notFound()
  const data = await loadDestinoData(entry)
  return <DestinoGuide entry={entry} lang="es" {...data} />
}
