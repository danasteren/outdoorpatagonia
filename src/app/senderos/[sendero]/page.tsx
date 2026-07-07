import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import {
  MapPin,
  Clock,
  TrendingUp,
  Ruler,
  ExternalLink,
  ShoppingBag,
  AlertTriangle,
  Bird,
} from "lucide-react"
import { gygSearchUrl } from "@/lib/affiliates/getyourguide"
import { SENDEROS_CATALOG, getSenderoEntry, DIFICULTAD_LABELS, DIFICULTAD_COLORS } from "@/lib/senderos/catalog"
import { FAUNA_CATALOG } from "@/lib/fauna/catalog"
import { ALL_GEAR } from "@/lib/planner/data"
import { Badge } from "@/components/primitives/Badge"
import { Card, CardBody } from "@/components/primitives/Card"
import { Breadcrumb } from "@/components/primitives/Breadcrumb"

export const revalidate = 3600
export const dynamicParams = true

// ─── generateStaticParams ────────────────────────────────────────────────────

export function generateStaticParams() {
  return SENDEROS_CATALOG.map((s) => ({ sendero: s.slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sendero: string }>
}): Promise<Metadata> {
  const { sendero } = await params
  const entry = getSenderoEntry(sendero)
  if (!entry) return {}

  return {
    title: `${entry.title} — Sendero en ${entry.parqueName} | Outdoor Patagonia`,
    description: `${entry.title}: ${entry.distancia}, ${entry.duracion}, dificultad ${entry.dificultad}. ${entry.description.slice(0, 100)}`,
    alternates: {
      canonical: `https://outdoorpatagonia.com/senderos/${sendero}`,
    },
    openGraph: {
      title: entry.title,
      description: entry.description.slice(0, 155),
      type: "article",
    },
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DIFICULTAD_BG: Record<string, string> = {
  baja: "bg-green-500/15 text-green-700 dark:text-green-400",
  "baja-moderada": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  moderada: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  "moderada-alta": "bg-orange-500/15 text-orange-600",
  alta: "bg-red-500/15 text-red-600",
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SenderoPage({
  params,
}: {
  params: Promise<{ sendero: string }>
}) {
  const { sendero } = await params
  const entry = getSenderoEntry(sendero)
  if (!entry) notFound()

  // Gear recommendations filtered from planner data
  const gear = ALL_GEAR.filter(
    (g) =>
      g.interests.some((i) => entry.gearInterests.includes(i)) &&
      g.seasons.some((s) => entry.gearSeasons.includes(s))
  ).slice(0, 6)

  // Fauna nearby
  const faunaCercana = entry.faunaEspecies
    .map((slug) => FAUNA_CATALOG.find((f) => f.slug === slug))
    .filter(Boolean)

  const dificultadLabel = DIFICULTAD_LABELS[entry.dificultad]
  const dificultadColor = DIFICULTAD_COLORS[entry.dificultad]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-60 md:h-80 flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(135deg, #2d4a3e 0%, #1a3028 60%, #0d1f1a 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 21px)",
          }}
        />
        <div className="relative px-6 md:px-10 pb-8 max-w-6xl mx-auto w-full">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Senderos", href: "/senderos" },
              { label: entry.title },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" size="sm" className="border-white/30 text-white/80">
              Sendero
            </Badge>
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${DIFICULTAD_BG[entry.dificultad]}`}
            >
              {dificultadLabel}
            </span>
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {entry.title}
          </h1>
          <p className="text-white/60 mt-1.5 text-sm">
            <Link
              href={`/parques/${entry.parqueSlug}`}
              className="hover:text-white/90 transition-colors"
            >
              {entry.parqueName}
            </Link>
            {" · "}
            Inicio: {entry.inicio}
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[var(--color-forest)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 opacity-60" />
            <span className="opacity-60">Distancia:</span>
            <span className="font-bold">{entry.distancia}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 opacity-60" />
            <span className="opacity-60">Duración:</span>
            <span className="font-bold">{entry.duracion}</span>
          </div>
          {entry.desnivel && (
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 opacity-60" />
              <span className="opacity-60">Desnivel:</span>
              <span className="font-bold">{entry.desnivel}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="opacity-60">Dificultad:</span>
            <span className={`font-bold ${dificultadColor}`}>{dificultadLabel}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left col — 3/5 */}
          <div className="lg:col-span-3 space-y-10">

            {/* Description */}
            <section>
              <p className="text-base leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-xl font-bold mb-4">Puntos destacados</h2>
              <ul className="space-y-3">
                {entry.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[var(--color-teal)] font-bold mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tips */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <h2 className="text-xl font-bold">Tips importantes</h2>
              </div>
              <div className="space-y-2">
                {entry.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted">
                    <span className="text-yellow-500 shrink-0 mt-0.5">→</span>
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gear */}
            {gear.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-5 h-5 text-[var(--color-terracotta)]" />
                  <h2 className="text-xl font-bold">Gear recomendado</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gear.map((g) => (
                    <a
                      key={g.name}
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="group block"
                    >
                      <Card variant="default" className="h-full hover:border-[var(--color-terracotta)] transition-colors">
                        <CardBody className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-sm group-hover:text-[var(--color-terracotta)] transition-colors leading-snug">
                                {g.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {g.description.slice(0, 80)}…
                              </p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          </div>
                        </CardBody>
                      </Card>
                    </a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Links de afiliado Amazon — el precio no varía para vos
                </p>
              </section>
            )}
          </div>

          {/* Right col — 2/5 */}
          <div className="lg:col-span-2 space-y-8">

            {/* Summary card */}
            <Card variant="elevated">
              <CardBody className="p-5 space-y-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Inicio del sendero
                  </span>
                  <p className="font-medium mt-0.5 text-sm">{entry.inicio}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Parque nacional
                  </span>
                  <Link
                    href={`/parques/${entry.parqueSlug}`}
                    className="block font-medium mt-0.5 text-sm hover:text-[var(--color-teal)] transition-colors"
                  >
                    {entry.parqueName} →
                  </Link>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Mejor época
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.bestMonths.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2 py-0.5 rounded bg-[var(--color-teal)]/15 text-[var(--color-teal)] font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-1 border-t border-border">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground block">Distancia</span>
                      <span className="font-bold">{entry.distancia}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Duración</span>
                      <span className="font-bold">{entry.duracion}</span>
                    </div>
                    {entry.desnivel && (
                      <div>
                        <span className="text-xs text-muted-foreground block">Desnivel</span>
                        <span className="font-bold">{entry.desnivel}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-muted-foreground block">Dificultad</span>
                      <span className={`font-bold ${dificultadColor}`}>
                        {dificultadLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Fauna */}
            {faunaCercana.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Bird className="w-4 h-4 text-[var(--color-terracotta)]" />
                  <h2 className="text-lg font-bold">Fauna que podés ver</h2>
                </div>
                <div className="space-y-2">
                  {faunaCercana.map((f) => {
                    if (!f) return null
                    return (
                      <Link
                        key={f.slug}
                        href={`/fauna/${f.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-terracotta)] shrink-0" />
                        <span className="text-sm group-hover:text-[var(--color-terracotta)] transition-colors">
                          {f.commonNameEs}
                        </span>
                        <span className="text-xs text-muted-foreground italic hidden sm:inline">
                          {f.scientificName}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Tours GYG */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-4 h-4 text-[var(--color-teal)]" />
                <span className="text-sm font-bold">Tours y excursiones</span>
              </div>
              <div className="space-y-2">
                <a
                  href={gygSearchUrl(`${entry.title} guided trek patagonia`)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm hover:border-[var(--color-teal)] transition-colors"
                >
                  <span>Trekking guiado: {entry.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
                <a
                  href={gygSearchUrl(`${entry.parqueName ?? "patagonia"} day tour`)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm hover:border-[var(--color-teal)] transition-colors"
                >
                  <span>Excursiones en la zona</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
              </div>
            </section>

            {/* Planner CTA */}
            <div className="rounded-xl bg-[var(--color-forest)] text-[var(--color-cream)] p-5">
              <p className="font-bold mb-1">¿Planeando hacer este sendero?</p>
              <p className="text-sm opacity-70 mb-3">
                Armá un itinerario completo con alojamiento, tours y gear recomendado.
              </p>
              <Link
                href="/planear"
                className="inline-flex items-center gap-2 text-sm font-bold bg-[var(--color-cream)] text-[var(--color-forest)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Planear mi viaje
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://outdoorpatagonia.com" },
              { "@type": "ListItem", position: 2, name: "Senderos", item: "https://outdoorpatagonia.com/senderos" },
              { "@type": "ListItem", position: 3, name: entry.title, item: `https://outdoorpatagonia.com/senderos/${sendero}` },
            ],
          }),
        }}
      />
    </div>
  )
}
