"use client";

import { useState } from "react";
import {
  Mountain,
  Footprints,
  Camera,
  UtensilsCrossed,
  Bird,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Globe,
} from "lucide-react";
import { WizardProgress } from "@/components/planner/WizardProgress";
import { ItineraryOutput } from "@/components/planner/ItineraryOutput";
import { Button } from "@/components/primitives";
import { generateItinerary } from "@/lib/planner/generate";
import type { TripFormData, Origin, Interest, Budget, ItineraryResult } from "@/lib/planner/types";

// ─── constants ───────────────────────────────────────────────────────────────

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const THIS_YEAR = new Date().getFullYear();

const DAYS_OPTIONS: { value: number; label: string; description: string }[] = [
  { value: 5,  label: "3–5 días",   description: "Escapada corta o puente" },
  { value: 8,  label: "6–9 días",   description: "Una semana completa" },
  { value: 12, label: "10–14 días", description: "Dos semanas" },
  { value: 18, label: "15+ días",   description: "Viaje largo" },
];

const ORIGINS: { value: Origin; label: string; sublabel: string; icon: React.ReactNode }[] = [
  {
    value: "chile",
    label: "Chile",
    sublabel: "Vía Santiago → Punta Arenas o Puerto Natales",
    icon: <span className="text-2xl">🇨🇱</span>,
  },
  {
    value: "argentina",
    label: "Argentina",
    sublabel: "Vía Buenos Aires → El Calafate o Ushuaia",
    icon: <span className="text-2xl">🇦🇷</span>,
  },
  {
    value: "internacional",
    label: "Internacional",
    sublabel: "Vuelo internacional con conexión",
    icon: <Globe size={24} className="text-muted-foreground" />,
  },
];

const INTERESTS: { value: Interest; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "naturaleza",
    label: "Naturaleza",
    icon: <Mountain size={22} strokeWidth={1.5} />,
    description: "Glaciares, bosques, lagos patagónicos",
  },
  {
    value: "trekking",
    label: "Trekking",
    icon: <Footprints size={22} strokeWidth={1.5} />,
    description: "Senderos, campamentos, circuitos",
  },
  {
    value: "fotografia",
    label: "Fotografía",
    icon: <Camera size={22} strokeWidth={1.5} />,
    description: "Paisajes, fauna, luz de la Patagonia",
  },
  {
    value: "gastronomia",
    label: "Gastronomía",
    icon: <UtensilsCrossed size={22} strokeWidth={1.5} />,
    description: "Cordero, centolla, chocolate, cerveza",
  },
  {
    value: "fauna",
    label: "Vida silvestre",
    icon: <Bird size={22} strokeWidth={1.5} />,
    description: "Ballenas, orcas, pingüinos, cóndores",
  },
];

const BUDGETS: { value: Budget; label: string; description: string; detail: string }[] = [
  {
    value: "economico",
    label: "Económico",
    description: "Hostels y camping",
    detail: "USD 30–80/noche · cocina propia · transporte compartido",
  },
  {
    value: "moderado",
    label: "Moderado",
    description: "Hoteles cómodos",
    detail: "USD 80–200/noche · restaurantes · tours guiados",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Lodges exclusivos",
    detail: "USD 200+/noche · todo incluido · traslados privados",
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <h2 className="font-heading text-2xl sm:text-3xl text-center text-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-xl border-2 p-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]",
        selected
          ? "border-[var(--color-teal)] bg-[var(--color-teal)]/8 text-foreground"
          : "border-border bg-card text-foreground hover:border-[var(--color-teal)]/40",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// ─── steps ───────────────────────────────────────────────────────────────────

function StepWhen({
  month,
  year,
  onChange,
}: {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}) {
  const currentMonth = new Date().getMonth() + 1; // 1-indexed

  return (
    <StepCard title="¿Cuándo vas?">
      {/* Year toggle */}
      <div className="flex justify-center gap-2">
        {[THIS_YEAR, THIS_YEAR + 1].map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => onChange(month, y)}
            className={[
              "px-5 py-2 rounded-full text-sm font-medium border-2 transition-colors",
              year === y
                ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-[var(--color-cream)]"
                : "border-border text-muted-foreground hover:border-[var(--color-teal)]/40",
            ].join(" ")}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-4 gap-2">
        {MONTHS.map((name, i) => {
          const m = i + 1;
          const isPast = year === THIS_YEAR && m < currentMonth;
          const sel = month === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => onChange(m, year)}
              className={[
                "rounded-lg py-3 text-sm font-medium transition-all border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]",
                sel
                  ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-[var(--color-cream)]"
                  : isPast
                  ? "border-border text-muted-foreground/40 bg-muted/30 cursor-default"
                  : "border-border text-foreground hover:border-[var(--color-teal)]/40 bg-card",
              ].join(" ")}
            >
              {name.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </StepCard>
  );
}

function StepDays({ days, onChange }: { days: number; onChange: (v: number) => void }) {
  return (
    <StepCard title="¿Cuántos días tenés?">
      <div className="space-y-3">
        {DAYS_OPTIONS.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={days === opt.value}
            onClick={() => onChange(opt.value)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{opt.label}</p>
                <p className="text-sm text-muted-foreground">{opt.description}</p>
              </div>
              {days === opt.value && (
                <div className="w-5 h-5 rounded-full bg-[var(--color-teal)] flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </OptionButton>
        ))}
      </div>
    </StepCard>
  );
}

function StepOrigin({ origin, onChange }: { origin: Origin | null; onChange: (v: Origin) => void }) {
  return (
    <StepCard title="¿Desde dónde llegás?">
      <div className="space-y-3">
        {ORIGINS.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={origin === opt.value}
            onClick={() => onChange(opt.value)}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 flex items-center justify-center">
                {opt.icon}
              </div>
              <div>
                <p className="font-semibold">{opt.label}</p>
                <p className="text-sm text-muted-foreground">{opt.sublabel}</p>
              </div>
            </div>
          </OptionButton>
        ))}
      </div>
    </StepCard>
  );
}

function StepInterests({
  interests,
  onChange,
}: {
  interests: Interest[];
  onChange: (v: Interest[]) => void;
}) {
  function toggle(interest: Interest) {
    if (interests.includes(interest)) {
      onChange(interests.filter((i) => i !== interest));
    } else {
      onChange([...interests, interest]);
    }
  }

  return (
    <StepCard title="¿Qué te interesa?">
      <p className="text-center text-sm text-muted-foreground -mt-2">
        Podés elegir más de uno
      </p>
      <div className="space-y-3">
        {INTERESTS.map((opt) => {
          const sel = interests.includes(opt.value);
          return (
            <OptionButton
              key={opt.value}
              selected={sel}
              onClick={() => toggle(opt.value)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={[
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    sel
                      ? "bg-[var(--color-teal)] text-[var(--color-cream)]"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {opt.icon}
                </div>
                <div>
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                </div>
              </div>
            </OptionButton>
          );
        })}
      </div>
    </StepCard>
  );
}

function StepBudget({ budget, onChange }: { budget: Budget | null; onChange: (v: Budget) => void }) {
  return (
    <StepCard title="¿Cuál es tu presupuesto?">
      <div className="space-y-3">
        {BUDGETS.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={budget === opt.value}
            onClick={() => onChange(opt.value)}
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{opt.label}</p>
                {budget === opt.value && (
                  <div className="w-5 h-5 rounded-full bg-[var(--color-teal)] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{opt.description}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{opt.detail}</p>
            </div>
          </OptionButton>
        ))}
      </div>
    </StepCard>
  );
}

// ─── main wizard ──────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

function getInitialMonth() {
  const m = new Date().getMonth() + 1;
  return m <= 11 ? m + 1 : 1; // default = next month
}

export function PlanearClient() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ItineraryResult | null>(null);

  const [month, setMonth] = useState(getInitialMonth());
  const [year, setYear] = useState(THIS_YEAR);
  const [days, setDays] = useState<number>(8);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);

  function canAdvance() {
    if (step === 0) return month > 0 && year > 0;
    if (step === 1) return days > 0;
    if (step === 2) return origin !== null;
    if (step === 3) return interests.length > 0;
    if (step === 4) return budget !== null;
    return false;
  }

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      // Generate
      const form: TripFormData = {
        month,
        year,
        days,
        origin: origin!,
        interests,
        budget: budget!,
      };
      setResult(generateItinerary(form));
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleReset() {
    setResult(null);
    setStep(0);
    setMonth(getInitialMonth());
    setYear(THIS_YEAR);
    setDays(8);
    setOrigin(null);
    setInterests([]);
    setBudget(null);
  }

  // Show output
  if (result) {
    const form: TripFormData = { month, year, days, origin: origin!, interests, budget: budget! };
    return (
      <div className="px-4 sm:px-6 py-8">
        <ItineraryOutput result={result} form={form} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col px-4 sm:px-6 py-8 gap-8">
      <WizardProgress currentStep={step} />

      {/* Step content */}
      <div className="flex-1">
        {step === 0 && (
          <StepWhen
            month={month}
            year={year}
            onChange={(m, y) => { setMonth(m); setYear(y); }}
          />
        )}
        {step === 1 && (
          <StepDays days={days} onChange={setDays} />
        )}
        {step === 2 && (
          <StepOrigin origin={origin} onChange={setOrigin} />
        )}
        {step === 3 && (
          <StepInterests interests={interests} onChange={setInterests} />
        )}
        {step === 4 && (
          <StepBudget budget={budget} onChange={setBudget} />
        )}
      </div>

      {/* Navigation */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between gap-4">
        <Button
          variant="brand-secondary"
          onClick={handleBack}
          disabled={step === 0}
          className="min-w-[100px]"
        >
          <ChevronLeft size={16} />
          Atrás
        </Button>

        <span className="text-sm text-muted-foreground">
          {step + 1} / {TOTAL_STEPS}
        </span>

        <Button
          variant="brand-primary"
          onClick={handleNext}
          disabled={!canAdvance()}
          className="min-w-[140px]"
        >
          {step === TOTAL_STEPS - 1 ? (
            <>
              <MapPin size={16} />
              Ver itinerario
            </>
          ) : (
            <>
              Siguiente
              <ChevronRight size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
