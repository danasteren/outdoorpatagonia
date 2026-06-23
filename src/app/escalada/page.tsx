import type { Metadata } from "next"
import { Mountain } from "lucide-react"
import { ESCALADA_CATALOG } from "@/lib/escalada/catalog"
import { EscaladaClient } from "./EscaladaClient"

export const metadata: Metadata = {
  title: "Escalada en Patagonia — Sectores Argentina y Chile | Outdoor Patagonia",
  description:
    "Guía de escalada en Patagonia: Fitz Roy, Cerro Torre, Torres del Paine, Cochamó, Piedra Parada y más. Grados, temporada, rutas destacadas y condiciones en vivo.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/escalada",
  },
}

export default function EscaladaIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-6 h-6 opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">
              Guía de escalada
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Escalada en Patagonia
          </h1>
          <p className="mt-4 text-lg opacity-75 max-w-2xl">
            {ESCALADA_CATALOG.length} sectores en Argentina y Chile: granito, basalto, big wall,
            deporte y alpinismo. Grados, rutas clásicas y condiciones de viento en vivo.
          </p>
        </div>
      </div>

      {/* Filtros + grilla (client component) */}
      <EscaladaClient catalog={ESCALADA_CATALOG} />
    </div>
  )
}
