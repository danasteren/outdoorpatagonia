import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ReplyBox } from "@/components/admin/ReplyBox";
import {
  Users,
  UserCheck,
  Clock,
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  LogIn,
  Mail,
  Building2,
  Bookmark,
  Map as MapIcon,
  BadgeCheck,
  BadgeX,
  Search,
} from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type ContactMessage = {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  replied_at: string | null;
};

type OperatorApplication = {
  id: string;
  created_at: string;
  empresa: string;
  contacto: string;
  email: string;
  telefono: string | null;
  sitio_web: string | null;
  pais: string;
  especialidades: string[] | null;
  descripcion: string | null;
  replied_at: string | null;
};

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

  type SearchQueryRow = { query: string; results_count: number };

  const [
    { data: contactMessagesData },
    { data: operatorApplicationsData },
    { count: savedArticlesCount },
    { count: savedItinerariesCount },
    { data: topArticlesData },
    { data: searchQueriesData },
  ] = await Promise.all([
    admin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<ContactMessage[]>(),
    admin
      .from("operator_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<OperatorApplication[]>(),
    admin.from("saved_articles").select("*", { count: "exact", head: true }),
    admin.from("saved_itineraries").select("*", { count: "exact", head: true }),
    admin.from("saved_articles").select("slug, title"),
    admin
      .from("search_queries")
      .select("query, results_count")
      .order("created_at", { ascending: false })
      .limit(1000)
      .returns<SearchQueryRow[]>(),
  ]);

  const contactMessages = contactMessagesData ?? [];
  const operatorApplications = operatorApplicationsData ?? [];

  const articleCounts = new Map<string, { title: string; count: number }>();
  for (const row of topArticlesData ?? []) {
    const existing = articleCounts.get(row.slug);
    articleCounts.set(row.slug, {
      title: row.title,
      count: (existing?.count ?? 0) + 1,
    });
  }
  const topArticles = [...articleCounts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  const searchCountMap = new Map<string, { count: number; noResults: boolean }>();
  for (const row of searchQueriesData ?? []) {
    const existing = searchCountMap.get(row.query);
    searchCountMap.set(row.query, {
      count: (existing?.count ?? 0) + 1,
      noResults: row.results_count === 0,
    });
  }
  const topSearches = [...searchCountMap.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 15);
  const zeroResultSearches = [...searchCountMap.entries()]
    .filter(([, v]) => v.noResults)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

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
                  Email
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
                    <td className="px-4 py-3">
                      {u.email_confirmed_at ? (
                        <span className="inline-flex items-center gap-1 text-xs text-teal">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          Confirmado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <BadgeX className="w-3.5 h-3.5" />
                          Sin confirmar
                        </span>
                      )}
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

      {/* Contenido guardado */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <StatCard
          icon={<Bookmark className="w-5 h-5" />}
          label="Artículos guardados"
          value={savedArticlesCount ?? 0}
        />
        <StatCard
          icon={<MapIcon className="w-5 h-5" />}
          label="Itinerarios guardados"
          value={savedItinerariesCount ?? 0}
        />
      </div>

      {topArticles.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden mb-10">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <Bookmark className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-medium text-sm">Artículos más guardados</h2>
          </div>
          <ul className="divide-y divide-border">
            {topArticles.map(([slug, { title, count }]) => (
              <li
                key={slug}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="truncate">{title}</span>
                <span className="text-muted-foreground tabular-nums shrink-0 ml-3">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mensajes de contacto */}
      <div className="rounded-xl border border-border overflow-hidden mb-10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-medium text-sm">
            Mensajes de contacto ({contactMessages.length})
          </h2>
        </div>
        {contactMessages.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted-foreground">
            No hay mensajes todavía.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {contactMessages.map((m) => (
              <li key={m.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{m.asunto}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {m.nombre} · {m.email} ·{" "}
                      <span title={formatDate(m.created_at)}>
                        {timeAgo(m.created_at)}
                      </span>
                    </p>
                    <p className="text-sm mt-1.5 whitespace-pre-wrap">
                      {m.mensaje}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <ReplyBox
                      source="contact"
                      id={m.id}
                      to={m.email}
                      defaultSubject={`Re: ${m.asunto}`}
                      alreadyReplied={!!m.replied_at}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Búsquedas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <Search className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-medium text-sm">
              Búsquedas más frecuentes ({searchCountMap.size} únicas)
            </h2>
          </div>
          {topSearches.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">
              Aún no hay búsquedas registradas.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {topSearches.map(([q, { count }]) => (
                <li
                  key={q}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                >
                  <span className="truncate">{q}</span>
                  <span className="text-muted-foreground tabular-nums shrink-0 ml-3">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <Search className="w-4 h-4 text-orange-400" />
            <h2 className="font-medium text-sm text-orange-600 dark:text-orange-400">
              Sin resultados — contenido que falta
            </h2>
          </div>
          {zeroResultSearches.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">
              Todo lo que buscaron tuvo resultados.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {zeroResultSearches.map(([q, { count }]) => (
                <li
                  key={q}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                >
                  <span className="truncate text-orange-600 dark:text-orange-400">{q}</span>
                  <span className="text-muted-foreground tabular-nums shrink-0 ml-3">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Solicitudes de operadores */}
      <div className="rounded-xl border border-border overflow-hidden mb-10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-medium text-sm">
            Solicitudes de operadores ({operatorApplications.length})
          </h2>
        </div>
        {operatorApplications.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted-foreground">
            No hay solicitudes todavía.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {operatorApplications.map((a) => (
              <li key={a.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {a.empresa} · {a.pais}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {a.contacto} · {a.email}
                      {a.telefono ? ` · ${a.telefono}` : ""} ·{" "}
                      <span title={formatDate(a.created_at)}>
                        {timeAgo(a.created_at)}
                      </span>
                    </p>
                    {a.sitio_web && (
                      <a
                        href={a.sitio_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-teal hover:underline"
                      >
                        {a.sitio_web} ↗
                      </a>
                    )}
                    {a.especialidades && a.especialidades.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {a.especialidades.join(", ")}
                      </p>
                    )}
                    {a.descripcion && (
                      <p className="text-sm mt-1.5 whitespace-pre-wrap">
                        {a.descripcion}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <ReplyBox
                      source="operator"
                      id={a.id}
                      to={a.email}
                      defaultSubject={`Re: solicitud de ${a.empresa} — Outdoor Patagonia`}
                      alreadyReplied={!!a.replied_at}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
