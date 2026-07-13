import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { resolveRelacionados, type Relacionado } from "@/lib/relacionados"
import { Card } from "@/components/primitives/Card"

export function RelacionadosSection({ items }: { items?: Relacionado[] }) {
  const resolved = resolveRelacionados(items)
  if (resolved.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
        También te puede interesar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resolved.map((r) => (
          <Link key={r.href} href={r.href} className="group block">
            <Card variant="elevated" className="p-4 h-full transition-colors group-hover:border-primary/30">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-0.5">
                    {r.categoria}
                  </p>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {r.nombre}
                  </p>
                </div>
                <ArrowRight size={14} strokeWidth={1.5} className="text-muted-foreground/30 group-hover:text-primary/60 flex-shrink-0 transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
