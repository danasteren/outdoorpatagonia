"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { novedades, type TipoCambio } from "@/data/novedades";

const tipoBadge: Record<TipoCambio, { label: string; className: string }> = {
  nuevo: {
    label: "NUEVO",
    className:
      "border border-[var(--color-teal)] text-[var(--color-teal)] bg-[var(--color-teal)]/10",
  },
  mejora: {
    label: "MEJORA",
    className:
      "border border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10",
  },
  correccion: {
    label: "CORRECCIÓN",
    className:
      "border border-rose-400 text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-500",
  },
};

export default function NovedadesAccordion() {
  const [openVersions, setOpenVersions] = useState<Set<string>>(
    () => new Set(novedades.filter((v) => v.esUltima).map((v) => v.numero))
  );

  function toggle(numero: string) {
    setOpenVersions((prev) => {
      const next = new Set(prev);
      if (next.has(numero)) {
        next.delete(numero);
      } else {
        next.add(numero);
      }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {novedades.map((version) => {
        const isOpen = openVersions.has(version.numero);
        return (
          <div
            key={version.numero}
            className="border border-[var(--color-teal)]/25 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(version.numero)}
              className="w-full flex items-center justify-between px-5 py-4 bg-[var(--color-teal)]/5 hover:bg-[var(--color-teal)]/10 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold bg-[var(--color-forest)] text-[var(--color-cream)] px-2.5 py-1 rounded-md tracking-wide">
                  V{version.numero}
                </span>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{version.fecha}</p>
                  <p className="font-semibold text-sm text-foreground">{version.titulo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                {version.esUltima && (
                  <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest bg-[var(--color-teal-light)]/15 text-[var(--color-teal)] px-3 py-1 rounded-full border border-[var(--color-teal)]/25">
                    Última 🚀
                  </span>
                )}
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 py-4 space-y-3">
                {version.cambios.map((cambio, i) => {
                  const badge = tipoBadge[cambio.tipo];
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className={`shrink-0 text-[9px] font-bold px-2.5 py-0.5 rounded-full mt-0.5 leading-5 tracking-wide ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">{cambio.texto}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
