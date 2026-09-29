// Reads and acts on the pull requests opened by the weekly growth routines
// (claude.ai routines → GitHub), so they can be reviewed from /admin/agentes.

const REPO = "danasteren/outdoorpatagonia";
const API = `https://api.github.com/repos/${REPO}`;

export type AgentKind = "contenido" | "titulos" | "otro";

export type AgentPr = {
  number: number;
  title: string;
  agent: AgentKind;
  state: "open" | "merged" | "closed";
  createdAt: string;
  closedAt: string | null;
  bodyHtml: string;
  url: string;
  previewUrl: string | null;
  headSha: string;
};

export type AgentPrs = { open: AgentPr[]; recent: AgentPr[]; error: string | null };

type GhPull = {
  number: number;
  title: string;
  state: "open" | "closed";
  merged_at: string | null;
  created_at: string;
  closed_at: string | null;
  body_html?: string;
  html_url: string;
  head: { sha: string; ref: string };
};

export function hasGithubToken(): boolean {
  return Boolean(process.env.GITHUB_TOKEN);
}

function headers(accept = "application/vnd.github+json"): HeadersInit {
  const h: Record<string, string> = { Accept: accept, "X-GitHub-Api-Version": "2022-11-28" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

function agentFor(pr: GhPull): AgentKind {
  if (pr.head.ref.startsWith("seo/content-") || pr.title.startsWith("Contenido SEO")) return "contenido";
  if (pr.head.ref.startsWith("seo/ctr-") || pr.title.startsWith("SEO: t")) return "titulos";
  return "otro";
}

async function previewUrlFor(sha: string): Promise<string | null> {
  try {
    const deps = await fetch(`${API}/deployments?sha=${sha}&per_page=1`, { headers: headers(), cache: "no-store" });
    if (!deps.ok) return null;
    const [dep] = (await deps.json()) as { id: number }[];
    if (!dep) return null;
    const st = await fetch(`${API}/deployments/${dep.id}/statuses?per_page=5`, { headers: headers(), cache: "no-store" });
    if (!st.ok) return null;
    const statuses = (await st.json()) as { state: string; environment_url?: string }[];
    return statuses.find((s) => s.state === "success" && s.environment_url)?.environment_url ?? null;
  } catch {
    return null;
  }
}

function toAgentPr(pr: GhPull, previewUrl: string | null): AgentPr {
  return {
    number: pr.number,
    title: pr.title,
    agent: agentFor(pr),
    state: pr.merged_at ? "merged" : pr.state,
    createdAt: pr.created_at,
    closedAt: pr.merged_at ?? pr.closed_at,
    bodyHtml: pr.body_html ?? "",
    url: pr.html_url,
    previewUrl,
    headSha: pr.head.sha,
  };
}

export async function getAgentPrs(): Promise<AgentPrs> {
  try {
    const res = await fetch(`${API}/pulls?state=all&sort=created&direction=desc&per_page=20`, {
      headers: headers("application/vnd.github.html+json"),
      cache: "no-store",
    });
    if (!res.ok) return { open: [], recent: [], error: `GitHub respondió ${res.status}` };

    const pulls = ((await res.json()) as GhPull[]).filter((p) => agentFor(p) !== "otro");
    const open = await Promise.all(
      pulls.filter((p) => p.state === "open").map(async (p) => toAgentPr(p, await previewUrlFor(p.head.sha))),
    );
    const recent = pulls.filter((p) => p.state === "closed").slice(0, 10).map((p) => toAgentPr(p, null));
    return { open, recent, error: null };
  } catch (e) {
    return { open: [], recent: [], error: e instanceof Error ? e.message : "No se pudo leer GitHub" };
  }
}

export async function publishPr(number: number): Promise<void> {
  const res = await fetch(`${API}/pulls/${number}/merge`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ merge_method: "squash" }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `GitHub respondió ${res.status}`);
  }
}

export async function discardPr(number: number): Promise<void> {
  const res = await fetch(`${API}/pulls/${number}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ state: "closed" }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `GitHub respondió ${res.status}`);
  }
}
