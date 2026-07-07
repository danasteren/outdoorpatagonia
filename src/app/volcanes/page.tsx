import type { Metadata } from "next"
import { Flame } from "lucide-react"
import { fetchVolcanes } from "@/lib/apis/sernageomin"
import { Section, PageShell } from "@/components/layout"
import { VolcanesSection } from "@/components/status/VolcanesSection"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "Volcanes activos en Patagonia — alertas en tiempo real",
  description:
    "Niveles de alerta volcánica en tiempo real para los principales volcanes de la Patagonia chilena y argentina: Villarrica, Copahue, Calbuco, Hudson y más. Datos de SERNAGEOMIN.",
  openGraph: {
    title: "Volcanes activos en Patagonia — alertas SERNAGEOMIN",
    description:
      "Monitoreo en tiempo real de 12 volcanes patagónicos: niveles Verde, Amarillo, Naranja y Rojo según SERNAGEOMIN RNVV.",
    url: "https://outdoorpatagonia.com/volcanes",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Volcanes activos en Patagonia" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://outdoorpatagonia.com/volcanes" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Volcanes activos en Patagonia",
  description:
    "Monitoreo de niveles de alerta volcánica en los principales volcanes de la Patagonia chilena y argentina.",
  url: "https://outdoorpatagonia.com/volcanes",
  about: {
    "@type": "Thing",
    name: "Volcanes patagónicos",
    description:
      "Los volcanes de la Patagonia forman parte del Cinturón de Fuego del Pacífico. Chile concentra la mayor cantidad de volcanes activos de América del Sur, monitoreados por SERNAGEOMIN mediante la Red Nacional de Vigilancia Volcánica (RNVV).",
  },
}

export default async function VolcanesPage() {
  const volcanes = await fetchVolcanes()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #3c0a00 0%, #6b1a05 60%, #8a2a0a 100%)" }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Flame size={22} strokeWidth={1.5} className="opacity-60" />
            <span className="text-sm uppercase tracking-widest opacity-60">
              Monitoreo volcánico
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Volcanes de la Patagonia
          </h1>
          <p className="mt-3 text-white/70 max-w-xl text-base leading-relaxed">
            Niveles de alerta en tiempo real para 12 volcanes patagónicos según SERNAGEOMIN.
            De Verde (sin actividad anómala) a Rojo (erupción en curso).
          </p>
        </div>
      </div>

      <Section spacing="lg">
        <PageShell>
          <VolcanesSection data={volcanes} />

          {/* Contexto / GEO */}
          <div className="mt-10 prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h2 className="text-base font-bold text-foreground">
              Volcanes patagónicos monitoreados
            </h2>
            <p>
              La Patagonia alberga algunos de los volcanes más activos del planeta. El{" "}
              <strong>Villarrica</strong> (39°S, Chile) es uno de los tres volcanes permanentemente
              activos de América del Sur, con una columna de lava visible desde la cumbre. El{" "}
              <strong>Copahue</strong> (37°S, en la frontera Chile-Argentina) presenta actividad
              fumarólica frecuente y erupciones freáticas periódicas.
            </p>
            <p>
              El <strong>Calbuco</strong> sorprendió en 2015 con una erupción explosiva tras 43 años
              de inactividad; el <strong>Chaitén</strong> hizo lo propio en 2008 con una erupción
              pliniana que destruyó la ciudad homónima. El <strong>Hudson</strong> (45°S) es el más
              austral del grupo y registró la mayor erupción del siglo XX en el Hemisferio Sur en 1991.
            </p>
            <p>
              SERNAGEOMIN monitorea estos volcanes mediante redes sísmicas, GPS, cámaras y sensores de
              gases. Los niveles de alerta se actualizan cuando hay cambios en la actividad. Para
              planificar actividades en zonas volcánicas, verificar siempre el nivel vigente.
            </p>
          </div>
        </PageShell>
      </Section>
    </>
  )
}
