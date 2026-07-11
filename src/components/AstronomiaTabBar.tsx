"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Moon, Sparkles, CalendarDays, MapPin, Telescope } from "lucide-react"
import { TAB_KEYS, TAB_LABELS, type TabKey } from "@/lib/astronomia-tabs"

const TAB_ICONS: Record<TabKey, typeof Moon> = {
  hoy: Moon,
  meteoros: Sparkles,
  eventos: CalendarDays,
  cielos: MapPin,
  constelaciones: Telescope,
}

export function AstronomiaTabBar({ activeTab }: { activeTab: TabKey }) {
  const activeRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" as ScrollBehavior })
  }, [activeTab])

  return (
    <div className="flex gap-1 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain">
      {TAB_KEYS.map((key) => {
        const isActive = key === activeTab
        const Icon = TAB_ICONS[key]
        return (
          <Link
            key={key}
            ref={isActive ? activeRef : undefined}
            href={key === "hoy" ? "/astronomia" : `/astronomia?tab=${key}`}
            className={`flex shrink-0 items-center gap-1.5 px-4 py-3.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
              isActive
                ? "border-b-2 -mb-px border-[var(--color-teal)] text-[var(--color-teal)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} strokeWidth={1.5} />
            {TAB_LABELS[key]}
          </Link>
        )
      })}
    </div>
  )
}
