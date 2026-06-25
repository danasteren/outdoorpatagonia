import type { Metadata } from "next";
import { QueLevarClient } from "./QueLevarClient";

export const metadata: Metadata = {
  title: "Qué llevar a la Patagonia — Lista por destino y mes",
  description:
    "Qué ropa y equipamiento llevar al Calafate, Chaltén, Ushuaia, Puerto Madryn, Bariloche y más. Seleccioná tu destino y el mes para saber exactamente qué necesitás.",
  keywords: [
    "qué llevar a la patagonia",
    "qué ropa llevar al calafate",
    "qué llevar al chalten",
    "qué ropa llevar a ushuaia",
    "qué llevar a puerto madryn",
    "equipamiento trekking patagonia",
    "lista de ropa patagonia",
  ],
};

export default function QueLevarPage() {
  return (
    <main className="px-4 sm:px-6 py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          <a href="/planear" className="hover:underline">Planear</a>
          {" / "}
          <span>Qué llevar</span>
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
          Qué llevar a la Patagonia
        </h1>
        <p className="text-muted-foreground text-lg">
          Seleccioná tu destino y el mes de viaje para ver la lista exacta de ropa y equipamiento.
        </p>
      </div>
      <QueLevarClient />
    </main>
  );
}
