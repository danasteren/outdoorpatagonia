import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Outdoor Patagonia",
  description:
    "Cómo recopilamos, usamos y protegemos tu información personal en Outdoor Patagonia.",
  alternates: { canonical: "https://outdoorpatagonia.com/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Política de Privacidad
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <p>
          En <strong>Outdoor Patagonia</strong>, valoramos tu privacidad y nos comprometemos a
          proteger tus datos personales. Esta política explica cómo recopilamos, usamos y
          protegemos tu información.
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-3">Información que recopilamos</h2>
          <p>
            Recopilamos información que nos proporcionás directamente (nombre, correo electrónico)
            cuando te registrás o nos contactás. También recopilamos automáticamente datos de
            navegación y cookies técnicas necesarias para el funcionamiento del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Cómo usamos tu información</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Para brindarte acceso a los servicios que solicitás.</li>
            <li>Para mejorar nuestro sitio y personalizar tu experiencia.</li>
            <li>Para enviarte el newsletter, si optaste por recibirlo.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Inicio de sesión con Google</h2>
          <p>
            Si iniciás sesión con Google, recibimos únicamente tu nombre, correo electrónico y foto
            de perfil. No accedemos a ningún otro dato de tu cuenta de Google. La autenticación está
            gestionada por <strong>Supabase</strong> y <strong>Google OAuth 2.0</strong>, sujetos a
            sus propias políticas de privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Protección de tu información</h2>
          <p>
            Implementamos medidas de seguridad para proteger tus datos personales contra acceso no
            autorizado, alteración o divulgación.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Tus derechos</h2>
          <p>
            Tenés derecho a acceder, rectificar o eliminar tu información personal. Para ejercer
            estos derechos,{" "}
            <a
              href="mailto:info@outdoorpatagonia.com"
              className="text-[var(--color-teal)] hover:underline"
            >
              contáctanos
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
