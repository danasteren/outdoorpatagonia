"use client"

import { useActionState } from "react"
import { CheckCircle, Send } from "lucide-react"
import { submitContactForm } from "@/lib/actions/forms"

const ASUNTOS = [
  "Consulta general",
  "Sugerencia de contenido",
  "Propuesta de colaboración",
  "Otro",
]

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/40 focus:border-[var(--color-teal)] transition-colors"

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, null)

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <CheckCircle size={40} className="text-[var(--color-teal)]" />
        <p className="text-lg font-semibold text-foreground">¡Mensaje recibido!</p>
        <p className="text-muted-foreground text-sm max-w-xs">
          Te respondemos en las próximas 48 horas.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Nombre <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@email.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="asunto" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Asunto <span className="text-[var(--color-terracotta)]">*</span>
        </label>
        <select id="asunto" name="asunto" required className={inputCls}>
          <option value="">Seleccioná un asunto</option>
          {ASUNTOS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Mensaje <span className="text-[var(--color-terracotta)]">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Contanos en qué podemos ayudarte..."
          className={inputCls + " resize-none"}
        />
      </div>

      {state && !state.success && (
        <p className="text-sm text-[var(--color-terracotta)]">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Send size={15} />
        {pending ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  )
}
