"use client"

import { useEffect, useState } from "react"
import { useInView } from "@/lib/hooks/useInView"

/** Número que cuenta desde 0 cuando entra en pantalla. El HTML inicial ya trae el valor final. */
export function CountUp({ value, className = "" }: { value: number; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const duration = 1100
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </span>
  )
}

/** Aparece con un leve desplazamiento cuando entra en pantalla. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2)
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Chapas a lo largo de la vía (coordenadas del viewBox 0 0 100 150)
const CHAPAS = [
  [46, 124], [36, 100], [52, 80], [60, 58], [50, 38],
] as const

/** Pared con una vía que se dibuja de abajo hacia arriba y las chapas que van apareciendo. Decorativo. */
export function ViaDibujada({ className = "" }: { className?: string }) {
  const [ref, inView] = useInView<SVGSVGElement>(0.5)
  return (
    <svg ref={ref} viewBox="0 0 100 150" fill="none" aria-hidden="true" className={className}>
      <path
        d="M18 150 10 118 22 96 14 66 30 44 26 22 44 6 62 14 74 4 88 26 82 52 94 80 86 112 96 150z"
        className="fill-white/[0.07] stroke-white/15"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M30 44l14 10-4 22M88 26 72 40l6 26M22 96l16 8M94 80 76 92l-4 26"
        className="stroke-white/10"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 148 46 124 36 100 52 80 60 58 50 38 62 18"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={inView ? 0 : 1}
        className="stroke-[var(--color-terracotta)] transition-[stroke-dashoffset] duration-[2200ms] ease-out motion-reduce:transition-none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {CHAPAS.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          style={{ transitionDelay: `${350 + i * 330}ms` }}
          className={`fill-[var(--color-cream)] stroke-[var(--color-terracotta)] transition-opacity duration-300 motion-reduce:transition-none ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          strokeWidth="1.5"
        />
      ))}
      <circle
        cx="62"
        cy="18"
        r="4.5"
        style={{ transitionDelay: "2100ms" }}
        className={`fill-[var(--color-terracotta)] stroke-[var(--color-cream)] transition-opacity duration-300 motion-reduce:transition-none ${
          inView ? "opacity-100" : "opacity-0"
        }`}
        strokeWidth="1.5"
      />
    </svg>
  )
}
