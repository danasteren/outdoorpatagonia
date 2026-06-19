import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Globe, Phone, Mail, ArrowLeft, Star } from "lucide-react";
import { getOperatorBySlug } from "@/lib/operators/queries";
import { Badge } from "@/components/primitives/Badge";
import { Card, CardBody } from "@/components/primitives/Card";
import { CATEGORIES } from "@/lib/operators/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const op = await getOperatorBySlug(slug);
  if (!op) return { title: "Operador no encontrado — Outdoor Patagonia" };

  return {
    title: `${op.name} — Outdoor Patagonia`,
    description: op.description ?? `Perfil de ${op.name} en el directorio de operadores de Outdoor Patagonia.`,
    alternates: {
      canonical: `https://outdoorpatagonia.com/operadores/${op.slug}`,
    },
  };
}

export default async function OperadorPage({ params }: Props) {
  const { slug } = await params;
  const op = await getOperatorBySlug(slug);
  if (!op) notFound();

  const mailtoSubject = encodeURIComponent(`Consulta desde Outdoor Patagonia — ${op.name}`);
  const mailtoBody = encodeURIComponent(
    `Hola,\n\nEncontré tu perfil en Outdoor Patagonia y me gustaría hacer una consulta.\n\n`
  );
  const contactEmail = op.email ?? "hola@outdoorpatagonia.com";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Volver */}
      <Link
        href="/operadores"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft size={15} strokeWidth={1.5} />
        Directorio de operadores
      </Link>

      {/* Header del perfil */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        {op.logo_url ? (
          <Image
            src={op.logo_url}
            alt={op.name}
            width={96}
            height={96}
            className="rounded-2xl object-cover w-24 h-24 shrink-0"
          />
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-[var(--color-teal)]/15 flex items-center justify-center text-3xl font-bold text-[var(--color-teal)] shrink-0 font-heading">
            {op.name.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1
              className="text-2xl md:text-3xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {op.name}
            </h1>
            {op.is_featured && (
              <Badge variant="success" size="md" className="gap-1">
                <Star size={11} strokeWidth={2} />
                Destacado
              </Badge>
            )}
          </div>

          {op.location && (
            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mb-3">
              <MapPin size={14} strokeWidth={1.5} />
              {op.location}
            </p>
          )}

          {op.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {op.categories.map((cat) => (
                <Badge key={cat} variant="outline" size="md">
                  {CATEGORIES[cat] ?? cat}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="md:col-span-2 space-y-6">
          {op.description && (
            <Card variant="default">
              <CardBody>
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Sobre el operador
                </h2>
                <p className="text-sm leading-relaxed text-foreground">
                  {op.description}
                </p>
              </CardBody>
            </Card>
          )}

          {/* Formulario de contacto */}
          <Card variant="default">
            <CardBody>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Contactar
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Enviá una consulta directamente a {op.name}.
              </p>
              <a
                href={`mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail size={15} strokeWidth={1.5} />
                Enviar consulta
              </a>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar de datos */}
        <div className="space-y-4">
          <Card variant="default">
            <CardBody className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Información
              </h2>

              {op.website && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Sitio web</p>
                  <a
                    href={op.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-teal)] hover:underline flex items-center gap-1.5"
                  >
                    <Globe size={13} strokeWidth={1.5} />
                    {op.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}

              {op.phone && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Teléfono</p>
                  <a
                    href={`tel:${op.phone.replace(/\s/g, "")}`}
                    className="text-sm text-foreground hover:text-[var(--color-teal)] flex items-center gap-1.5 transition-colors"
                  >
                    <Phone size={13} strokeWidth={1.5} />
                    {op.phone}
                  </a>
                </div>
              )}

              {op.email && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <a
                    href={`mailto:${op.email}`}
                    className="text-sm text-foreground hover:text-[var(--color-teal)] flex items-center gap-1.5 transition-colors"
                  >
                    <Mail size={13} strokeWidth={1.5} />
                    {op.email}
                  </a>
                </div>
              )}

              {op.region && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Región</p>
                  <p className="text-sm flex items-center gap-1.5">
                    <MapPin size={13} strokeWidth={1.5} />
                    {op.region}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {!op.is_featured && (
            <Card variant="default" className="border-dashed">
              <CardBody>
                <p className="text-xs text-muted-foreground mb-2">
                  ¿Querés destacarte en el directorio?
                </p>
                <a
                  href="mailto:hola@outdoorpatagonia.com?subject=Quiero destacar mi operadora"
                  className="text-xs text-[var(--color-teal)] font-semibold hover:underline"
                >
                  Consultanos sobre planes destacados →
                </a>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
