"use client"

import { useActionState } from "react"
import { CheckCircle, Send } from "lucide-react"
import { subscribeNewsletter } from "@/lib/actions/newsletter"

const T = {
  es: { done: "¡Listo! Ya estás suscripto.", honeypot: "No completar este campo", placeholder: "tu@email.com", submit: "Suscribirme" },
  en: { done: "Done! You're subscribed.", honeypot: "Leave this field empty", placeholder: "you@email.com", submit: "Subscribe" },
}

export function NewsletterForm({ lang = "es" }: { lang?: "es" | "en" }) {
  const [state, action, pending] = useActionState(subscribeNewsletter, null)
  const t = T[lang]

  if (state?.success) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--color-teal-light)]">
        <CheckCircle size={18} />
        {t.done}
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <form action={action} className="flex flex-col sm:flex-row gap-2">
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="newsletter-website">{t.honeypot}</label>
          <input type="text" id="newsletter-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="lang" value={lang} />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.placeholder}
          className="flex-1 min-w-0 rounded-xl border border-[var(--color-cream)]/20 bg-[var(--color-cream)]/5 px-4 py-2.5 text-sm text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal-light)]/40 focus:border-[var(--color-teal-light)] transition-colors"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
        >
          <Send size={14} />
          {pending ? "..." : t.submit}
        </button>
      </form>
      {state && !state.success && (
        <p className="mt-2 text-xs text-[var(--color-terracotta)]">{state.error}</p>
      )}
    </div>
  )
}
