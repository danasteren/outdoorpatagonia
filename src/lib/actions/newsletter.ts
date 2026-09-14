"use server"

import { createClient } from "@/lib/supabase/server"
import { getClientIp, isRateLimited } from "@/lib/antispam"

export type NewsletterState = { success: true } | { success: false; error: string } | null

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // Honeypot: campo invisible para humanos. Si viene completo, es un bot —
  // devolvemos éxito sin suscribir a nadie para no delatar el filtro.
  if (formData.get("website")?.toString().trim()) {
    return { success: true }
  }

  const email = formData.get("email")?.toString().trim()

  if (!email) {
    return { success: false, error: "Ingresá tu email." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "El email no es válido." }
  }

  const ip = await getClientIp()
  // El email es único en la tabla (no hace falta límite por email); la señal
  // de spam acá es un mismo IP dando de alta muchos emails distintos.
  if (await isRateLimited({ table: "subscribers", ip, maxByIp: 5 })) {
    return { success: false, error: "Demasiadas suscripciones desde tu conexión. Probá de nuevo más tarde." }
  }

  const supabase = await createClient()
  const { error } = await supabase.rpc("subscribe_email", { p_email: email, p_ip: ip })

  if (error) return { success: false, error: "No pudimos suscribirte. Intentá de nuevo." }
  return { success: true }
}
