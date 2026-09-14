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
