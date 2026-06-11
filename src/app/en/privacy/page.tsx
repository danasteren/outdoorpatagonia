import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Outdoor Patagonia",
  description: "How we collect, use and protect your personal information at Outdoor Patagonia.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en/privacy",
    languages: { es: "https://outdoorpatagonia.com/privacidad" },
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Privacy Policy
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <p>
          At <strong>Outdoor Patagonia</strong>, we value your privacy and are committed to
          protecting your personal data. This policy explains how we collect, use and protect your
          information.
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-3">Information we collect</h2>
          <p>
            We collect information you provide directly (name, email address) when you register or
            contact us. We also automatically collect browsing data and technical cookies necessary
            for the site to function.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">How we use your information</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To provide you with the services you request.</li>
            <li>To improve our site and personalize your experience.</li>
            <li>To send you our newsletter, if you opted in.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Protecting your information</h2>
          <p>
            We implement security measures to protect your personal data against unauthorized
            access, alteration or disclosure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Your rights</h2>
          <p>
            You have the right to access, correct or delete your personal information. To exercise
            these rights,{" "}
            <a
              href="mailto:info@outdoorpatagonia.com"
              className="text-[var(--color-teal)] hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
