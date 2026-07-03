import type { Metadata } from "next"
import { Mountain } from "lucide-react"
import { ESCALADA_CATALOG, totalVias } from "@/lib/escalada/catalog"
import { EscaladaClient } from "./EscaladaClient"

export const metadata: Metadata = {
  title: "Escalada en Patagonia — Sectores Argentina y Chile | Outdoor Patagonia",
  description:
    "Guía completa de escalada en Patagonia: Fitz Roy, Cerro Torre, Torres del Paine, Piedra Parada, Cochamó y más. Vías, grados, temporada y condiciones en vivo para deportiva, alpinismo y boulder.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/escalada",
  },
  openGraph: {
    title: "Escalada en Patagonia — Sectores Argentina y Chile",
    description:
      "Guía completa de escalada en Patagonia: Fitz Roy, Cerro Torre, Torres del Paine, Piedra Parada, Cochamó y más. Deportiva, alpinismo y boulder.",
    url: "https://outdoorpatagonia.com/escalada",
  },
  twitter: { card: "summary_large_image" },
}

export default function EscaladaIndexPage() {
  const totalSectores = ESCALADA_CATALOG.length
  const totalViasCount = ESCALADA_CATALOG.reduce(
    (acc, s) => acc + (totalVias(s) > 0 ? totalVias(s) : 0),
    0
  )
  const paises = [...new Set(ESCALADA_CATALOG.map((s) => s.pais))]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-5 h-5 opacity-50" />
            <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">
              Guía de escalada
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Escalada en Patagonia
          </h1>
          <p className="mt-4 text-base opacity-75 max-w-2xl leading-relaxed">
            Granito glaciar, basalto volcánico y paredes de 1.200 m. La mayor concentración
            de escalada de calidad en el hemisferio sur.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="text-3xl font-bold">{totalSectores}</p>
              <p className="text-xs opacity-60 uppercase tracking-widest mt-0.5">Sectores</p>
            </div>
            {totalViasCount > 0 && (
              <div>
                <p className="text-3xl font-bold">{totalViasCount}+</p>
                <p className="text-xs opacity-60 uppercase tracking-widest mt-0.5">Vías documentadas</p>
              </div>
            )}
            <div>
              <p className="text-3xl font-bold">{paises.join(" · ")}</p>
              <p className="text-xs opacity-60 uppercase tracking-widest mt-0.5">Países</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros + grilla */}
      <EscaladaClient catalog={ESCALADA_CATALOG} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Escalada en Patagonia — Sectores Argentina y Chile",
            description:
              "Catálogo de sectores de escalada en la Patagonia argentina y chilena: deportiva, alpinismo y boulder.",
            url: "https://outdoorpatagonia.com/escalada",
            hasPart: ESCALADA_CATALOG.map((s) => ({
              "@type": "SportsActivityLocation",
              name: `Escalada ${s.nombre}`,
              url: `https://outdoorpatagonia.com/escalada/${s.slug}`,
              geo: {
                "@type": "GeoCoordinates",
                latitude: s.lat,
                longitude: s.lon,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
