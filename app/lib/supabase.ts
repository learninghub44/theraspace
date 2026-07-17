import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw at import time during build (static export prerenders these
  // pages), just warn loudly so a missing env var is obvious in the console.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  )
}

// This site is statically exported (output: 'export'), so there is no
// Next.js server to hold cookies/session. We use the plain browser client,
// which persists the session in localStorage and automatically parses
// tokens/codes that Supabase appends to the URL after email links
// (signup confirmation, password reset, magic links).
export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
})

// Where to send people after a successful login / verified session.
// Defaults to a same-origin relative path so it works on whatever domain
// the site is deployed to. Set NEXT_PUBLIC_APP_DASHBOARD_URL only if the
// dashboard ever moves to a separate app/subdomain.
export const APP_DASHBOARD_URL =
  process.env.NEXT_PUBLIC_APP_DASHBOARD_URL ?? "/dashboard"

export function getSiteUrl() {
  if (typeof window !== "undefined") return window.location.origin
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://mytherapist.christech.co.ke"
}
