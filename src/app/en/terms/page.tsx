import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Outdoor Patagonia",
  description: "Terms and conditions for using the Outdoor Patagonia website.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en/terms",
    languages: { es: "https://outdoorpatagonia.com/terminos" },
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Terms of Use
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <p>
          Welcome to <strong>Outdoor Patagonia</strong>. By using this site, you agree to comply
          with the following terms.
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-3">Use of the site</h2>
          <p>
            You may use this site for personal, non-commercial purposes, provided you comply with
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Intellectual property</h2>
          <p>
            All content on this site — texts, photographs, graphics and logos — is the property of
            Outdoor Patagonia and is protected by intellectual property laws. Reproduction without
            express authorization is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Limitation of liability</h2>
          <p>
            Outdoor Patagonia is not responsible for any damages resulting from the use of this
            site or information published on it. Content is informational and does not replace
            professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">External links</h2>
          <p>
            This site may contain links to third-party sites. We are not responsible for the
            content or privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Modifications</h2>
          <p>
            We may update these terms at any time. Changes are effective upon publication on this
            site.
          </p>
        </section>

        <p>
          Have a question?{" "}
          <a
            href="mailto:info@outdoorpatagonia.com"
            className="text-[var(--color-teal)] hover:underline"
          >
            Write to us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
