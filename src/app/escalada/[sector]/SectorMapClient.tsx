"use client"

import dynamic from "next/dynamic"
import type { MapPunto } from "./SectorMapInner"

const SectorMapInner = dynamic(
  () => import("./SectorMapInner").then((m) => m.SectorMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-sm text-muted-foreground animate-pulse">Cargando mapa…</span>
      </div>
    ),
  }
)

export function SectorMapClient({
  lat,
  lon,
  nombre,
  puntos,
}: {
  lat: number
  lon: number
  nombre: string
  puntos?: MapPunto[]
}) {
  return <SectorMapInner lat={lat} lon={lon} nombre={nombre} puntos={puntos} />
}
