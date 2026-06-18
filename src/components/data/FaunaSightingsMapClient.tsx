"use client"

import dynamic from "next/dynamic"
import type { SightingWithCoords } from "@/lib/apis/inaturalist"

const FaunaSightingsMap = dynamic(
  () => import("@/components/data/FaunaSightingsMap").then((m) => m.FaunaSightingsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted animate-pulse rounded-xl">
        <span className="text-sm text-muted-foreground">Cargando mapa…</span>
      </div>
    ),
  }
)

export function FaunaSightingsMapClient({
  sightings,
}: {
  sightings: SightingWithCoords[]
}) {
  return <FaunaSightingsMap sightings={sightings} />
}
