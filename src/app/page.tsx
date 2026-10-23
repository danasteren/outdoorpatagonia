import { StatusBoard } from "@/components/status/StatusBoard";
import { EstadoCTA } from "@/components/status/EstadoCTA";
import { OzoneSection } from "@/components/status/OzoneSection";
import { Section } from "@/components/layout";
import { PageShell } from "@/components/layout";
import { Hero } from "@/components/home/Hero";
import { AhoraSection } from "@/components/home/AhoraSection";
import { EscaladaSection } from "@/components/home/EscaladaSection";
import { DestinosSection } from "@/components/home/DestinosSection";
import { TopicCard } from "@/components/home/TopicCard";
import {
  PawPrint,
  Leaf,
  Mountain,
  MapPin,
  Pickaxe,
  Activity,
  Telescope,
  Map,
  Users,
  Compass,
  Backpack,
  Flame,
  Signpost,
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
    label: "Destinos",
    href: "/destinos",
    icon: Signpost,
    description: "Guías de viaje por destino",
    color: "from-[#0a2233] to-[#103a4d]",
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
      <AhoraSection />

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
            {CATEGORIES.map((c, i) => (
              <TopicCard key={c.href} {...c} index={i} />
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Guías de destino */}
      <DestinosSection />

      {/* Escalada */}
      <EscaladaSection />

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
