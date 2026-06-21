import type { Metadata } from "next";
import NovedadesAccordion from "./NovedadesAccordion";

export const metadata: Metadata = {
  title: "Novedades — Outdoor Patagonia",
  description: "Todo lo que vamos sumando y mejorando en Outdoor Patagonia, versión a versión.",
  alternates: { canonical: "https://outdoorpatagonia.com/novedades" },
};

const legend = [
  { label: "NUEVO", className: "border border-[var(--color-teal)] text-[var(--color-teal)] bg-[var(--color-teal)]/10" },
  { label: "MEJORA", className: "border border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10" },
  { label: "CORRECCIÓN", className: "border border-rose-400 text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-500" },
];

export default function NovedadesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)] mb-3">
        Actualizaciones
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Novedades
      </h1>
      <p className="text-muted-foreground mb-8 max-w-lg">
        Todo lo que vamos sumando y mejorando en Outdoor Patagonia, versión a versión.
      </p>

      <div className="flex items-center gap-2 mb-10">
        {legend.map((badge) => (
          <span
            key={badge.label}
            className={`text-[9px] font-bold px-2.5 py-1 rounded-full leading-5 tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
        ))}
      </div>

      <NovedadesAccordion />
    </div>
  );
}
