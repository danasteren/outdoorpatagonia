import type { Metadata } from "next";
import { PlanearClient } from "./PlanearClient";

export const metadata: Metadata = {
  title: "Planeá tu viaje a la Patagonia — Outdoor Patagonia",
  description:
    "Creá tu itinerario personalizado para la Patagonia en 5 preguntas: cuándo vas, cuántos días, qué te interesa y tu presupuesto.",
};

export default function PlanearPage() {
  return <PlanearClient />;
}
