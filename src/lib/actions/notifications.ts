"use server"

import { createClient } from "@/lib/supabase/server"
import { NOTIFICATION_TYPES } from "@/lib/notifications/types"

export async function getNotificationPreferences() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return {}

  const { data } = await supabase
    .from("notification_preferences")
    .select("type, enabled")
    .eq("user_id", user.id)

  const saved = new Map((data ?? []).map((row) => [row.type, row.enabled as boolean]))

  return Object.fromEntries(
    NOTIFICATION_TYPES.map((t) => [t.id, saved.get(t.id) ?? t.defaultEnabled])
  ) as Record<string, boolean>
}

export async function setNotificationPreference(type: string, enabled: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "no_auth" as const }

  const { error } = await supabase
    .from("notification_preferences")
    .upsert({ user_id: user.id, type, enabled }, { onConflict: "user_id,type" })

  if (error) return { error: "db_error" as const }
  return { ok: true as const }
}
