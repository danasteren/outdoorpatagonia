import { Star } from "lucide-react"
import { Card } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import type { MoonData, StargazingQuality } from "@/lib/astronomy"

const QUALITY_COLORS: Record<StargazingQuality, string> = {
  excelente: "text-emerald-500",
  buena: "text-sky-400",
  regular: "text-amber-400",
  mala: "text-rose-400",
}

const QUALITY_BADGE: Record<StargazingQuality, "default" | "outline"> = {
  excelente: "default",
  buena: "default",
  regular: "outline",
  mala: "outline",
}

interface Props {
  moon: MoonData
}

export function MoonSection({ moon }: Props) {
  const qualityColor = QUALITY_COLORS[moon.stargazingQuality]

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Astronomía — cielos de Patagonia
      </p>
      <Card variant="elevated" className="p-5">
        <div className="flex items-start gap-4">
          {/* Emoji + fase */}
          <div className="flex-shrink-0 text-center">
            <span className="text-5xl leading-none" role="img" aria-label={moon.phaseName}>
              {moon.phaseEmoji}
            </span>
            <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
              {moon.phaseName}
            </p>
          </div>

          {/* Detalles */}
          <div className="flex-1 min-w-0">
            {/* Iluminación */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Iluminación</span>
                <span className="text-xs font-semibold">{moon.illumination}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${moon.illumination}%` }}
                />
              </div>
            </div>

            {/* Luna llena */}
            <p className="text-xs text-muted-foreground mb-3">
              Próxima luna llena:{" "}
              <span className="text-foreground font-medium">{moon.nextFullDate}</span>
              {moon.daysUntilFull > 0 && (
                <span className="text-muted-foreground">
                  {" "}({moon.daysUntilFull} días)
                </span>
              )}
            </p>

            {/* Calidad de observación */}
            <div className="flex items-center gap-2">
              <Star size={12} strokeWidth={1.5} className={qualityColor} />
              <span className={`text-xs font-medium capitalize ${qualityColor}`}>
                {moon.stargazingQuality}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">{moon.stargazingNote}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
