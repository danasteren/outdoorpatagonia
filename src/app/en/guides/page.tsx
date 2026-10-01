import type { Metadata } from "next"
import { DestinosIndex } from "@/components/destinos/DestinosIndex"
import { DESTINOS_CATALOG } from "@/lib/destinos/catalog"

const URL = "https://outdoorpatagonia.com/en/guides"

export const metadata: Metadata = {
  title: "Patagonia Travel Guides by Destination",
  description:
    "Patagonia travel guides by destination: things to do, month-by-month weather, best time to visit, how to get there and how long to stay in Argentina and Chile.",
  openGraph: {
    title: "Patagonia Travel Guides by Destination",
    description: "Things to do, weather, best time to visit and how to get to each Patagonia destination.",
    url: URL,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: URL,
    languages: { es: "https://outdoorpatagonia.com/destinos", en: URL, "x-default": "https://outdoorpatagonia.com/destinos" },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Patagonia travel guides",
  url: URL,
  inLanguage: "en",
  hasPart: DESTINOS_CATALOG.map((d) => ({ "@type": "TouristDestination", name: d.nombre, url: `${URL}/${d.slug}` })),
}

export default function GuidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DestinosIndex lang="en" />
    </>
  )
}
