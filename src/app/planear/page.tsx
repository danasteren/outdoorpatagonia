import type { Metadata } from "next";
import Link from "next/link";
import { Backpack, ChevronRight } from "lucide-react";
import { PlanearClient } from "./PlanearClient";

export const metadata: Metadata = {
  title: "Planeá tu viaje a la Patagonia — Outdoor Patagonia",
  description:
    "Creá tu itinerario personalizado para la Patagonia en 5 preguntas: cuándo vas, cuántos días, qué te interesa y tu presupuesto.",
};

export default function PlanearPage() {
  return (
    <>
      <div className="px-4 sm:px-6 pt-6 pb-2 max-w-xl mx-auto w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">
          Herramientas
        </p>
        <Link
          href="/planear/que-llevar"
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card hover:border-[var(--color-teal)]/40 hover:bg-muted/40 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--color-teal)]/10 flex items-center justify-center shrink-0">
            <Backpack size={15} strokeWidth={1.75} className="text-[var(--color-teal)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">¿Qué llevar?</p>
            <p className="text-xs text-muted-foreground">Lista de ropa y equipamiento por destino y mes</p>
          </div>
          <ChevronRight size={15} strokeWidth={1.75} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
        </Link>
      </div>
      <PlanearClient />
    </>
  );
}
