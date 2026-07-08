"use server"

import { createClient } from "@/lib/supabase/server"

export type NewsletterState = { success: true } | { success: false; error: string } | null

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get("email")?.toString().trim()

  if (!email) {
    return { success: false, error: "Ingresá tu email." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "El email no es válido." }
  }

  const supabase = await createClient()
  const { error } = await supabase.rpc("subscribe_email", { p_email: email })

  if (error) return { success: false, error: "No pudimos suscribirte. Intentá de nuevo." }
  return { success: true }
}
