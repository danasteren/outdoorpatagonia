import type { Metadata } from "next";
import { MapPageClient } from "./MapPageClient";

export const metadata: Metadata = {
  title: "Mapa interactivo — Outdoor Patagonia",
  description:
    "Explorá la Patagonia: parques nacionales, senderos, fauna y condiciones climáticas en tiempo real.",
};

export default function MapaPage() {
  return (
    <div className="h-full overflow-hidden relative">
      <MapPageClient />
    </div>
  );
}
