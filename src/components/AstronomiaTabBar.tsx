"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

export type AstronomiaTab<K extends string> = { key: K; label: string; icon: LucideIcon }

export function AstronomiaTabBar<K extends string>({
  tabs,
  activeTab,
  defaultTab,
}: {
  tabs: AstronomiaTab<K>[]
  activeTab: K
  defaultTab: K
}) {
  const activeRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" as ScrollBehavior })
  }, [activeTab])

  return (
    <div className="flex gap-1 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain">
      {tabs.map((t) => {
        const isActive = t.key === activeTab
        const Icon = t.icon
        return (
          <Link
            key={t.key}
            ref={isActive ? activeRef : undefined}
            href={t.key === defaultTab ? "/astronomia" : `/astronomia?tab=${t.key}`}
            className={`flex shrink-0 items-center gap-1.5 px-4 py-3.5 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
              isActive
                ? "border-b-2 -mb-px border-[var(--color-teal)] text-[var(--color-teal)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} strokeWidth={1.5} />
            {t.label}
          </Link>
        )
      })}
    </div>
  )
}
