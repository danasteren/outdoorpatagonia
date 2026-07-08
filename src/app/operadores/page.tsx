import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getAllOperators } from "@/lib/operators/queries";
import { OperadoresClient } from "./OperadoresClient";
import { OperadorForm } from "@/components/OperadorForm";

export const metadata: Metadata = {
  title: "Directorio de Operadores — Outdoor Patagonia",
  description:
    "Encontrá operadores turísticos, guías y agencias de aventura en la Patagonia argentina y chilena. Trekking, kayak, cabalgatas, escalada y más.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/operadores",
  },
};

export default async function OperadoresPage() {
  const operators = await getAllOperators();

  return (
    <div className="min-h-screen">
      <PageHero
        icon={Briefcase}
        eyebrow="Directorio"
        title="Operadores de Patagonia"
        description="Agencias, guías y operadores turísticos especializados en la Patagonia argentina y chilena. Desde trekking en Torres del Paine hasta expediciones en Tierra del Fuego."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Operadores" }]}
        tone="terracotta"
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Listado con filtros (client) */}
      <OperadoresClient operators={operators} />

      {/* CTA para operadores */}
      <div className="mt-16 border border-dashed border-border rounded-2xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
            ¿Sos operador?
          </p>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Sumá tu empresa al directorio
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md">
            Llegás a viajeros que ya están planificando su viaje a Patagonia.
            Completá el formulario y te contactamos.
          </p>

          <OperadorForm />
        </div>
      </div>
      </div>
    </div>
  );
}
