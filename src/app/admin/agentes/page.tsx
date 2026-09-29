import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Bot,
  CalendarClock,
  CircleCheck,
  CircleX,
  ExternalLink,
  Eye,
  FileText,
  History,
  Newspaper,
  Search,
  TriangleAlert,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAgentPrs, hasGithubToken, type AgentKind, type AgentPr } from "@/lib/agentes/github";
import { AgentPrActions } from "@/components/admin/AgentPrActions";

export const metadata: Metadata = {
  title: "Agentes — Admin",
  robots: { index: false, follow: false },
};

const ADMIN_EMAIL = "danasteren@gmail.com";

const AGENTS: Record<
  Exclude<AgentKind, "otro"> | "newsletter",
  { name: string; does: string; icon: ReactNode; routineUrl: string }
> = {
  contenido: {
    name: "Contenido",
    does: "Busca qué se busca en Google y escribe o mejora entradas.",
    icon: <FileText className="w-5 h-5" />,
    routineUrl: "https://claude.ai/code/routines/trig_01MtQzMw3yhGcjfLgNWQzfQC",
  },
  titulos: {
    name: "Títulos en Google",
    does: "Reescribe títulos y descripciones de páginas con pocos clics.",
    icon: <Search className="w-5 h-5" />,
    routineUrl: "https://claude.ai/code/routines/trig_018sMnZzcAJD4dg42NabCZov",
  },
  newsletter: {
    name: "Newsletter",
    does: "Arma el borrador semanal con las novedades del sitio.",
    icon: <Newspaper className="w-5 h-5" />,
    routineUrl: "https://claude.ai/code/routines/trig_01Acb1XD3UHgbZXLb5EuA1E7",
  },
};

// Routines fire Mondays 11:00 UTC (08:00 Argentina).
function nextMonday(now = new Date()): Date {
  const next = new Date(now);
  next.setUTCHours(11, 0, 0, 0);
  const daysAhead = (1 - next.getUTCDay() + 7) % 7;
  next.setUTCDate(next.getUTCDate() + daysAhead);
  if (next <= now) next.setUTCDate(next.getUTCDate() + 7);
  return next;
}

function formatDate(dateStr: string | Date | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATE_BADGE: Record<AgentPr["state"], { label: string; className: string; icon: ReactNode }> = {
  open: { label: "Esperando tu OK", className: "bg-amber-500/15 text-amber-600", icon: <CalendarClock className="w-3.5 h-3.5" /> },
  merged: { label: "Publicado", className: "bg-teal/15 text-teal", icon: <CircleCheck className="w-3.5 h-3.5" /> },
  closed: { label: "Descartado", className: "bg-muted text-muted-foreground", icon: <CircleX className="w-3.5 h-3.5" /> },
};

function StateBadge({ state }: { state: AgentPr["state"] }) {
  const b = STATE_BADGE[state];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${b.className}`}>
      {b.icon}
      {b.label}
    </span>
  );
}

// GitHub already sanitizes body_html; these selectors only style it.
const BODY_CLASSES =
  "text-sm leading-relaxed overflow-x-auto [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_a]:text-teal [&_a]:underline [&_code]:text-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_table]:w-full [&_table]:my-3 [&_table]:text-xs [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted [&_th]:p-2 [&_th]:border [&_th]:border-border [&_td]:p-2 [&_td]:border [&_td]:border-border [&_td]:align-top";

function PendingCard({ pr }: { pr: AgentPr }) {
  const agent = pr.agent === "otro" ? null : AGENTS[pr.agent];
  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden">
      <header className="flex flex-wrap items-start justify-between gap-3 p-4 border-b border-border">
        <div className="flex items-start gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-muted text-teal shrink-0">{agent?.icon ?? <Bot className="w-5 h-5" />}</div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {agent?.name ?? "Agente"} · {formatDate(pr.createdAt)}
            </p>
            <h3 className="font-semibold">{pr.title}</h3>
          </div>
        </div>
        <StateBadge state={pr.state} />
      </header>

      <div className={`p-4 ${BODY_CLASSES}`} dangerouslySetInnerHTML={{ __html: pr.bodyHtml }} />

      <footer className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-border bg-muted/40">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {pr.previewUrl ? (
            <a href={pr.previewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-teal hover:underline">
              <Eye className="w-4 h-4" />
              Ver cómo queda
            </a>
          ) : (
            <span className="text-muted-foreground">Vista previa todavía no disponible</span>
          )}
          <a href={pr.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <ExternalLink className="w-4 h-4" />
            Detalle técnico
          </a>
        </div>
        <AgentPrActions number={pr.number} />
      </footer>
    </article>
  );
}

export default async function AdminAgentesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) notFound();

  const { open, recent, error } = await getAgentPrs();
  const all = [...open, ...recent];
  const lastByAgent = (kind: AgentKind) => all.find((pr) => pr.agent === kind);
  const tokenReady = hasGithubToken();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Admin
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Bot className="w-7 h-7 text-teal" />
        <div>
          <h1 className="text-2xl font-semibold">Agentes</h1>
          <p className="text-sm text-muted-foreground">
            Próxima corrida: {formatDate(nextMonday())}
          </p>
        </div>
      </div>

      {!tokenReady && (
        <div className="flex items-start gap-3 p-4 mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 text-sm">
          <TriangleAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            Los botones <strong>Publicar</strong> y <strong>Descartar</strong> necesitan la variable{" "}
            <code className="text-xs bg-muted px-1 rounded">GITHUB_TOKEN</code> en Vercel. Mientras tanto podés ver todo.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 mb-6 rounded-xl border border-destructive/40 bg-destructive/10 text-sm">
          <TriangleAlert className="w-5 h-5 text-destructive shrink-0" />
          <p>No se pudo leer la actividad de los agentes ({error}).</p>
        </div>
      )}

      {/* Agents */}
      <section className="grid gap-3 sm:grid-cols-3 mb-10">
        {(Object.keys(AGENTS) as (keyof typeof AGENTS)[]).map((kind) => {
          const a = AGENTS[kind];
          const last = kind === "newsletter" ? undefined : lastByAgent(kind);
          return (
            <div key={kind} className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-muted text-teal">{a.icon}</div>
                <h2 className="font-semibold">{a.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{a.does}</p>
              <div className="mt-auto pt-2 text-xs text-muted-foreground">
                {last ? (
                  <span className="inline-flex items-center gap-2">
                    Último: {formatDate(last.createdAt)} <StateBadge state={last.state} />
                  </span>
                ) : kind === "newsletter" ? (
                  "El borrador queda en claude.ai"
                ) : (
                  "Todavía sin entregas"
                )}
              </div>
              <a href={a.routineUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-teal hover:underline">
                Ver ejecuciones
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </section>

      {/* Pending */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <CalendarClock className="w-5 h-5 text-teal" />
          Esperando tu OK
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{open.length}</span>
        </h2>
        {open.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 rounded-xl border border-dashed border-border">
            Nada pendiente. Los agentes vuelven a correr el lunes.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {open.map((pr) => (
              <PendingCard key={pr.number} pr={pr} />
            ))}
          </div>
        )}
      </section>

      {/* History */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <History className="w-5 h-5 text-teal" />
          Historial
        </h2>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin actividad todavía.</p>
        ) : (
          <div className="rounded-xl border border-border divide-y divide-border">
            {recent.map((pr) => (
              <details key={pr.number} className="group">
                <summary className="flex flex-wrap items-center justify-between gap-2 p-4 cursor-pointer list-none hover:bg-muted/40">
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">
                      {pr.agent === "otro" ? "Agente" : AGENTS[pr.agent].name} · {formatDate(pr.closedAt)}
                    </span>
                    <span className="font-medium">{pr.title}</span>
                  </span>
                  <StateBadge state={pr.state} />
                </summary>
                <div className={`px-4 pb-4 ${BODY_CLASSES}`} dangerouslySetInnerHTML={{ __html: pr.bodyHtml }} />
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
