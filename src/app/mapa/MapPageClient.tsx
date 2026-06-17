"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed left-0 right-0 bottom-0 flex items-center justify-center bg-muted"
        style={{ top: "4rem" }}
      >
        <span className="text-sm text-muted-foreground animate-pulse">
          Cargando mapa…
        </span>
      </div>
    ),
  }
);

export function MapPageClient() {
  return <MapView />;
}
