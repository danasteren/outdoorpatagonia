import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Check, Star, MapPin, Mail, Newspaper } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Anunciá tu operador en Patagonia",
  description:
    "Destacá tu agencia, guía o alojamiento ante viajeros que planifican su viaje a Patagonia. Ficha destacada en el directorio desde USD 40 por mes, sin permanencia.",
  openGraph: {
    title: "Anunciá tu operador en Patagonia | Outdoor Patagonia",
    description:
      "Ficha destacada en el directorio de operadores de Outdoor Patagonia, sin permanencia.",
    url: "https://outdoorpatagonia.com/anunciar",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Outdoor Patagonia, guía de viaje a la Patagonia" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://outdoorpatagonia.com/anunciar" },
};

const PLANES = [
  {
    nombre: "Destacado",
    precio: "USD 40",
    detalle: "por mes, sin permanencia",
    destacado: false,
    items: [
      "Ficha en el directorio siempre arriba de los listados gratuitos",
      "Diseño destacado con logo, descripción y contacto directo",
      "Enlace a tu sitio web y a tu WhatsApp o email",
      "Aparecés en el filtro de tu región y de tus categorías",
    ],
  },
  {
    nombre: "Destacado Plus",
    precio: "USD 80",
    detalle: "por mes, sin permanencia",
    destacado: true,
    items: [
      "Todo lo del plan Destacado",
      "Mención en el newsletter de Outdoor Patagonia una vez por mes",
      "Recomendación dentro de las guías de tu destino (parques, senderos, volcanes o termas cercanos)",
      "Prioridad para una nota o entrevista sobre tu operación",
    ],
  },
];

const PASOS = [
  {
    titulo: "Nos escribís",
    texto: "Completás el formulario con los datos de tu empresa. Sin costo ni compromiso.",
  },
  {
    titulo: "Armamos tu ficha",
    texto: "Con tu descripción, logo y contacto la publicamos, normalmente en 48 horas.",
  },
  {
    titulo: "Facturamos mensual",
    texto: "Pagás mes a mes y te podés dar de baja cuando quieras, avisando con un mensaje.",
  },
];

const FAQ = [
  {
    q: "¿A quién llega mi ficha?",
    a: "A viajeros que están planificando un viaje a la Patagonia argentina y chilena y buscan parques, senderos, volcanes, termas y operadores que los lleven. Llegan desde búsquedas de Google y desde el newsletter de Outdoor Patagonia.",
  },
  {
    q: "¿Hay permanencia mínima?",
    a: "No. El plan se paga mes a mes y podés cancelarlo cuando quieras.",
  },
  {
    q: "¿Cómo se identifica que es un espacio pago?",
    a: "Las fichas destacadas se muestran con un diseño diferenciado. Los enlaces salientes se marcan como patrocinados, tal como recomienda Google.",
  },
  {
    q: "¿Qué pasa si mi empresa ya figura en el directorio?",
    a: "Escribinos y actualizamos tu ficha existente al plan destacado, sin duplicarla.",
  },
  {
    q: "¿Cuánto tarda en publicarse?",
    a: "Con los datos completos, en unas 48 horas hábiles.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function AnunciarPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        icon={Megaphone}
        eyebrow="Para operadores"
        title="Anunciá tu operador en Patagonia"
        description="Ficha destacada en el directorio de Outdoor Patagonia, frente a viajeros que ya están armando su viaje. Desde USD 40 por mes, sin permanencia."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Anunciar" }]}
        tone="terracotta"
      />

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-16">
        <section>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Por qué anunciar acá
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Outdoor Patagonia es una guía independiente con parques nacionales, senderos,
            volcanes, termas, fauna y flora de la Patagonia. El lector que llega busca dónde ir
            y con quién ir, y ahí aparece tu ficha.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { Icon: Star, t: "Arriba del listado", d: "Las fichas destacadas van primero y con un diseño que se distingue de las gratuitas." },
              { Icon: MapPin, t: "Contexto de destino", d: "Tu ficha convive con las guías del lugar donde operás, no en una lista perdida." },
              { Icon: Newspaper, t: "Sin intermediarios", d: "El contacto va directo a vos. No cobramos comisión por reserva." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border p-6">
                <Icon size={20} strokeWidth={1.75} className="text-[var(--color-terracotta)] mb-3" />
                <h3 className="font-semibold mb-1">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Planes
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {PLANES.map((p) => (
              <div
                key={p.nombre}
                className={`rounded-2xl p-8 border ${
                  p.destacado
                    ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/5"
                    : "border-border"
                }`}
              >
                <h3 className="text-lg font-bold">{p.nombre}</h3>
                <p className="mt-2">
                  <span className="text-4xl font-bold">{p.precio}</span>{" "}
                  <span className="text-sm text-muted-foreground">{p.detalle}</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm">
                      <Check size={16} strokeWidth={2} className="text-[var(--color-teal)] mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/operadores#sumar"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-terracotta)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  <Mail size={16} />
                  Quiero el plan {p.nombre}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Cómo funciona
          </h2>
          <ol className="grid gap-5 sm:grid-cols-3">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-border p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)]">
                  Paso {i + 1}
                </span>
                <h3 className="font-semibold mt-1 mb-1">{p.titulo}</h3>
                <p className="text-sm text-muted-foreground">{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-border p-5">
                <summary className="cursor-pointer font-semibold list-none flex justify-between gap-4">
                  {q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
