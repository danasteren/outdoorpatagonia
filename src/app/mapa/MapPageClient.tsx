"use client";

import dynamic from "next/dynamic";
import { Map as MapIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 min-h-0 flex items-center justify-center bg-muted">
        <span className="text-sm text-muted-foreground animate-pulse">
          Cargando mapa…
        </span>
      </div>
    ),
  }
);

// data-map-fullscreen activa el alto de viewport de globals.css: header con su
// alto real + este bloque llenando el resto.
export function MapPageClient() {
  return (
    <div data-map-fullscreen className="flex-1 min-h-0 flex flex-col">
      {/* En mobile el hero queda solo para lectores de pantalla y buscadores (h1) */}
      <div className="max-md:sr-only">
        <PageHero
          icon={MapIcon}
          eyebrow="Mapa"
          title="Mapa interactivo de la Patagonia"
          description="Parques, senderos, fauna y clima en un solo mapa"
          tone="teal"
          compact
        />
      </div>
      <MapView />
    </div>
  );
}
