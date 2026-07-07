"use client";

import dynamic from "next/dynamic";
import {
  MapPin,
  Calendar,
  Compass,
  ShoppingBag,
  Lightbulb,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import type { ItineraryResult, TripFormData } from "@/lib/planner/types";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/primitives";
import { Button } from "@/components/primitives";
import { SaveItineraryButton } from "./SaveItineraryButton";

const ItineraryMapInner = dynamic(
  () =>
    import("./ItineraryMapInner").then((m) => m.ItineraryMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 sm:h-80 flex items-center justify-center bg-muted animate-pulse rounded-xl">
        <span className="text-sm text-muted-foreground">Cargando mapa…</span>
      </div>
    ),
  }
);

const ORIGIN_LABELS: Record<string, string> = {
  chile: "Chile",
  argentina: "Argentina",
  internacional: "Internacional",
};

const INTEREST_LABELS: Record<string, string> = {
  naturaleza: "Naturaleza",
  trekking: "Trekking",
  fotografia: "Fotografía",
  gastronomia: "Gastronomía",
  fauna: "Vida silvestre",
};

const BUDGET_LABELS: Record<string, string> = {
  economico: "Económico",
  moderado: "Moderado",
  premium: "Premium",
};

const MONTH_NAMES = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

interface ItineraryOutputProps {
  result: ItineraryResult;
  form: TripFormData;
  onReset: () => void;
}

export function ItineraryOutput({ result, form, onReset }: ItineraryOutputProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-24">
      {/* Floating save button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-50">
        <SaveItineraryButton form={form} result={result} floating />
      </div>

      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
          {result.title}
        </h1>
        <p className="text-muted-foreground">{result.subtitle}</p>

        {/* Chips resumen */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Chip>{MONTH_NAMES[form.month]} {form.year}</Chip>
          <Chip>{form.days} días</Chip>
          <Chip>{ORIGIN_LABELS[form.origin]}</Chip>
          {form.interests.map((i) => (
            <Chip key={i}>{INTEREST_LABELS[i]}</Chip>
          ))}
          <Chip>{BUDGET_LABELS[form.budget]}</Chip>
        </div>
      </div>

      {/* Mapa embebido */}
      <div className="h-64 sm:h-80 rounded-xl overflow-hidden shadow-card">
        <ItineraryMapInner
          days={result.days}
          center={result.mapCenter}
          zoom={result.mapZoom}
        />
      </div>

      {/* Itinerario día a día */}
      <Section icon={<Calendar size={18} />} title="Itinerario día a día">
        <div className="space-y-3">
          {result.days.map((day) => (
            <div
              key={day.day}
              className="flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)] flex items-center justify-center text-sm font-bold">
                {day.day}
              </div>
              <div className="flex-1 min-w-0 pb-3 border-b border-border last:border-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                  <MapPin size={11} strokeWidth={1.5} />
                  {day.location}
                </div>
                <p className="font-medium text-sm text-foreground">{day.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  {day.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Consejos */}
      {result.tips.length > 0 && (
        <Section icon={<Lightbulb size={18} />} title="Consejos clave">
          <ul className="space-y-2">
            {result.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-[var(--color-teal)] mt-0.5 flex-shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Tours */}
      {result.tours.length > 0 && (
        <Section icon={<Compass size={18} />} title="Tours recomendados">
          <div className="grid gap-3 sm:grid-cols-2">
            {result.tours.map((tour, i) => (
              <Card key={i} variant="elevated">
                <CardBody className="p-4 space-y-1.5">
                  <p className="font-semibold text-sm text-foreground leading-tight">
                    {tour.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={10} strokeWidth={1.5} />
                    {tour.location} · {tour.duration}
                  </div>
                  <p className="text-xs text-muted-foreground">{tour.description}</p>
                  <a
                    href={tour.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-teal)] hover:underline mt-1"
                  >
                    Ver en GetYourGuide
                    <ExternalLink size={11} />
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Equipamiento */}
      {result.gear.length > 0 && (
        <Section icon={<ShoppingBag size={18} />} title="Equipamiento sugerido">
          <div className="grid gap-3 sm:grid-cols-2">
            {result.gear.map((item, i) => (
              <Card key={i} variant="elevated">
                <CardBody className="p-4 space-y-1">
                  <p className="font-semibold text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-teal)] hover:underline mt-1"
                  >
                    Ver en Amazon
                    <ExternalLink size={11} />
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Reset */}
      <div className="flex justify-center pt-4">
        <Button variant="brand-secondary" onClick={onReset}>
          <ArrowLeft size={16} />
          Planear otro viaje
        </Button>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <span className="text-[var(--color-teal)]">{icon}</span>
        <h2 className="font-heading text-xl text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
      {children}
    </span>
  );
}
