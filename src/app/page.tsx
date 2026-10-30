import type { Metadata } from "next";
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
import { getHomeTopics } from "@/lib/home-topics";
import { pageAlternates } from "@/lib/hreflang";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: pageAlternates("/", "/en"),
};

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
            {getHomeTopics("es").map((c, i) => (
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
