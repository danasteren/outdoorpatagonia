import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Breadcrumb, type BreadcrumbItem } from "@/components/primitives/Breadcrumb"
import { HeroActions } from "@/components/HeroActions"

interface DetailHeroImage {
  url: string
  alt: string
  credit?: string
  creditUrl?: string
}

interface DetailHeroProps {
  image?: DetailHeroImage | null
  /** CSS background value used when there's no photo. */
  fallbackGradient: string
  breadcrumb: BreadcrumbItem[]
  icon: LucideIcon
  eyebrow: string
  title: string
  /** Line(s) under the title — location · key stat, or scientific name. */
  subtitle?: ReactNode
  /** Habilita el botón de guardar en las acciones del hero. */
  save?: { slug: string; title: string; category: string }
}

/** Photo/gradient hero for detail pages — breadcrumb + icon/eyebrow row + title, no clickable-looking badges. */
export function DetailHero({
  image,
  fallbackGradient,
  breadcrumb,
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  save,
}: DetailHeroProps) {
  return (
    <div className="relative h-72 md:h-96 flex flex-col justify-end overflow-hidden">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url}
          alt={image.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: image
            ? "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)"
            : fallbackGradient,
        }}
      />
      {!image && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.08) 30px, rgba(255,255,255,0.08) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px)",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <HeroActions imageUrl={image?.url} imageAlt={image?.alt} title={title} save={save} />
      <div className="relative px-6 md:px-10 pb-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={breadcrumb} className="mb-3 text-white/60" />
          <div className="flex items-end gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className="text-white/70" strokeWidth={1.5} />
                <span className="text-xs text-white/70 uppercase tracking-widest">{eyebrow}</span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h1>
              {subtitle && <div className="text-white/70 mt-1 text-sm">{subtitle}</div>}
            </div>
            {image?.credit && (
              <a
                href={image.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-white/40 hover:text-white/70 transition-colors flex-shrink-0"
              >
                Foto: {image.credit}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
