"use client";

const STEPS = [
  "Cuándo",
  "Días",
  "Origen",
  "Intereses",
  "Presupuesto",
];

interface WizardProgressProps {
  currentStep: number; // 0-indexed
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                i < currentStep
                  ? "bg-[var(--color-teal)] text-[var(--color-cream)]"
                  : i === currentStep
                  ? "bg-[var(--color-teal)] text-[var(--color-cream)] ring-4 ring-[var(--color-teal)]/20"
                  : "bg-muted text-muted-foreground",
              ].join(" ")}
            >
              {i < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={[
                "text-[10px] font-medium hidden sm:block",
                i === currentStep
                  ? "text-[var(--color-teal)]"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              {label}
            </span>
          </div>

          {i < STEPS.length - 1 && (
            <div
              className={[
                "h-0.5 w-8 sm:w-12 mx-1 sm:mx-2 transition-colors",
                i < currentStep
                  ? "bg-[var(--color-teal)]"
                  : "bg-border",
              ].join(" ")}
            />
          )}
        </div>
      ))}
    </div>
  );
}
