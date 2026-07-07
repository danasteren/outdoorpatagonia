import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const query: unknown = body?.query
  const resultsCount: unknown = body?.results_count

  if (typeof query !== 'string' || query.trim().length < 3) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const admin = createAdminClient()
  await admin.from('search_queries').insert({
    query: query.trim().toLowerCase(),
    results_count: typeof resultsCount === 'number' ? resultsCount : 0,
  })

  return NextResponse.json({ ok: true })
}
