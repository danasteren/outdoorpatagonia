"use server"

import { createClient } from "@/lib/supabase/server"
import { getClientIp, isRateLimited } from "@/lib/antispam"

export type NewsletterState = { success: true } | { success: false; error: string } | null

const ERRORS = {
  es: {
    empty: "Ingresá tu email.",
    invalid: "El email no es válido.",
    rateLimited: "Demasiadas suscripciones desde tu conexión. Probá de nuevo más tarde.",
    failed: "No pudimos suscribirte. Intentá de nuevo.",
  },
  en: {
    empty: "Enter your email.",
    invalid: "That email isn't valid.",
    rateLimited: "Too many sign-ups from your connection. Please try again later.",
    failed: "We couldn't subscribe you. Please try again.",
  },
}

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // Honeypot: campo invisible para humanos. Si viene completo, es un bot —
  // devolvemos éxito sin suscribir a nadie para no delatar el filtro.
  if (formData.get("website")?.toString().trim()) {
    return { success: true }
  }

  const t = ERRORS[formData.get("lang") === "en" ? "en" : "es"]
  const email = formData.get("email")?.toString().trim()

  if (!email) {
    return { success: false, error: t.empty }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: t.invalid }
  }

  const ip = await getClientIp()
  // El email es único en la tabla (no hace falta límite por email); la señal
  // de spam acá es un mismo IP dando de alta muchos emails distintos.
  if (await isRateLimited({ table: "subscribers", ip, maxByIp: 5 })) {
    return { success: false, error: t.rateLimited }
  }

  const supabase = await createClient()
  const { error } = await supabase.rpc("subscribe_email", { p_email: email, p_ip: ip })

  if (error) return { success: false, error: t.failed }
  return { success: true }
}
