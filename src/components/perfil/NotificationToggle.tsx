"use client"

import { useState, useTransition } from "react"
import { setNotificationPreference } from "@/lib/actions/notifications"

export function NotificationToggle({ type, initialEnabled }: { type: string; initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [isPending, startTransition] = useTransition()

  function toggle() {
    const next = !enabled
    setEnabled(next)
    startTransition(async () => {
      const result = await setNotificationPreference(type, next)
      if (result.error) setEnabled(!next)
    })
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={toggle}
      disabled={isPending}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-colors disabled:opacity-50 ${
        enabled ? "bg-[var(--color-teal)]" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}
