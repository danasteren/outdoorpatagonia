import type { Metadata } from "next";
import { TravelResources } from "@/components/TravelResources";
import { pageAlternates } from "@/lib/hreflang";

const URL = "https://outdoorpatagonia.com/en/resources-traveling-patagonia";
const DESCRIPTION =
  "Official sites for planning your trip to Argentine and Chilean Patagonia: national parks, weather, roads, offline maps and emergency services.";

export const metadata: Metadata = {
  title: "Patagonia Travel Resources: Official Sites and Apps",
  description: DESCRIPTION,
  openGraph: {
    title: "Patagonia Travel Resources: Official Sites and Apps",
    description: DESCRIPTION,
    url: URL,
  },
  alternates: pageAlternates(URL, "/recursos-viaje-patagonia"),
};

export default function ResourcesPage() {
  return <TravelResources lang="en" />;
}
