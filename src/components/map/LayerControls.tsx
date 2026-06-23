"use client";

import { Mountain, Footprints, Bird, Cloud, Pickaxe, Snowflake, Flame, Map, Satellite, Search } from "lucide-react";
import type { ActiveLayers, BasemapId, LayerId } from "./types";
import { PARQUES, SENDEROS, FAUNA, ESCALADA, GLACIARES, CLIMA } from "./map-data";

const LAYER_CONFIG: {
  id: LayerId;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  count: number | null;
}[] = [
  { id: "parques",   label: "Parques",   icon: Mountain,  count: PARQUES.length },
  { id: "senderos",  label: "Senderos",  icon: Footprints, count: SENDEROS.length },
  { id: "fauna",     label: "Fauna",     icon: Bird,       count: FAUNA.length },
  { id: "escalada",  label: "Escalada",  icon: Pickaxe,    count: ESCALADA.length },
  { id: "glaciares", label: "Glaciares", icon: Snowflake,  count: GLACIARES.length },
  { id: "incendios", label: "Incendios", icon: Flame,      count: null },
  { id: "clima",     label: "Clima",     icon: Cloud,      count: CLIMA.length },
];

const LAYER_COLORS: Record<LayerId, string> = {
  parques:   "var(--color-forest)",
  senderos:  "#C2762A",
  fauna:     "#6B3FA0",
  escalada:  "#9B2C2C",
  glaciares: "#2563EB",
  incendios: "#DC2626",
  clima:     "#2A7EC2",
};

interface LayerControlsProps {
  activeLayers: ActiveLayers;
  onToggle: (id: LayerId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  basemap: BasemapId;
  onBasemapChange: (b: BasemapId) => void;
  fireCount?: number;
}

export function LayerControls({
  activeLayers,
  onToggle,
  searchQuery,
  onSearchChange,
  basemap,
  onBasemapChange,
  fireCount,
}: LayerControlsProps) {
  return (
    <div className="flex flex-col gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-1.5 shadow-card min-w-[44px]">
      {/* Search */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-muted/60">
        <Search size={13} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar…"
          className="hidden sm:block bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-28"
        />
      </div>

      <div className="w-full h-px bg-border my-0.5" />

      {/* Layer toggles */}
      {LAYER_CONFIG.map(({ id, label, icon: Icon, count }) => {
        const active = activeLayers[id];
        const displayCount = id === "incendios" ? fireCount : count;
        const color = LAYER_COLORS[id];
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            title={label}
            className={[
              "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all",
              active
                ? "text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            ].join(" ")}
            style={active ? { backgroundColor: color } : undefined}
          >
            <Icon size={15} strokeWidth={active ? 2 : 1.5} />
            <span className="hidden sm:flex items-center gap-1.5 flex-1">
              {label}
              {displayCount != null && (
                <span
                  className={[
                    "ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums",
                    active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {displayCount}
                </span>
              )}
              {id === "incendios" && fireCount == null && active && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white animate-pulse">
                  …
                </span>
              )}
            </span>
          </button>
        );
      })}

      <div className="w-full h-px bg-border my-0.5" />

      {/* Basemap toggle */}
      <div className="flex gap-1 p-0.5">
        <button
          onClick={() => onBasemapChange("street")}
          title="Mapa callejero"
          className={[
            "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all",
            basemap === "street"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          ].join(" ")}
        >
          <Map size={13} strokeWidth={1.5} />
          <span className="hidden sm:inline">Mapa</span>
        </button>
        <button
          onClick={() => onBasemapChange("satellite")}
          title="Vista satelital"
          className={[
            "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all",
            basemap === "satellite"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          ].join(" ")}
        >
          <Satellite size={13} strokeWidth={1.5} />
          <span className="hidden sm:inline">Satélite</span>
        </button>
      </div>
    </div>
  );
}
