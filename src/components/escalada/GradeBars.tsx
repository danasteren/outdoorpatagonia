"use client"

import type { GradeBucket } from "@/lib/escalada/catalog"
import { useInView } from "@/lib/hooks/useInView"

const NIVEL_BAR = [
  "bg-emerald-500",
  "bg-sky-500",
  "bg-orange-500",
  "bg-red-500",
] as const

/** Histograma de vías por grado. Las barras crecen cuando el bloque entra en pantalla. */
export function GradeBars({
  buckets,
  tone = "default",
  className = "",
}: {
  buckets: GradeBucket[]
  tone?: "default" | "onDark"
  className?: string
}) {
  const [ref, visible] = useInView<HTMLDivElement>()

  const max = Math.max(...buckets.map((b) => b.count), 1)
  const label = tone === "onDark" ? "text-white/60" : "text-muted-foreground"
  const value = tone === "onDark" ? "text-white/90" : "text-foreground/80"

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Vías por grado: ${buckets.map((b) => `${b.grado}: ${b.count}`).join(", ")}`}
      className={`flex items-end gap-[3px] sm:gap-1.5 h-36 ${className}`}
    >
      {buckets.map((b, i) => {
        const h = Math.max((b.count / max) * 86, 4)
        return (
          <div key={b.grado} className="flex-1 min-w-0 h-full flex flex-col items-center gap-1">
            <div className="relative w-full flex-1">
              <span
                className={`absolute inset-x-0 text-center text-[9px] sm:text-[10px] font-semibold tabular-nums leading-none transition-opacity duration-500 motion-reduce:transition-none ${value} ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ bottom: `calc(${h}% + 3px)`, transitionDelay: `${i * 45 + 350}ms` }}
              >
                {b.count}
              </span>
              <div
                className={`absolute inset-x-0 bottom-0 rounded-t-[3px] origin-bottom transition-transform duration-700 ease-out motion-reduce:transition-none ${NIVEL_BAR[b.nivel]} ${
                  visible ? "scale-y-100" : "scale-y-0"
                }`}
                style={{ height: `${h}%`, transitionDelay: `${i * 45}ms` }}
              />
            </div>
            <span className={`text-[8px] sm:text-[10px] font-mono leading-none whitespace-nowrap ${label}`}>
              {b.grado}
            </span>
          </div>
        )
      })}
    </div>
  )
}
