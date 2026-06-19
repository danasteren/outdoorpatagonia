"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Globe, Phone, Star } from "lucide-react";
import { Card, CardBody } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import type { Operator } from "@/lib/operators/types";
import { REGIONS, CATEGORIES } from "@/lib/operators/types";

interface Props {
  operators: Operator[];
}

export function OperadoresClient({ operators }: Props) {
  const [region, setRegion] = useState("");
  const [categoria, setCategoria] = useState("");

  const filtered = useMemo(() => {
    return operators.filter((op) => {
      if (region && op.region !== region) return false;
      if (categoria && !op.categories.includes(categoria)) return false;
      return true;
    });
  }, [operators, region, categoria]);

  const featured = filtered.filter((op) => op.is_featured);
  const regular = filtered.filter((op) => !op.is_featured);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    operators.forEach((op) => op.categories.forEach((c) => cats.add(c)));
    return [...cats].sort();
  }, [operators]);

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
        >
          <option value="">Todas las regiones</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
        >
          <option value="">Todas las actividades</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>{CATEGORIES[c] ?? c}</option>
          ))}
        </select>

        {(region || categoria) && (
          <button
            onClick={() => { setRegion(""); setCategoria(""); }}
            className="text-sm px-3 py-2 rounded-lg text-[var(--color-teal)] hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No hay operadores para los filtros seleccionados.
        </p>
      )}

      {/* Destacados */}
      {featured.length > 0 && (
        <section className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-4">
            Operadores Destacados
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((op) => (
              <OperatorCard key={op.id} operator={op} />
            ))}
          </div>
        </section>
      )}

      {/* Listado general */}
      {regular.length > 0 && (
        <section>
          {featured.length > 0 && (
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Todos los operadores
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regular.map((op) => (
              <OperatorCard key={op.id} operator={op} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function OperatorCard({ operator: op }: { operator: Operator }) {
  return (
    <Link href={`/operadores/${op.slug}`} className="group block">
      <Card
        variant={op.is_featured ? "featured" : "elevated"}
        className="h-full"
      >
        <CardBody className="flex flex-col gap-3">
          {/* Header: logo + nombre + badge */}
          <div className="flex items-start gap-3">
            {op.logo_url ? (
              <Image
                src={op.logo_url}
                alt={op.name}
                width={48}
                height={48}
                className="rounded-lg object-cover shrink-0"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${
                  op.is_featured
                    ? "bg-[var(--color-teal)] text-[var(--color-cream)]"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {op.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-heading font-bold text-base leading-tight group-hover:underline">
                  {op.name}
                </h2>
                {op.is_featured && (
                  <Badge variant="success" size="sm" className="gap-1">
                    <Star size={9} strokeWidth={2} />
                    Destacado
                  </Badge>
                )}
              </div>
              {op.location && (
                <p className={`text-xs mt-0.5 flex items-center gap-1 ${op.is_featured ? "text-[var(--color-cream)]/70" : "text-muted-foreground"}`}>
                  <MapPin size={11} strokeWidth={1.5} />
                  {op.location}
                </p>
              )}
            </div>
          </div>

          {/* Descripción */}
          {op.description && (
            <p className={`text-sm leading-relaxed line-clamp-2 ${op.is_featured ? "text-[var(--color-cream)]/80" : "text-muted-foreground"}`}>
              {op.description}
            </p>
          )}

          {/* Categorías */}
          {op.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {op.categories.slice(0, 3).map((cat) => (
                <Badge
                  key={cat}
                  variant={op.is_featured ? "forest" : "outline"}
                  size="sm"
                  className={op.is_featured ? "bg-white/10 text-[var(--color-cream)] border-0" : ""}
                >
                  {CATEGORIES[cat] ?? cat}
                </Badge>
              ))}
              {op.categories.length > 3 && (
                <span className={`text-xs ${op.is_featured ? "text-[var(--color-cream)]/60" : "text-muted-foreground"}`}>
                  +{op.categories.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Links */}
          <div className={`flex gap-4 text-xs mt-auto pt-1 ${op.is_featured ? "text-[var(--color-cream)]/70" : "text-muted-foreground"}`}>
            {op.website && (
              <span className="flex items-center gap-1">
                <Globe size={11} strokeWidth={1.5} />
                Sitio web
              </span>
            )}
            {op.phone && (
              <span className="flex items-center gap-1">
                <Phone size={11} strokeWidth={1.5} />
                Teléfono
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
