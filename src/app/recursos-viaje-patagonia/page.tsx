import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Links y Recursos para Viajar por la Patagonia — Outdoor Patagonia",
  description:
    "Todo lo que necesitás para planificar tu viaje por la Patagonia: transporte, parques nacionales, clima, rutas y teléfonos de emergencia.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/recursos-viaje-patagonia",
    languages: { en: "https://outdoorpatagonia.com/en/resources-traveling-patagonia" },
  },
};

type Link = { label: string; href: string; desc: string };
type Section = { title: string; links: Link[] };

const sections: Section[] = [
  {
    title: "Argentina",
    links: [
      { label: "La Guía Esqala", href: "https://esqala.com.ar/", desc: "Guía de escalada de Esquel y La Comarca." },
      { label: "Guía Turística del Corredor de Los Andes", href: "https://comarcauna.com.ar/", desc: "Información sobre la Comarca Andina." },
      { label: "Ruta 0", href: "https://www.ruta0.com", desc: "Calculá distancias, costos de combustible y mapas de Argentina." },
      { label: "Administración de Parques Nacionales", href: "https://www.argentina.gob.ar/parquesnacionales", desc: "Información oficial sobre parques nacionales argentinos." },
      { label: "SMN — Servicio Meteorológico Nacional", href: "https://www.smn.gob.ar/", desc: "Pronóstico del tiempo para toda la Argentina." },
    ],
  },
  {
    title: "Chile",
    links: [
      { label: "Patagonia Chile", href: "https://www.patagonia-chile.com/", desc: "Información sobre turismo y actividades en la Patagonia chilena." },
      { label: "CONAF — Corporación Nacional Forestal", href: "https://www.conaf.cl/", desc: "Parques nacionales y senderos en Chile." },
      { label: "Sernatur", href: "https://www.sernatur.cl/", desc: "Información turística oficial de Chile." },
      { label: "Visit Chile", href: "https://www.visitchile.com/", desc: "Guía turística completa para destinos en Chile." },
    ],
  },
  {
    title: "Recursos Generales",
    links: [
      { label: "Waze", href: "https://www.waze.com/", desc: "Navegación en tiempo real para rutas en Argentina y Chile." },
      { label: "Maps.me", href: "https://maps.me/", desc: "Mapas offline ideales para zonas sin señal." },
      { label: "iNaturalist", href: "https://www.inaturalist.org/", desc: "Identificá fauna y flora en campo con ayuda de la comunidad." },
      { label: "Wikiloc", href: "https://es.wikiloc.com/", desc: "Rutas y senderos registrados por viajeros en toda la Patagonia." },
    ],
  },
  {
    title: "Emergencias y seguridad",
    links: [
      { label: "Gendarmería Nacional Argentina", href: "https://www.gendarmeria.gob.ar/", desc: "Control fronterizo y asistencia en zona de frontera." },
      { label: "Carabineros de Chile", href: "https://www.carabineros.cl/", desc: "Policía y emergencias en territorio chileno." },
      { label: "Cruz Roja Argentina", href: "https://cruzroja.org.ar/", desc: "Asistencia humanitaria y emergencias." },
    ],
  },
];

export default function RecursosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Recursos
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Links útiles para viajar por la Patagonia
      </h1>
      <p className="text-muted-foreground mb-12 max-w-2xl leading-relaxed">
        Todo lo que necesitás para planificar tu viaje: transporte, parques nacionales, clima,
        rutas y teléfonos de emergencia.
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
