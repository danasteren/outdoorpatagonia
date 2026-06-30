import Link from "next/link";
import { StatusBoard } from "@/components/status/StatusBoard";
import { EstadoCTA } from "@/components/status/EstadoCTA";
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
} from "lucide-react";

export const revalidate = 3600;

const CATEGORIES = [
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
    label: "Parques",
    href: "/parques",
    icon: Mountain,
    description: "Áreas protegidas y reservas",
    color: "from-[var(--color-charcoal)] to-[var(--color-forest)]",
  },
  {
    label: "Senderos",
    href: "/senderos",
    icon: MapPin,
    description: "Trekking y caminatas",
    color: "from-[#3a5a2a] to-[var(--color-forest)]",
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
    label: "Astronomía",
    href: "/astronomia",
    icon: Telescope,
    description: "Cielos oscuros, luna y meteoros",
    color: "from-[#0f1d2e] to-[#1a2a4a]",
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map(({ label, href, icon: Icon, description, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border hover:border-[var(--color-teal)] hover:shadow-lg transition-all duration-200"
              >
                <div
                  className={`bg-gradient-to-br ${color} h-20 flex items-center justify-center`}
                >
                  <Icon size={28} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="p-3 bg-card flex-1">
                  <p className="font-bold text-sm text-foreground group-hover:text-[var(--color-teal)] transition-colors">
                    {label}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Estado en tiempo real */}
      <StatusBoard />
      <EstadoCTA />
    </div>
  );
}
