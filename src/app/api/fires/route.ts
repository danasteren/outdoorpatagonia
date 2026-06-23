import { NextResponse } from "next/server";
import { fetchPatagoniaFires } from "@/lib/apis/nasa-firms";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchPatagoniaFires();
  return NextResponse.json(data);
}
