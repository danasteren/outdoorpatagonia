import { headers } from "next/headers"
import { createAdminClient } from "@/lib/supabase/admin"

export async function getClientIp(): Promise<string | null> {
  const h = await headers()
  const forwardedFor = h.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0].trim()
  return h.get("x-real-ip")
}

// Cuenta envíos recientes por email y por IP contra la propia tabla (persiste
// entre invocaciones serverless, a diferencia de un rate limit en memoria).
export async function isRateLimited({
  table,
  email,
  ip,
  windowMs = 60 * 60 * 1000,
  maxByEmail,
  maxByIp,
}: {
  table: "contact_messages" | "subscribers"
  email?: string
  ip: string | null
  windowMs?: number
  maxByEmail?: number
  maxByIp: number
}): Promise<boolean> {
  const admin = createAdminClient()
  const since = new Date(Date.now() - windowMs).toISOString()

  if (email && maxByEmail) {
    const { count } = await admin
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", since)
    if ((count ?? 0) >= maxByEmail) return true
  }

  if (ip) {
    const { count } = await admin
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", since)
    if ((count ?? 0) >= maxByIp) return true
  }

  return false
}

// Dominios de lead-gen conocidos. Además se bloquea cualquier dominio cuyo
// nombre contenga "leadgen" o "b2bdata" (siguen rotando de dominio).
// scripts/list_spam_contact_messages.py repite estas listas: mantenerlas iguales.
export const SPAM_EMAIL_DOMAINS = [
  "ultraleadgeneration.com",
  "amazingleadgen.com",
  "boostleadgen.com",
  "freeb2bdata.org",
]
export const SPAM_DOMAIN_PATTERNS = ["leadgen", "b2bdata"]

const SPAM_PHRASES = [
  "lead generation",
  "guest post",
  "backlinks",
  "seo services",
  "business email list",
]

// Heurística de spam de lead-gen. Si da true, el action responde éxito sin
// guardar ni notificar (para no delatar el filtro).
export function looksLikeSpam({
  email,
  asunto,
  mensaje,
}: {
  email: string
  asunto: string
  mensaje: string
}): boolean {
  const domain = email.split("@").pop()?.trim().toLowerCase() ?? ""
  if (
    SPAM_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith("." + d)) ||
    SPAM_DOMAIN_PATTERNS.some((p) => domain.includes(p))
  ) {
    return true
  }

  const urls = mensaje.match(/https?:\/\/|www\./gi) ?? []
  if (urls.length >= 2) return true

  const text = `${asunto} ${mensaje}`.toLowerCase()
  return SPAM_PHRASES.some((p) => text.includes(p))
}

// Verifica el token de Cloudflare Turnstile contra siteverify.
// Sin TURNSTILE_SECRET_KEY: en producción falla; fuera de producción avisa y saltea.
export async function verifyTurnstile(
  token: string | undefined,
  ip: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY no está seteada: se saltea la verificación (solo dev).")
      return true
    }
    console.error("[turnstile] TURNSTILE_SECRET_KEY no está seteada en producción.")
    return false
  }
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set("remoteip", ip)
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch (err) {
    console.error("[turnstile] error al verificar:", err)
    return false
  }
}
