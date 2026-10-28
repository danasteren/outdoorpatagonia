"use client"

import dynamic from "next/dynamic"

const OzoneMap = dynamic(() => import("./OzoneMap").then((m) => m.OzoneMap), { ssr: false })

// El aviso de carga queda debajo del mapa (el `loading` de dynamic no recibe props
// y el texto depende del idioma): cuando Leaflet monta, lo tapa.
export function OzoneMapClient({ lang = "es" }: { lang?: "es" | "en" }) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl">
        <span className="text-sm text-muted-foreground animate-pulse">
          {lang === "en" ? "Loading map…" : "Cargando mapa…"}
        </span>
      </div>
      <div className="relative h-full">
        <OzoneMap lang={lang} />
      </div>
    </div>
  )
}
