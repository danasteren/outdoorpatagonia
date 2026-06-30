import Link from "next/link"
import { ChevronRight, ChevronDown, Camera } from "lucide-react"
import { PageShell } from "@/components/layout"
import { getMoonData } from "@/lib/astronomy"
import {
  getCurrentTimeLabel,
  getDailyHighlight,
  getDayOfYear,
  getTimeOfDay,
  getTodayLabel,
  type TimeOfDay,
} from "@/lib/dailyContent"
import { fetchPatagoniaPhotos, type PhotoSighting } from "@/lib/apis/inaturalist"

// Real, recent Patagonia wildlife photo as the hero backdrop — rotates daily.
// Falls back to null (gradient-only hero) if iNaturalist is unreachable.
async function getHeroPhoto(): Promise<PhotoSighting | null> {
  try {
    const photos = await fetchPatagoniaPhotos(8)
    if (photos.length === 0) return null
    return photos[getDayOfYear(new Date()) % photos.length]
  } catch {
    return null
  }
}

function largeUrl(url: string): string {
  return url.replace(/\/small\b/, "/large")
}

const TIME_STYLES: Record<
  TimeOfDay,
  { gradient: string; particles: "stars" | "embers"; mountains: string }
> = {
  amanecer: {
    gradient: "from-[#c8763a] via-[var(--color-forest)] to-[var(--color-teal)]",
    particles: "embers",
    mountains: "fill-[var(--color-forest)]",
  },
  dia: {
    gradient: "from-[var(--color-forest)] via-[#1e4a38] to-[var(--color-teal)]",
    particles: "embers",
    mountains: "fill-[var(--color-forest)]",
  },
  atardecer: {
    gradient: "from-[#c8763a] via-[#5a4a3a] to-[var(--color-forest)]",
    particles: "embers",
    mountains: "fill-[#2a1f18]",
  },
  noche: {
    gradient: "from-[#0a1622] via-[var(--color-forest)] to-[#13263f]",
    particles: "stars",
    mountains: "fill-black/40",
  },
}

const PARTICLES = [
  { left: "4%", size: 3, delay: "0s", duration: "9s" },
  { left: "11%", size: 2, delay: "1.4s", duration: "7s" },
  { left: "19%", size: 4, delay: "2.8s", duration: "11s" },
  { left: "27%", size: 2, delay: "0.6s", duration: "8s" },
  { left: "35%", size: 3, delay: "3.6s", duration: "10s" },
  { left: "44%", size: 2, delay: "1.9s", duration: "7.5s" },
  { left: "52%", size: 4, delay: "0.2s", duration: "12s" },
  { left: "60%", size: 2, delay: "2.4s", duration: "8.5s" },
  { left: "68%", size: 3, delay: "4.1s", duration: "9.5s" },
  { left: "76%", size: 2, delay: "1.1s", duration: "7s" },
  { left: "84%", size: 4, delay: "3.1s", duration: "11s" },
  { left: "92%", size: 2, delay: "0.8s", duration: "8s" },
] as const

export async function Hero() {
  const timeOfDay = getTimeOfDay()
  const { gradient, particles, mountains } = TIME_STYLES[timeOfDay]
  const moon = getMoonData()
  const highlight = getDailyHighlight()
  const today = getTodayLabel()
  const time = getCurrentTimeLabel()
  const photo = await getHeroPhoto()

  return (
    <section
      className={`relative isolate overflow-hidden text-[var(--color-cream)] min-h-[92svh] sm:min-h-[88vh] flex flex-col ${
        photo ? "bg-[var(--color-forest)]" : `bg-gradient-to-br ${gradient} bg-[length:200%_200%] animate-hero-pan`
      }`}
    >
      {/* Real Patagonia photo backdrop (iNaturalist), rotates daily */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={largeUrl(photo.photoUrl)}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.55] saturate-[1.1]"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 bg-[length:200%_200%] animate-hero-pan mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-transparent to-black/20" />
        </>
      )}

      {/* Particle field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${
              particles === "stars"
                ? "bg-white animate-twinkle"
                : "bg-[var(--color-teal-light)] animate-float-up"
            }`}
            style={{
              left: p.left,
              bottom: particles === "stars" ? `${20 + (i % 5) * 15}%` : "-5%",
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Mountain silhouette layers */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          className="w-full h-32 sm:h-48 opacity-25 animate-drift-slow"
        >
          <path
            d="M0,280 L0,160 L180,60 L340,140 L520,30 L700,150 L900,50 L1080,170 L1260,80 L1440,160 L1440,280 Z"
            className={mountains}
          />
        </svg>
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-36 -mt-16 sm:-mt-24 opacity-50 animate-drift"
        >
          <path
            d="M0,220 L0,120 L220,40 L400,110 L600,20 L820,120 L1020,50 L1220,130 L1440,70 L1440,220 Z"
            className={mountains}
          />
        </svg>
      </div>

      <PageShell className="relative z-10 flex-1 flex flex-col justify-center py-20 sm:py-0">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-teal-light)] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-teal-light)]" />
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-teal-light)]">
              Patagonia · Hoy {today} · {time} hs ARG/CHI
            </p>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Naturaleza, cultura e historias del sur del mundo.
          </h1>

          <p className="text-lg text-[var(--color-cream)] opacity-80 mb-6 leading-relaxed">
            Datos en tiempo real, guías de campo y herramientas para explorar la Patagonia.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/mapa"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-teal)] text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all"
            >
              Ver el mapa
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/planear"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-cream)] border-opacity-40 text-[var(--color-cream)] font-semibold text-sm hover:bg-white/10 hover:scale-105 transition-all"
            >
              Planear un viaje
            </Link>
          </div>

          <Link
            href={highlight.href}
            className="group inline-flex items-start gap-2.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 max-w-md hover:bg-white/15 hover:border-white/25 transition-colors"
          >
            <span className="text-lg leading-none mt-0.5">{moon.phaseEmoji}</span>
            <span className="text-sm text-[var(--color-cream)] opacity-90 leading-snug">
              <span className="font-semibold">Dato del día · {highlight.source}: </span>
              {highlight.text}
              <ChevronRight
                size={13}
                className="inline-block ml-1 -mb-0.5 opacity-70 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </PageShell>

      {/* Photo credit */}
      {photo && (
        <a
          href={photo.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 hidden sm:inline-flex items-center gap-1.5 self-end mr-4 mb-2 text-[10px] text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity"
        >
          <Camera size={11} strokeWidth={1.5} />
          {photo.commonName ?? photo.speciesName} por @{photo.observerLogin} · iNaturalist
        </a>
      )}

      {/* Scroll cue */}
      <a
        href="#categorias"
        className="relative z-10 hidden sm:flex justify-center pb-6 animate-bounce-soft"
        aria-label="Bajar a la sección de categorías"
      >
        <div className="flex flex-col items-center gap-1 text-[var(--color-cream)] opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-medium uppercase tracking-widest">Descubrí más</span>
          <ChevronDown size={18} />
        </div>
      </a>
    </section>
  )
}
