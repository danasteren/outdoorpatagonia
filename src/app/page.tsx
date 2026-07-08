import Link from "next/link";
import { StatusBoard } from "@/components/status/StatusBoard";
import { EstadoCTA } from "@/components/status/EstadoCTA";
import { OzoneSection } from "@/components/status/OzoneSection";
import { Section } from "@/components/layout";
import { PageShell } from "@/components/layout";
import { Hero } from "@/components/home/Hero";
import {
  PawPrint,
  Leaf,
  Mountain,
  MapPin,
  Pickaxe,
  Activity,
  Telescope,
  ChevronRight,
  Map,
  Users,
  Compass,
  Backpack,
  Flame,
} from "lucide-react";

export const revalidate = 3600;

const CATEGORIES = [
  {
    label: "Astronomía",
    href: "/astronomia",
    icon: Telescope,
    description: "Cielos oscuros, luna y meteoros",
    color: "from-[#0f1d2e] to-[#1a2a4a]",
  },
  {
    label: "Escalada",
    href: "/escalada",
    icon: Pickaxe,
    description: "Sectores y vías de escalada",
    color: "from-[#5a4a3a] to-[var(--color-charcoal)]",
  },
  {
    label: "Estado",
    href: "/estado",
    icon: Activity,
    description: "Clima, incendios y condiciones",
    color: "from-[var(--color-teal)] to-[#1a6a8a]",
  },
  {
    label: "Fauna",
    href: "/fauna",
    icon: PawPrint,
    description: "Aves, mamíferos y vida silvestre",
    color: "from-[var(--color-forest)] to-[var(--color-teal)]",
  },
  {
    label: "Flora",
    href: "/flora",
    icon: Leaf,
    description: "Plantas nativas y ecosistemas",
    color: "from-[var(--color-teal)] to-[var(--color-teal-light)]",
  },
  {
    label: "Itinerario",
    href: "/planear",
    icon: Compass,
    description: "Armá tu recorrido día a día",
    color: "from-[var(--color-terracotta)] to-[#8a4d22]",
  },
  {
    label: "Mapa",
    href: "/mapa",
    icon: Map,
    description: "Todos los puntos de interés en un mapa",
    color: "from-[#1a6a8a] to-[var(--color-charcoal)]",
  },
  {
    label: "Operadores",
    href: "/operadores",
    icon: Users,
    description: "Guías y operadores turísticos",
    color: "from-[var(--color-charcoal)] to-[#3a322f]",
  },
  {
    label: "Parques",
    href: "/parques",
    icon: Mountain,
    description: "Áreas protegidas y reservas",
    color: "from-[var(--color-charcoal)] to-[var(--color-forest)]",
  },
  {
    label: "Qué llevar",
    href: "/planear/que-llevar",
    icon: Backpack,
    description: "Equipo y checklist para tu viaje",
    color: "from-[#8a4d22] to-[var(--color-charcoal)]",
  },
  {
    label: "Senderos",
    href: "/senderos",
    icon: MapPin,
    description: "Trekking y caminatas",
    color: "from-[#3a5a2a] to-[var(--color-forest)]",
  },
  {
    label: "Volcanes",
    href: "/volcanes",
    icon: Flame,
    description: "Alertas volcánicas en tiempo real",
    color: "from-[#8a2a0a] to-[var(--color-terracotta)]",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Categorías */}
      <Section id="categorias" spacing="lg" className="scroll-mt-20">
        <PageShell>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explorá por tema
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(({ label, href, icon: Icon, description, color }, i) => (
              <Link
                key={href}
                href={href}
                style={{ animationDelay: `${i * 70}ms` }}
                className="animate-fade-in-up group relative flex flex-none flex-col items-center basis-[calc((100%-0.75rem)/2)] md:basis-[calc((100%-1.5rem)/3)] lg:basis-[calc((100%-3.75rem)/6)] rounded-2xl border border-border bg-card px-4 py-6 text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-teal)]/50 hover:shadow-hover"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300`}
                  aria-hidden="true"
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-card transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <Icon size={26} className="text-white" strokeWidth={1.5} />
                </div>
                <p className="relative mt-3 inline-flex items-center gap-0.5 font-bold text-sm text-foreground group-hover:text-[var(--color-teal)] transition-colors">
                  {label}
                  <ChevronRight
                    size={13}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </p>
                <p className="relative text-[11px] text-muted-foreground leading-snug mt-1">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Estado en tiempo real */}
      <StatusBoard />
      <EstadoCTA />

      {/* Ozono */}
      <Section spacing="sm">
        <PageShell>
          <OzoneSection />
        </PageShell>
      </Section>
    </div>
  );
}
