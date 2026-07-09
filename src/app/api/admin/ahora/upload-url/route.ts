import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAIL = "danasteren@gmail.com";

const ALLOWED_CONTENT_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { contentType } = await request.json();
  const ext = ALLOWED_CONTENT_TYPES[contentType];
  if (!ext) {
    return NextResponse.json(
      { error: "Formato no soportado. Usá JPEG, PNG, WebP o MP4 (no HEIC ni MOV)." },
      { status: 400 }
    );
  }

  const path = `${randomUUID()}.${ext}`;
  const admin = createAdminClient();
  const { data, error } = await admin.storage.from("ahora").createSignedUploadUrl(path);

  if (error || !data) {
    return NextResponse.json({ error: "No pudimos preparar la subida" }, { status: 500 });
  }

  const { data: publicUrlData } = admin.storage.from("ahora").getPublicUrl(path);

  return NextResponse.json({
    path,
    token: data.token,
    publicUrl: publicUrlData.publicUrl,
  });
}
