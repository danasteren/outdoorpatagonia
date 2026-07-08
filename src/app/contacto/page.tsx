import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Outdoor Patagonia",
  description:
    "¿Tenés una consulta, sugerencia o propuesta? Escribinos a Outdoor Patagonia.",
  alternates: { canonical: "https://outdoorpatagonia.com/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        icon={Mail}
        eyebrow="Contacto"
        title="Nos interesa tu opinión"
        description="¿Tenés una consulta, sugerencia o propuesta de colaboración? Mandanos un mensaje y te respondemos a la brevedad."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        tone="teal"
      />
      <div className="max-w-2xl mx-auto px-4 py-14">
        <ContactForm />
      </div>
    </div>
  );
}
