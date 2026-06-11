import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Useful Links and Resources for Traveling Patagonia — Outdoor Patagonia",
  description:
    "Everything you need to plan your trip to Patagonia: transport, national parks, weather, routes and emergency contacts.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en/resources-traveling-patagonia",
    languages: { es: "https://outdoorpatagonia.com/recursos-viaje-patagonia" },
  },
};

type Link = { label: string; href: string; desc: string };
type Section = { title: string; links: Link[] };

const sections: Section[] = [
  {
    title: "Argentina",
    links: [
      { label: "La Guía Esqala", href: "https://esqala.com.ar/", desc: "Climbing guide for Esquel and La Comarca." },
      { label: "Corredor de Los Andes Tourism Guide", href: "https://comarcauna.com.ar/", desc: "Information on the Comarca Andina region." },
      { label: "Ruta 0", href: "https://www.ruta0.com", desc: "Calculate distances, fuel costs and Argentina road maps." },
      { label: "National Parks Administration", href: "https://www.argentina.gob.ar/parquesnacionales", desc: "Official information on Argentine national parks." },
      { label: "SMN — National Meteorological Service", href: "https://www.smn.gob.ar/", desc: "Weather forecast for all of Argentina." },
    ],
  },
  {
    title: "Chile",
    links: [
      { label: "Patagonia Chile", href: "https://www.patagonia-chile.com/", desc: "Tourism and activities in Chilean Patagonia." },
      { label: "CONAF — National Forestry Corporation", href: "https://www.conaf.cl/", desc: "National parks and trails in Chile." },
      { label: "Sernatur", href: "https://www.sernatur.cl/", desc: "Official tourism information for Chile." },
      { label: "Visit Chile", href: "https://www.visitchile.com/", desc: "Complete travel guide for destinations in Chile." },
    ],
  },
  {
    title: "General Resources",
    links: [
      { label: "Waze", href: "https://www.waze.com/", desc: "Real-time navigation for routes in Argentina and Chile." },
      { label: "Maps.me", href: "https://maps.me/", desc: "Offline maps — ideal for areas without signal." },
      { label: "iNaturalist", href: "https://www.inaturalist.org/", desc: "Identify wildlife and plants in the field with community help." },
      { label: "Wikiloc", href: "https://es.wikiloc.com/", desc: "Trails and routes logged by travelers across Patagonia." },
    ],
  },
  {
    title: "Emergency & Safety",
    links: [
      { label: "Argentine National Gendarmerie", href: "https://www.gendarmeria.gob.ar/", desc: "Border control and assistance in frontier areas." },
      { label: "Carabineros de Chile", href: "https://www.carabineros.cl/", desc: "Police and emergency services in Chile." },
      { label: "Argentine Red Cross", href: "https://cruzroja.org.ar/", desc: "Humanitarian assistance and emergency response." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Resources
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Useful links for traveling Patagonia
      </h1>
      <p className="text-muted-foreground mb-12 max-w-2xl leading-relaxed">
        Everything you need to plan your trip: transport, national parks, weather, routes and
        emergency contacts.
      </p>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2
              className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-[var(--color-teal)] transition-colors"
                  >
                    <ExternalLink
                      size={16}
                      className="mt-0.5 shrink-0 text-[var(--color-teal)] group-hover:scale-110 transition-transform"
                    />
                    <span>
                      <span className="font-medium text-foreground group-hover:text-[var(--color-teal)] transition-colors">
                        {link.label}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">— {link.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
