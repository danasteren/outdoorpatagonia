"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <span className="text-sm text-muted-foreground animate-pulse">
          Cargando mapa…
        </span>
      </div>
    ),
  }
);

export function MapPageClient() {
  return (
    <div className="relative h-full w-full">
      <MapView />
    </div>
  );
}
