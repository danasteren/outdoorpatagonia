import type { Metadata } from "next";
import { TravelResources } from "@/components/TravelResources";
import { pageAlternates } from "@/lib/hreflang";

const URL = "https://outdoorpatagonia.com/recursos-viaje-patagonia";
const DESCRIPTION =
  "Sitios oficiales para planificar tu viaje por la Patagonia argentina y chilena: parques nacionales, clima, rutas, mapas offline y emergencias.";

export const metadata: Metadata = {
  title: "Recursos para viajar a la Patagonia: sitios oficiales",
  description: DESCRIPTION,
  openGraph: {
    title: "Recursos para viajar a la Patagonia: sitios oficiales",
    description: DESCRIPTION,
    url: URL,
  },
  alternates: pageAlternates(URL, "/en/resources-traveling-patagonia"),
};

export default function RecursosPage() {
  return <TravelResources lang="es" />;
}
