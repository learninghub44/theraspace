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

// createClient() throws synchronously if given an empty/invalid URL, which
// would crash `next build` for every prerendered page the moment env vars
// are missing (a placeholder branch, a fresh clone, a misconfigured CI
// job). Fall back to a syntactically valid placeholder so the build always
// succeeds — real requests will simply fail at runtime with a clear network
// error instead of the whole site failing to deploy.
const safeUrl = supabaseUrl || "https://placeholder.supabase.co"
const safeAnonKey = supabaseAnonKey || "placeholder-anon-key"

// This site is statically exported (output: 'export'), so there is no
// Next.js server to hold cookies/session. We use the plain browser client,
// which persists the session in localStorage and automatically parses
// tokens/codes that Supabase appends to the URL after email links
// (signup confirmation, password reset, magic links).
export const supabase = createClient(safeUrl, safeAnonKey, {
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
