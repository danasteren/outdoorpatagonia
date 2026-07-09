import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Bell } from 'lucide-react'
import { getNotificationPreferences } from '@/lib/actions/notifications'
import { NotificationToggle } from '@/components/perfil/NotificationToggle'
import { NOTIFICATION_TYPES } from '@/lib/notifications/types'

export const metadata = {
  title: 'Notificaciones — Outdoor Patagonia',
}

export default async function NotificacionesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const preferences = await getNotificationPreferences()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/perfil"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={12} strokeWidth={2} />
        Volver a mi perfil
      </Link>

      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-8 h-8 rounded-xl bg-[var(--color-teal)]/10 flex items-center justify-center">
          <Bell size={15} strokeWidth={1.5} className="text-[var(--color-teal)]" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Notificaciones</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Elegí qué alertas querés recibir por correo cuando salga algo nuevo.
      </p>

      <ul className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
        {NOTIFICATION_TYPES.map((type) => (
          <li key={type.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{type.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
            </div>
            <NotificationToggle type={type.id} initialEnabled={preferences[type.id] ?? type.defaultEnabled} />
          </li>
        ))}
      </ul>
    </div>
  )
}
