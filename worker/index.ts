/**
 * TheraSpace Worker
 *
 * The site itself is a static export (`next build` with output: 'export'),
 * served from ./out via the [assets] binding in wrangler.toml. This Worker
 * only intercepts two API routes — everything else falls through to the
 * static assets handler untouched.
 *
 *   POST /api/contact     -> insert into contact_messages, optional email
 *   POST /api/newsletter  -> insert into newsletter_subscribers
 *
 * Both write to Supabase using the service role key (server-side only,
 * never shipped to the browser) so RLS on those tables can stay locked down.
 */

export interface Env {
  ASSETS: Fetcher
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  ALLOWED_ORIGIN: string
  RESEND_API_KEY?: string
  CONTACT_NOTIFICATION_EMAIL?: string
  RATE_LIMITER: RateLimit
}

const JSON_HEADERS = { "Content-Type": "application/json" }

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  }
}

function jsonResponse(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(origin) },
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 320 && EMAIL_RE.test(email)
}

function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "unknown"
}

async function supabaseInsert(
  env: Env,
  table: string,
  row: Record<string, unknown>
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  })
  const body = res.ok ? null : await res.text().catch(() => null)
  return { ok: res.ok, status: res.status, body }
}

async function handleContact(request: Request, env: Env, origin: string): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400, origin)
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : ""
  const email = typeof payload.email === "string" ? payload.email.trim() : ""
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : null
  const message = typeof payload.message === "string" ? payload.message.trim() : ""

  if (name.length < 2 || name.length > 200) {
    return jsonResponse({ error: "Name is required." }, 400, origin)
  }
  if (!isValidEmail(email)) {
    return jsonResponse({ error: "A valid email is required." }, 400, origin)
  }
  if (message.length < 10 || message.length > 5000) {
    return jsonResponse({ error: "Message must be between 10 and 5000 characters." }, 400, origin)
  }
  if (subject && subject.length > 200) {
    return jsonResponse({ error: "Subject is too long." }, 400, origin)
  }

  const { ok, status, body } = await supabaseInsert(env, "contact_messages", {
    name,
    email,
    subject,
    message,
  })

  if (!ok) {
    console.error("contact_messages insert failed", status, body)
    return jsonResponse({ error: "Could not save your message. Please try again." }, 502, origin)
  }

  // Best-effort email notification — a failure here shouldn't fail the
  // request, since the message is already safely stored.
  if (env.RESEND_API_KEY && env.CONTACT_NOTIFICATION_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TheraSpace <notifications@christech.co.ke>",
          to: env.CONTACT_NOTIFICATION_EMAIL,
          reply_to: email,
          subject: `New contact form message${subject ? `: ${subject}` : ""}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      })
    } catch (err) {
      console.error("Resend notification failed", err)
    }
  }

  return jsonResponse({ ok: true }, 200, origin)
}

async function handleNewsletter(request: Request, env: Env, origin: string): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400, origin)
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : ""
  if (!isValidEmail(email)) {
    return jsonResponse({ error: "A valid email is required." }, 400, origin)
  }

  const { ok, status, body } = await supabaseInsert(env, "newsletter_subscribers", { email })

  // A duplicate email is a 409 from PostgREST (unique constraint) — treat
  // that as a success from the user's point of view, they're subscribed.
  if (!ok && status !== 409) {
    console.error("newsletter_subscribers insert failed", status, body)
    return jsonResponse({ error: "Could not subscribe. Please try again." }, 502, origin)
  }

  return jsonResponse({ ok: true }, 200, origin)
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const origin = env.ALLOWED_ORIGIN || url.origin

    if (url.pathname === "/api/contact" || url.pathname === "/api/newsletter") {
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders(origin) })
      }
      if (request.method !== "POST") {
        return jsonResponse({ error: "Method not allowed" }, 405, origin)
      }

      const { success } = await env.RATE_LIMITER.limit({ key: clientIp(request) })
      if (!success) {
        return jsonResponse({ error: "Too many requests. Please try again later." }, 429, origin)
      }

      return url.pathname === "/api/contact"
        ? handleContact(request, env, origin)
        : handleNewsletter(request, env, origin)
    }

    // Everything else: serve the static export as-is.
    return env.ASSETS.fetch(request)
  },
}
