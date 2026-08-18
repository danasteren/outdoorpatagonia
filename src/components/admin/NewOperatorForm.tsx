"use client"

import { useActionState, useState } from "react"
import { CheckCircle, Plus, Send, X } from "lucide-react"
import { createOperator } from "@/lib/actions/operators"
import { REGIONS, CATEGORIES } from "@/lib/operators/types"

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"

const labelCls = "text-xs font-semibold uppercase tracking-wider text-muted-foreground"

export function NewOperatorForm() {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(createOperator, null)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-teal text-white hover:opacity-90 transition-opacity"
      >
        <Plus className="w-4 h-4" />
        Nuevo operador
      </button>
    )
  }

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card">
        <CheckCircle className="w-5 h-5 text-teal shrink-0" />
        <p className="text-sm">Operador publicado en el directorio.</p>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-xs text-muted-foreground hover:text-foreground"
        >
          Cerrar
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Cargar operador</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-name" className={labelCls}>
              Nombre de la empresa *
            </label>
            <input id="op-name" name="name" type="text" required placeholder="Ej: Patagonia Aventuras" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-location" className={labelCls}>
              Ubicación
            </label>
            <input id="op-location" name="location" type="text" placeholder="Ej: El Chaltén" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-region" className={labelCls}>
              Región
            </label>
            <select id="op-region" name="region" className={inputCls}>
              <option value="">Seleccioná</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-phone" className={labelCls}>
              Teléfono
            </label>
            <input id="op-phone" name="phone" type="tel" placeholder="+54 9 ..." className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-email" className={labelCls}>
              Email
            </label>
            <input id="op-email" name="email" type="email" placeholder="hola@empresa.com" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-website" className={labelCls}>
              Sitio web
            </label>
            <input id="op-website" name="website" type="url" placeholder="https://empresa.com" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-logo" className={labelCls}>
              URL del logo
            </label>
            <input id="op-logo" name="logo_url" type="url" placeholder="https://..." className={inputCls} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className={labelCls}>Actividades</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input type="checkbox" name="categories" value={key} className="accent-teal w-4 h-4 rounded" />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-desc" className={labelCls}>
            Descripción breve
          </label>
          <textarea id="op-desc" name="description" rows={3} placeholder="Qué hacen, dónde operan..." className={inputCls + " resize-none"} />
        </div>

        <div className="border-t border-border pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 pt-1">
            <input id="op-featured" name="is_featured" type="checkbox" className="accent-teal w-4 h-4 rounded" />
            <label htmlFor="op-featured" className="text-sm font-medium">
              Destacado
            </label>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-price" className={labelCls}>
              Precio mensual (USD)
            </label>
            <input id="op-price" name="price_monthly" type="number" min="0" step="1" placeholder="50" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="op-until" className={labelCls}>
              Pagado hasta
            </label>
            <input id="op-until" name="featured_until" type="date" className={inputCls} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="op-notes" className={labelCls}>
            Notas internas (forma de pago, seguimiento)
          </label>
          <textarea id="op-notes" name="notes" rows={2} placeholder="Ej: paga por transferencia, renovar por email" className={inputCls + " resize-none"} />
        </div>

        {state && !state.success && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {pending ? "Publicando..." : "Publicar operador"}
        </button>
      </form>
    </div>
  )
}
