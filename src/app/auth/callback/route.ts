import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) return NextResponse.redirect(`${origin}/`)

  const codeVerifier = request.cookies.get('oauth_cv')?.value
  if (!codeVerifier) return NextResponse.redirect(`${origin}/`)

  // Exchange authorization code with Google
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${origin}/auth/callback`,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    }),
  })

  if (!tokenRes.ok) return NextResponse.redirect(`${origin}/`)

  const { id_token } = await tokenRes.json() as { id_token?: string }
  if (!id_token) return NextResponse.redirect(`${origin}/`)

  // Build response and set session cookies on it directly
  const response = NextResponse.redirect(`${origin}${next}`)
  response.cookies.delete('oauth_cv')

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: id_token,
  })

  if (error) return NextResponse.redirect(`${origin}/`)
  return response
}
