import type { Metadata } from "next"
import Link from "next/link"
import { Droplets } from "lucide-react"
import { TERMAS_CATALOG } from "@/lib/termas/catalog"

export const metadata: Metadata = {
  title: "Termas de la Patagonia — Aguas Termales en Chile y Argentina",
  description:
    "Guía de termas patagónicas: Termas Geométricas, Puyehue y más aguas termales naturales en Chile y Argentina, con ubicación, temperatura del agua y cómo llegar.",
  openGraph: {
    title: "Termas de la Patagonia — Aguas Termales en Chile y Argentina",
    description:
      "Guía de termas patagónicas: ubicación, temperatura del agua, horarios y cómo llegar a cada complejo termal.",
    url: "https://outdoorpatagonia.com/termas",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Termas de la Patagonia" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://outdoorpatagonia.com/termas" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Termas de la Patagonia",
  description:
    "Guía de aguas termales naturales en la Patagonia chilena y argentina, muchas de origen volcánico.",
  url: "https://outdoorpatagonia.com/termas",
  about: {
    "@type": "Thing",
    name: "Termas patagónicas",
    description:
      "La actividad volcánica de la Patagonia alimenta decenas de fuentes termales naturales, desde complejos diseñados como las Termas Geométricas hasta pozones silvestres.",
  },
}

export default function TermasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen">
        <div style={{ background: "linear-gradient(135deg, #0a2233 0%, #103a4d 60%, #0a2233 100%)" }} className="text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
            <div className="flex items-center gap-3 mb-4">
              <Droplets size={22} strokeWidth={1.5} className="opacity-60" />
              <span className="text-sm uppercase tracking-widest opacity-60">Aguas termales</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Termas de la Patagonia
            </h1>
            <p className="mt-3 text-white/70 max-w-xl text-base leading-relaxed">
              Fuentes termales naturales en Chile y Argentina, muchas alimentadas por la misma
              actividad volcánica que define el paisaje patagónico.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TERMAS_CATALOG.map((t) => (
              <Link
                key={t.slug}
                href={`/termas/${t.slug}`}
                className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-[var(--color-teal)] bg-card hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base leading-snug group-hover:text-[var(--color-teal)] transition-colors">
                      {t.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.region}</p>
                  </div>
                  <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center ring-2 ring-border bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
                    <Droplets size={18} strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{t.temperaturaAgua}</p>
                <span className="text-xs font-medium text-[var(--color-teal)] mt-auto">Ver más →</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h2 className="text-base font-bold text-foreground">Termas de origen volcánico</h2>
            <p>
              La Patagonia se asienta sobre el Cinturón de Fuego del Pacífico, y buena parte de sus
              termas están directamente conectadas a volcanes activos: las Termas Geométricas están
              dentro del Parque Nacional Villarrica, a metros del volcán homónimo, mientras que el
              complejo de Copahue-Caviahue se alimenta de la misma cámara magmática que el volcán
              Copahue, en la frontera entre Chile y Argentina.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
