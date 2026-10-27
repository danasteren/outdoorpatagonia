import { Compass, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RECURSOS_PATH, RECURSOS_SECTIONS } from "@/lib/recursos";

const BASE = "https://outdoorpatagonia.com";

const COPY = {
  es: {
    eyebrow: "Recursos",
    title: "Links útiles para viajar por la Patagonia",
    description:
      "Parques nacionales, clima, rutas y emergencias: los sitios oficiales para planificar tu viaje por la Patagonia argentina y chilena.",
    home: "Inicio",
    crumb: "Recursos de viaje",
    homeHref: "/",
  },
  en: {
    eyebrow: "Resources",
    title: "Useful links for traveling Patagonia",
    description:
      "National parks, weather, roads and emergencies: the official sites for planning your trip to Argentine and Chilean Patagonia.",
    home: "Home",
    crumb: "Travel resources",
    homeHref: "/en",
  },
} as const;

/** Body shared by /recursos-viaje-patagonia and /en/resources-traveling-patagonia. */
export function TravelResources({ lang }: { lang: "es" | "en" }) {
  const t = COPY[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.title,
    description: t.description,
    url: `${BASE}${RECURSOS_PATH[lang]}`,
    inLanguage: lang,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: RECURSOS_SECTIONS.flatMap((s) => s.links).map((link, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: link.label[lang],
        url: link.href,
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        icon={Compass}
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        breadcrumb={[{ label: t.home, href: t.homeHref }, { label: t.crumb }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        {RECURSOS_SECTIONS.map((section) => (
          <section key={section.title.es}>
            <h2
              className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {section.title[lang]}
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
                        {link.label[lang]}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">— {link.desc[lang]}</span>
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
