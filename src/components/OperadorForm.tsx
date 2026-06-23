"use client"

import { useActionState } from "react"
import { CheckCircle, Send } from "lucide-react"
import { submitOperatorApplication } from "@/lib/actions/forms"

const ESPECIALIDADES = [
  "Trekking",
  "Kayak / Rafting",
  "Escalada",
  "Cabalgatas",
  "Ski / Snowboard",
  "Buceo",
  "Avistamiento de fauna",
  "Turismo cultural",
  "Fly fishing",
  "Otro",
]

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/40 focus:border-[var(--color-teal)] transition-colors"

export function OperadorForm() {
  const [state, action, pending] = useActionState(submitOperatorApplication, null)

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle size={40} className="text-[var(--color-teal)]" />
        <p className="text-lg font-semibold text-foreground">¡Solicitud enviada!</p>
        <p className="text-muted-foreground text-sm max-w-xs">
          Revisamos tu información y te contactamos en los próximos días.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-5 text-left">
      {/* Empresa y contacto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-empresa" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Nombre de la empresa <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <input
            id="op-empresa"
            name="empresa"
            type="text"
            required
            placeholder="Ej: Patagonia Aventuras"
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-contacto" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Nombre del contacto <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <input
            id="op-contacto"
            name="contacto"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputCls}
          />
        </div>
      </div>

      {/* Email, teléfono y país */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <input
            id="op-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="hola@empresa.com"
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-tel" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Teléfono
          </label>
          <input
            id="op-tel"
            name="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="+54 9 11 ..."
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-pais" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            País <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <select id="op-pais" name="pais" required className={inputCls}>
            <option value="">Seleccioná</option>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
          </select>
        </div>
      </div>

      {/* Sitio web */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="op-web" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sitio web
        </label>
        <input
          id="op-web"
          name="sitio_web"
          type="url"
          autoComplete="url"
          placeholder="https://tuempresa.com"
          className={inputCls}
        />
      </div>

      {/* Especialidades */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Especialidades
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ESPECIALIDADES.map((esp) => (
            <label
              key={esp}
              className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none"
            >
              <input
                type="checkbox"
                name="especialidades"
                value={esp}
                className="accent-[var(--color-teal)] w-4 h-4 rounded"
              />
              {esp}
            </label>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="op-desc" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Descripción breve
        </label>
        <textarea
          id="op-desc"
          name="descripcion"
          rows={4}
          placeholder="Contanos qué hacen, dónde operan y qué ofrecen a los viajeros..."
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
        {pending ? "Enviando..." : "Enviar solicitud"}
      </button>

      <p className="text-xs text-muted-foreground">
        Listing básico gratuito. Posición destacada con badge visual desde $50/mes.
      </p>
    </form>
  )
}
