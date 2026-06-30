"use client"

import dynamic from "next/dynamic"

const OzoneMap = dynamic(() => import("./OzoneMap").then((m) => m.OzoneMap), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-muted rounded-xl">
      <span className="text-sm text-muted-foreground animate-pulse">Cargando mapa…</span>
    </div>
  ),
})

export function OzoneMapClient() {
  return <OzoneMap />
}
