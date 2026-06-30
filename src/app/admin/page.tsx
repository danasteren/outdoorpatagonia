import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  Users,
  UserCheck,
  Clock,
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  LogIn,
} from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin — Outdoor Patagonia",
  robots: { index: false, follow: false },
};

const ADMIN_EMAIL = "danasteren@gmail.com";

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 2) return "ahora";
  if (minutes < 60) return `hace ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days}d`;
  const months = Math.floor(days / 30);
  return `hace ${months} mes${months > 1 ? "es" : ""}`;
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
      <div className="p-2 rounded-lg bg-muted text-teal">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) notFound();

  const admin = createAdminClient();
  const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const users = usersData?.users ?? [];

  const now = Date.now();
  const ms30d = 30 * 24 * 60 * 60 * 1000;
  const nuevos = users.filter(
    (u) => u.created_at && now - new Date(u.created_at).getTime() < ms30d
  ).length;
  const activos = users.filter(
    (u) =>
      u.last_sign_in_at &&
      now - new Date(u.last_sign_in_at).getTime() < ms30d
  ).length;

  const sorted = [...users].sort((a, b) => {
    const at = a.last_sign_in_at ? new Date(a.last_sign_in_at).getTime() : 0;
    const bt = b.last_sign_in_at ? new Date(b.last_sign_in_at).getTime() : 0;
    return bt - at;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-7 h-7 text-teal" />
        <div>
          <h1 className="text-2xl font-semibold">Panel de administración</h1>
          <p className="text-sm text-muted-foreground">
            Acceso restringido · {user.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Usuarios totales"
          value={users.length}
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Nuevos (30 días)"
          value={nuevos}
        />
        <StatCard
          icon={<UserCheck className="w-5 h-5" />}
          label="Activos (30 días)"
          value={activos}
        />
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-teal transition-colors group"
        >
          <div className="p-2 rounded-lg bg-muted text-teal">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Métricas</p>
            <p className="font-semibold text-sm group-hover:text-teal transition-colors">
              Google Analytics ↗
            </p>
          </div>
        </a>
      </div>

      {/* Users table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
          <LogIn className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-medium text-sm">
            Usuarios registrados ({users.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-left">
                <th className="px-4 py-2 text-muted-foreground font-medium w-8">
                  #
                </th>
                <th className="px-4 py-2 text-muted-foreground font-medium">
                  Usuario
                </th>
                <th className="px-4 py-2 text-muted-foreground font-medium">
                  Proveedor
                </th>
                <th className="px-4 py-2 text-muted-foreground font-medium">
                  Registrado
                </th>
                <th className="px-4 py-2 text-muted-foreground font-medium">
                  Último login
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((u, i) => {
                const name =
                  (u.user_metadata?.full_name as string | undefined) ||
                  (u.user_metadata?.name as string | undefined) ||
                  "—";
                const provider =
                  (u.app_metadata?.provider as string | undefined) || "email";
                const avatar = u.user_metadata?.avatar_url as
                  | string
                  | undefined;
                const initial = (u.email ?? "?")[0].toUpperCase();

                return (
                  <tr
                    key={u.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={avatar}
                            alt={name}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground flex-shrink-0">
                            {initial}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium leading-tight truncate">
                            {name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          provider === "google"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {provider === "google" ? "Google" : "Email"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      <span title={formatDate(u.created_at)}>
                        {timeAgo(u.created_at)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span title={formatDate(u.last_sign_in_at)}>
                          {timeAgo(u.last_sign_in_at)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
