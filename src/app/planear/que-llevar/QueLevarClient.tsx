"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import {
  type Destino,
  DESTINOS,
  getPackingResult,
} from "@/lib/planner/packing";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DESTINO_KEYS = Object.keys(DESTINOS) as Destino[];

export function QueLevarClient() {
  const searchParams = useSearchParams();
  const destinoParam = searchParams.get("destino") as Destino | null;
  const mesParam = Number(searchParams.get("mes"))

  const [destino, setDestino] = useState<Destino | null>(
    destinoParam && DESTINO_KEYS.includes(destinoParam) ? destinoParam : null
  );
  const [mes, setMes] = useState<number | null>(
    mesParam >= 1 && mesParam <= 12 ? mesParam : null
  );

  const result = destino && mes ? getPackingResult(destino, mes) : null;

  return (
    <div className="space-y-8">

      {/* Destino selector */}
      <section>
        <h2 className="font-heading text-xl text-foreground mb-3">¿A dónde vas?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DESTINO_KEYS.map((key) => {
            const d = DESTINOS[key];
            const sel = destino === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setDestino(key)}
                className={[
                  "text-left rounded-xl border-2 p-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]",
                  sel
                    ? "border-[var(--color-teal)] bg-[var(--color-teal)]/8 text-foreground"
                    : "border-border bg-card text-foreground hover:border-[var(--color-teal)]/40",
                ].join(" ")}
              >
                <div className="text-2xl mb-1">{d.emoji}</div>
                <div className="font-semibold text-sm leading-tight">{d.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{d.subtitulo}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Mes selector */}
      <section>
        <h2 className="font-heading text-xl text-foreground mb-3">¿En qué mes viajás?</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {MONTHS.map((nombre, i) => {
            const m = i + 1;
            const sel = mes === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMes(m)}
                className={[
                  "rounded-lg py-2.5 text-sm font-medium transition-all border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]",
                  sel
                    ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-[var(--color-cream)]"
                    : "border-border text-foreground hover:border-[var(--color-teal)]/40 bg-card",
                ].join(" ")}
              >
                {nombre.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </section>

      {/* Prompt when nothing selected */}
      {!result && (
        <div className="rounded-xl border border-border bg-muted/30 p-8 text-center text-muted-foreground">
          Seleccioná un destino y un mes para ver la lista.
        </div>
      )}

      {/* Results */}
      {result && destino && mes && (
        <div className="space-y-6">

          {/* Clima card */}
          <div className="rounded-xl border border-[var(--color-teal)]/30 bg-[var(--color-teal)]/5 p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-heading text-lg text-foreground">
                  {DESTINOS[destino].label} · {MONTHS[mes - 1]}
                </h3>
                <p className="text-2xl font-bold text-[var(--color-teal)] mt-1">
                  {result.clima.tempMin}° – {result.clima.tempMax}°C
                </p>
                <p className="text-sm text-muted-foreground mt-2">{result.clima.descripcion}</p>
              </div>
            </div>
            {result.clima.advertencia && (
              <div className="mt-4 flex gap-2 items-start rounded-lg bg-[var(--color-terracotta)]/10 border border-[var(--color-terracotta)]/20 px-4 py-3">
                <AlertTriangle size={16} className="text-[var(--color-terracotta)] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{result.clima.advertencia}</p>
              </div>
            )}
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.categorias.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h4 className="font-heading text-base text-foreground mb-3 flex items-center gap-2">
                  <span>{cat.emoji}</span>
                  {cat.titulo}
                </h4>
                <ul className="space-y-2">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex flex-col gap-0.5">
                      <div className="flex items-start gap-2">
                        <span
                          className={[
                            "mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold",
                            item.esencial
                              ? "bg-[var(--color-teal)] text-[var(--color-cream)]"
                              : "bg-muted text-muted-foreground",
                          ].join(" ")}
                        >
                          {item.esencial ? "✓" : "·"}
                        </span>
                        <span className={["text-sm", item.esencial ? "font-medium text-foreground" : "text-foreground"].join(" ")}>
                          {item.label}
                          {item.esencial && (
                            <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-teal)]">
                              esencial
                            </span>
                          )}
                        </span>
                      </div>
                      {item.nota && (
                        <p className="text-xs text-muted-foreground ml-6">{item.nota}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
            <strong className="text-foreground">Regla de oro en la Patagonia:</strong> el clima
            cambia en minutos. Siempre llevá más capas de las que creés necesitar, y la campera
            cortavientos debe ser accesible en todo momento, no en el fondo de la mochila.
          </div>
        </div>
      )}
    </div>
  );
}
