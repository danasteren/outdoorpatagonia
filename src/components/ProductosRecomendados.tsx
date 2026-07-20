import { ShoppingBag, ExternalLink } from "lucide-react"
import { Card, CardBody } from "@/components/primitives/Card"
import { amazonSearchUrl } from "@/lib/affiliates/amazon"

type Props = {
  items?: Array<{ nombre: string; query: string }>
}

export function ProductosRecomendados({ items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <Card variant="elevated">
      <CardBody className="p-5">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
          <ShoppingBag size={14} strokeWidth={1.5} />
          Productos recomendados
        </h2>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item.nombre}>
              <a
                href={amazonSearchUrl(item.query)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={13} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
                {item.nombre}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-muted-foreground/70 mt-3 leading-relaxed">
          Como afiliados de Amazon, ganamos con las compras que califican.
        </p>
      </CardBody>
    </Card>
  )
}
