import type { Metadata } from "next"
import { DestinosIndex } from "@/components/destinos/DestinosIndex"
import { DESTINOS_CATALOG } from "@/lib/destinos/catalog"

const URL = "https://outdoorpatagonia.com/destinos"

export const metadata: Metadata = {
  title: "Destinos de la Patagonia: Guías de Viaje",
  description:
    "Guías de viaje de la Patagonia por destino: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse en Argentina y Chile.",
  openGraph: {
    title: "Destinos de la Patagonia: Guías de Viaje",
    description: "Qué hacer, clima, cuándo ir y cómo llegar a cada destino de la Patagonia.",
    url: URL,
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: URL,
    languages: { es: URL, en: "https://outdoorpatagonia.com/en/guides", "x-default": URL },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Destinos de la Patagonia",
  url: URL,
  inLanguage: "es",
  hasPart: DESTINOS_CATALOG.map((d) => ({ "@type": "TouristDestination", name: d.nombre, url: `${URL}/${d.slug}` })),
}

export default function DestinosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DestinosIndex lang="es" />
    </>
  )
}
