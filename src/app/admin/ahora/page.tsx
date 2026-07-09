import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AhoraComposer } from "@/components/admin/AhoraComposer";
import { Camera } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patagonia Ahora — Admin",
  robots: { index: false, follow: false },
};

const ADMIN_EMAIL = "danasteren@gmail.com";

export default async function AdminAhoraPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) notFound();

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-6 h-6 text-teal" />
        <h1 className="text-xl font-semibold">Patagonia Ahora</h1>
      </div>
      <AhoraComposer />
    </div>
  );
}
