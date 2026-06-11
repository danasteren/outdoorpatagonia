import type { Metadata } from "next";
import { novedades, type TipoCambio } from "@/data/novedades";

export const metadata: Metadata = {
  title: "Novedades — Outdoor Patagonia",
  description: "Todo lo que vamos sumando y mejorando en Outdoor Patagonia, versión a versión.",
  alternates: { canonical: "https://outdoorpatagonia.com/novedades" },
};

const tipoBadge: Record<TipoCambio, { label: string; bg: string; text: string }> = {
  nuevo: {
    label: "NUEVO",
    bg: "bg-[var(--color-teal)]",
    text: "text-[var(--color-cream)]",
  },
  mejora: {
    label: "MEJORA",
    bg: "bg-[var(--color-terracotta)]",
    text: "text-[var(--color-cream)]",
  },
  correccion: {
    label: "CORRECCIÓN",
    bg: "bg-[var(--color-charcoal)]",
    text: "text-[var(--color-cream)]",
  },
};

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
      <p className="text-muted-foreground mb-12 max-w-lg">
        Todo lo que vamos sumando y mejorando en Outdoor Patagonia, versión a versión.
      </p>

      <div className="space-y-4">
        {novedades.map((version) => (
          <div
            key={version.numero}
            className="border border-[var(--color-teal)]/25 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 bg-[var(--color-teal)]/5">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold bg-[var(--color-forest)] text-[var(--color-cream)] px-2.5 py-1 rounded-md tracking-wide">
                  V{version.numero}
                </span>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{version.fecha}</p>
                  <p className="font-semibold text-sm text-foreground">{version.titulo}</p>
                </div>
              </div>
              {version.esUltima && (
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest bg-[var(--color-teal-light)]/15 text-[var(--color-teal)] px-3 py-1 rounded-full border border-[var(--color-teal)]/25">
                  Última
                </span>
              )}
            </div>

            <div className="px-5 py-4 space-y-3">
              {version.cambios.map((cambio, i) => {
                const badge = tipoBadge[cambio.tipo];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 leading-5 ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{cambio.texto}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
