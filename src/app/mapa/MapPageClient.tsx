"use client";

import dynamic from "next/dynamic";
import { Map as MapIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed left-0 right-0 bottom-0 flex items-center justify-center bg-muted"
        style={{ top: "8rem" }}
      >
        <span className="text-sm text-muted-foreground animate-pulse">
          Cargando mapa…
        </span>
      </div>
    ),
  }
);

export function MapPageClient() {
  return (
    <>
      <PageHero
        icon={MapIcon}
        eyebrow="Mapa"
        title="Mapa interactivo de la Patagonia"
        description="Parques, senderos, fauna y clima en un solo mapa"
        tone="teal"
        compact
      />
      <MapView />
    </>
  );
}
