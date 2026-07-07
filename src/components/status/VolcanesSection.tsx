import { Mountain, TriangleAlert, CircleAlert, CheckCircle, ExternalLink } from "lucide-react"
import { Card } from "@/components/primitives"
import type { Volcan, NivelAlerta } from "@/lib/apis/sernageomin"

// ─── Alerta visual ────────────────────────────────────────────────────────────

const NIVEL_CONFIG: Record<
  NivelAlerta,
  { label: string; dot: string; badge: string; icon: typeof Mountain }
> = {
  Verde:    { label: "Verde",    dot: "bg-green-500",  badge: "text-green-600 bg-green-500/10",   icon: CheckCircle },
  Amarillo: { label: "Amarillo", dot: "bg-yellow-400", badge: "text-yellow-600 bg-yellow-400/10", icon: CircleAlert },
  Naranja:  { label: "Naranja",  dot: "bg-orange-500", badge: "text-orange-500 bg-orange-500/10", icon: TriangleAlert },
  Rojo:     { label: "Rojo",     dot: "bg-red-500",    badge: "text-red-500 bg-red-500/10",       icon: TriangleAlert },
}

const PAIS_LABEL: Record<Volcan["pais"], string> = {
  CL: "Chile",
  AR: "Argentina",
  "CL/AR": "Chile · AR",
}

function formatFecha(iso: string | null): string | null {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })
  } catch {
    return iso
  }
}

// ─── Card individual ──────────────────────────────────────────────────────────

function VolcanCard({ v }: { v: Volcan }) {
  const cfg = v.nivel ? NIVEL_CONFIG[v.nivel] : null
  const fecha = formatFecha(v.fechaActualizacion)

  return (
    <a
      href={v.urlFuente}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card
        variant="elevated"
        className={`p-4 transition-colors group-hover:border-primary/30 ${
          v.nivel === "Rojo" ? "border-red-500/40 bg-red-500/5" :
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
              v.nivel === "Rojo" ? "text-red-500" :
              v.nivel === "Naranja" ? "text-orange-500" :
              "text-muted-foreground"
            }`}
          />
        </div>

        {/* Nivel */}
        {cfg ? (
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/30 flex-shrink-0" />
            <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted/50">
              Sin datos
            </span>
          </div>
        )}

        {/* Descripción o fecha */}
        {v.descripcion && (
          <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {v.descripcion}
          </p>
        )}
        {fecha && !v.descripcion && (
          <p className="text-[9px] text-muted-foreground mt-2">Actualizado {fecha}</p>
        )}

        {/* Link externo */}
        <div className="flex items-center gap-0.5 mt-2 text-[9px] text-muted-foreground/60 group-hover:text-primary/60 transition-colors">
          <ExternalLink size={9} strokeWidth={1.5} />
          <span>Ver en SERNAGEOMIN</span>
        </div>
      </Card>
    </a>
  )
}

// ─── Exportable ───────────────────────────────────────────────────────────────

interface Props {
  data: Volcan[]
}

export function VolcanesSection({ data }: Props) {
  if (data.length === 0) return null

  const conDatos = data.filter((v) => v.nivel !== null)
  const activos  = conDatos.filter((v) => v.nivel !== "Verde")
  const esCacheDiario = conDatos.length > 0

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Volcanes — alertas SERNAGEOMIN
        </p>
        {activos.length > 0 && (
          <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
            {activos.length} con actividad elevada
          </span>
        )}
        {esCacheDiario && activos.length === 0 && (
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
        {esCacheDiario
          ? <>Fuente: <a href="https://rnvv.sernageomin.cl" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">SERNAGEOMIN RNVV</a> · actualizado cada 24 h</>
          : <>Sin conexión con SERNAGEOMIN · <a href="https://rnvv.sernageomin.cl/rnvv/web/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">verificar manualmente</a></>
        }
      </p>
    </div>
  )
}
