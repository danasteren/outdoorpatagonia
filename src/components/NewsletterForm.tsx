"use client"

import { useActionState } from "react"
import { CheckCircle, Send } from "lucide-react"
import { subscribeNewsletter } from "@/lib/actions/newsletter"

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, null)

  if (state?.success) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--color-teal-light)]">
        <CheckCircle size={18} />
        ¡Listo! Ya estás suscripto.
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <form action={action} className="flex flex-col sm:flex-row gap-2">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="flex-1 min-w-0 rounded-xl border border-[var(--color-cream)]/20 bg-[var(--color-cream)]/5 px-4 py-2.5 text-sm text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal-light)]/40 focus:border-[var(--color-teal-light)] transition-colors"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
        >
          <Send size={14} />
          {pending ? "..." : "Suscribirme"}
        </button>
      </form>
      {state && !state.success && (
        <p className="mt-2 text-xs text-[var(--color-terracotta)]">{state.error}</p>
      )}
    </div>
  )
}
