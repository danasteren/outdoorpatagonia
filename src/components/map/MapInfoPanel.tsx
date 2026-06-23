"use client";

import Link from "next/link";
import { X, ExternalLink, ArrowRight, Flame } from "lucide-react";
import type { MapFeature } from "./types";

const TYPE_LABELS: Record<string, string> = {
  parques:   "Parque Nacional",
  senderos:  "Sendero",
  fauna:     "Fauna",
  escalada:  "Escalada",
  glaciares: "Glaciar",
  incendios: "Foco activo",
  clima:     "Clima",
  punto:     "Punto de interés",
};

interface MapInfoPanelProps {
  feature: MapFeature | null;
  open: boolean;
  onClose: () => void;
}

export function MapInfoPanel({ feature, open, onClose }: MapInfoPanelProps) {
  if (!feature) return null;

  return (
    <>
      {/* Desktop: side panel */}
      <div
        className={[
          "hidden md:flex flex-col absolute top-4 right-14 bottom-4 z-[800]",
          "w-80 bg-card border border-border rounded-xl shadow-modal",
          "transition-all duration-300 ease-out",
          open
            ? "translate-x-0 opacity-100"
            : "translate-x-4 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <PanelContent feature={feature} onClose={onClose} />
      </div>

      {/* Mobile: bottom drawer */}
      <div
        className={[
          "md:hidden absolute inset-x-0 bottom-0 z-[800]",
          "bg-card border-t border-border rounded-t-2xl shadow-modal",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        style={{ maxHeight: "60svh" }}
      >
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-1" />
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(60svh - 20px)" }}
        >
          <PanelContent feature={feature} onClose={onClose} />
        </div>
      </div>
    </>
  );
}

function PanelContent({
  feature,
  onClose,
}: {
  feature: MapFeature;
  onClose: () => void;
}) {
  const isFireAlert = feature.type === "incendios";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 p-4 border-b border-border">
        <div className="flex flex-col gap-0.5 min-w-0">
          {feature.type && (
            <span
              className={[
                "text-[10px] font-semibold uppercase tracking-wider",
                isFireAlert ? "text-red-500" : "text-muted-foreground",
              ].join(" ")}
            >
              {isFireAlert && <Flame size={10} className="inline mr-1" />}
              {TYPE_LABELS[feature.type] ?? feature.type}
            </span>
          )}
          <h2 className="font-heading text-lg font-semibold text-foreground leading-tight truncate">
            {feature.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {feature.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        )}
        {feature.properties &&
          Object.entries(feature.properties).map(([k, v]) =>
            v ? (
              <div key={k} className="flex gap-2 text-xs">
                <span className="text-muted-foreground font-medium whitespace-nowrap">{k}:</span>
                <span className="text-foreground">{String(v)}</span>
              </div>
            ) : null
          )}
      </div>

      {/* CTA */}
      {(feature.pageUrl ?? feature.affiliateLink) && (
        <div className="p-4 border-t border-border flex flex-col gap-2">
          {feature.pageUrl && (
            <Link
              href={feature.pageUrl}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[var(--color-forest)] text-[var(--color-cream)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Ver página completa
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          )}
          {feature.affiliateLink && (
            <a
              href={feature.affiliateLink.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {feature.affiliateLink.label}
              <ExternalLink size={14} strokeWidth={1.5} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
