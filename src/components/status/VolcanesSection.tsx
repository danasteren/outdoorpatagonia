import Link from "next/link"
import { Mountain, TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { Card } from "@/components/primitives"
import type { Volcan, NivelAlerta } from "@/lib/apis/sernageomin"

// ─── Config por nivel ─────────────────────────────────────────────────────────

const NIVEL_CONFIG: Record<
  NivelAlerta,
  { dot: string; badge: string; icon: typeof Mountain }
> = {
  Verde:    { dot: "bg-green-500",  badge: "text-green-600 bg-green-500/10",   icon: CheckCircle },
  Amarillo: { dot: "bg-yellow-400", badge: "text-yellow-600 bg-yellow-400/10", icon: CircleAlert },
  Naranja:  { dot: "bg-orange-500", badge: "text-orange-500 bg-orange-500/10", icon: TriangleAlert },
  Rojo:     { dot: "bg-red-500",    badge: "text-red-500 bg-red-500/10",       icon: TriangleAlert },
}

const PAIS_LABEL: Record<Volcan["pais"], string> = {
  CL: "Chile",
  AR: "Argentina",
  "CL/AR": "Chile · AR",
}

function formatFecha(iso: string | null): string | null {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "2-digit", month: "short", year: "numeric",
    })
  } catch {
    return iso
  }
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function VolcanCard({ v }: { v: Volcan }) {
  const cfg = NIVEL_CONFIG[v.nivel]
  const fecha = formatFecha(v.fechaPost)

  return (
    <Link
      href={`/volcanes/${v.slug}`}
      className="block group"
    >
      <Card
        variant="elevated"
        className={`p-4 transition-colors group-hover:border-primary/30 h-full ${
          v.nivel === "Rojo"    ? "border-red-500/40 bg-red-500/5"    :
          v.nivel === "Naranja" ? "border-orange-500/30 bg-orange-500/5" : ""
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-foreground truncate">{v.nombre}</p>
            <p className="text-[10px] text-muted-foreground">{PAIS_LABEL[v.pais]}</p>
          </div>
          <Mountain
            size={16}
            strokeWidth={1.5}
            className={`flex-shrink-0 mt-0.5 ${
              v.nivel === "Rojo"    ? "text-red-500" :
              v.nivel === "Naranja" ? "text-orange-500" :
              v.nivel === "Amarillo" ? "text-yellow-500" :
              "text-muted-foreground/50"
            }`}
          />
        </div>

        {/* Nivel */}
        <div className="flex items-center gap-1.5">
          <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot} ${!v.nivelVerificado ? "opacity-40" : ""}`} />
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${cfg.badge} ${!v.nivelVerificado ? "opacity-70" : ""}`}>
            {v.nivel}
          </span>
          {!v.nivelVerificado && (
            <span className="text-[9px] text-muted-foreground/60">sin alertas recientes</span>
          )}
        </div>

        {/* Fecha del post cuando hay dato verificado */}
        {v.nivelVerificado && fecha && (
          <p className="text-[9px] text-muted-foreground mt-1.5">Comunicado: {fecha}</p>
        )}

        {/* Pie: link + miniatura */}
        <div className="flex items-end justify-between mt-2">
          <div className="text-[9px] text-muted-foreground/50 group-hover:text-primary/60 transition-colors">
            Ver detalle →
          </div>
          {v.thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={v.thumbnailUrl}
              alt={v.nombre}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-border flex-shrink-0"
            />
          )}
          {!v.thumbnailUrl && (
            <div className="w-8 h-8 rounded-full bg-muted/40 ring-1 ring-border flex-shrink-0 flex items-center justify-center">
              <Mountain size={14} strokeWidth={1.5} className="text-muted-foreground/40" />
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}

// ─── Exportable ───────────────────────────────────────────────────────────────

interface Props {
  data: Volcan[]
}

export function VolcanesSection({ data }: Props) {
  if (data.length === 0) return null

  const activos = data.filter((v) => v.nivel !== "Verde" && v.nivelVerificado)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Volcanes — alertas SERNAGEOMIN
        </p>
        {activos.length > 0 ? (
          <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
            {activos.length} con actividad elevada
          </span>
        ) : (
          <span className="text-[10px] text-green-600 bg-green-500/10 px-2 py-0.5 rounded font-medium">
            Sin alertas activas
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {data.map((v) => (
          <VolcanCard key={v.nombre} v={v} />
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground mt-2 text-right">
        Fuente:{" "}
        <a
          href="https://www.sernageomin.cl/?s=alerta+volcan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          SERNAGEOMIN
        </a>
        {" · "}Verde = sin comunicados de alerta recientes · actualizado cada 24 h
      </p>
    </div>
  )
}
