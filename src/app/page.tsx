import Link from "next/link";
import { StatusBoard } from "@/components/status/StatusBoard";
import { Section } from "@/components/layout";
import { PageShell } from "@/components/layout";
import {
  Bird,
  Leaf,
  UtensilsCrossed,
  Footprints,
  TreePine,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = [
  {
    label: "Fauna",
    href: "/fauna",
    icon: Bird,
    description: "Aves, mamíferos y vida silvestre",
    color: "from-[var(--color-forest)] to-[var(--color-teal)]",
  },
  {
    label: "Flora",
    href: "/categoria/flora",
    icon: Leaf,
    description: "Plantas nativas y ecosistemas",
    color: "from-[var(--color-teal)] to-[var(--color-teal-light)]",
  },
  {
    label: "Gastronomía",
    href: "/categoria/gastronomia",
    icon: UtensilsCrossed,
    description: "Cocina y productos regionales",
    color: "from-[var(--color-terracotta)] to-[#e09b5a]",
  },
  {
    label: "Senderos",
    href: "/senderos",
    icon: Footprints,
    description: "Trekking y caminatas",
    color: "from-[#3a5a2a] to-[var(--color-forest)]",
  },
  {
    label: "Parques",
    href: "/parques",
    icon: TreePine,
    description: "Áreas protegidas y reservas",
    color: "from-[var(--color-charcoal)] to-[var(--color-forest)]",
  },
  {
    label: "Cultura",
    href: "/categoria/cultura",
    icon: BookOpen,
    description: "Historia, pueblos y tradiciones",
    color: "from-[#7a5c3a] to-[var(--color-charcoal)]",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Section
        spacing="xl"
        className="bg-gradient-to-br from-[var(--color-forest)] via-[#1e4a38] to-[var(--color-teal)] text-[var(--color-cream)]"
      >
        <PageShell>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-teal-light)] mb-4">
              Patagonia
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Naturaleza, cultura e historias del sur del mundo.
            </h1>
            <p className="text-lg text-[var(--color-cream)] opacity-80 mb-8 leading-relaxed">
              Datos en tiempo real, guías de campo y herramientas para explorar la Patagonia.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/mapa"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-teal)] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Ver el mapa
                <ChevronRight size={15} />
              </Link>
              <Link
                href="/planear"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-cream)] border-opacity-40 text-[var(--color-cream)] font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Planear un viaje
              </Link>
            </div>
          </div>
        </PageShell>
      </Section>

      {/* Categorías */}
      <Section spacing="lg">
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

      {/* CTA hacia /estado */}
      <Section spacing="sm">
        <PageShell>
          <div className="flex justify-center">
            <Link
              href="/estado"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-[var(--color-teal)] transition-colors"
            >
              Ver estado completo
              <ChevronRight size={14} />
            </Link>
          </div>
        </PageShell>
      </Section>
    </div>
  );
}
