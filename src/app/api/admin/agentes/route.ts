import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { discardPr, hasGithubToken, publishPr } from "@/lib/agentes/github";

const ADMIN_EMAIL = "danasteren@gmail.com";

type ActionBody = {
  action: "publish" | "discard";
  number: number;
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  if (!hasGithubToken()) {
    return NextResponse.json({ error: "Falta configurar GITHUB_TOKEN en Vercel" }, { status: 500 });
  }

  const { action, number }: ActionBody = await request.json();

  if (!Number.isInteger(number) || (action !== "publish" && action !== "discard")) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    if (action === "publish") await publishPr(number);
    else await discardPr(number);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error de GitHub" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
