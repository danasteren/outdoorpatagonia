import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ChevronRight } from "lucide-react"

interface TopicCardProps {
  label: string
  href: string
  icon: LucideIcon
  description: string
  /** Clases de gradiente de Tailwind (`from-… to-…`) para el ícono. */
  color: string
  /** Posición en la grilla, para escalonar la animación de entrada. */
  index: number
}

/** Tarjeta de "Explorá por tema" de la home (ES y EN). */
export function TopicCard({ label, href, icon: Icon, description, color, index }: TopicCardProps) {
  return (
    <Link
      href={href}
      style={{ animationDelay: `${index * 70}ms` }}
      className="animate-fade-in-up group relative flex flex-none flex-col items-center basis-[calc((100%-0.75rem)/2)] md:basis-[calc((100%-1.5rem)/3)] lg:basis-[calc((100%-3.75rem)/6)] rounded-2xl border border-border bg-card px-4 py-6 text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-teal)]/50 hover:shadow-hover"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300`}
        aria-hidden="true"
      />
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-card transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3`}
      >
        <Icon size={26} className="text-white" strokeWidth={1.5} />
      </div>
      <p className="relative mt-3 inline-flex items-center gap-0.5 font-bold text-sm text-foreground group-hover:text-[var(--color-teal)] transition-colors">
        {label}
        <ChevronRight
          size={13}
          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        />
      </p>
      <p className="relative text-[11px] text-muted-foreground leading-snug mt-1">
        {description}
      </p>
    </Link>
  )
}
