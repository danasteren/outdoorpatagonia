"use client"

import dynamic from "next/dynamic"
import type { FireHotspot } from "@/lib/apis/nasa-firms"

const FireMap = dynamic(() => import("./FireMap").then((m) => m.FireMap), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-muted rounded-xl">
      <span className="text-sm text-muted-foreground animate-pulse">Cargando mapa…</span>
    </div>
  ),
})

export function FireMapClient({ hotspots }: { hotspots: FireHotspot[] }) {
  return <FireMap hotspots={hotspots} />
}
