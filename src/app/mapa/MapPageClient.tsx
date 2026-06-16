"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center bg-muted"
        style={{ height: "70vh" }}
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
