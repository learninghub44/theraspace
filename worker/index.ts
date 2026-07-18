/**
 * TheraSpace Worker
 *
 * The site itself is a static export (`next build` with output: 'export'),
 * served from ./out via the [assets] binding in wrangler.toml. This Worker
 * only intercepts a handful of API routes — everything else falls through
 * to the static assets handler untouched.
 *
 *   POST /api/contact              -> insert into contact_messages, optional email
 *   POST /api/newsletter           -> insert into newsletter_subscribers
 *   POST /api/paystack/initialize  -> start a subscription charge (requires session)
 *   POST /api/paystack/cancel      -> mark a subscription cancelled (requires session)
 *   POST /api/paystack/webhook     -> Paystack calls this on charge success/failure
 *
 * All of it writes to Supabase using the service role key (server-side
 * only, never shipped to the browser) so RLS on these tables can stay
 * locked down to "own row or admin, no direct writes."
 *
 * This replaces the three Supabase Edge Functions that used to live in
 * supabase/functions/paystack-*. Reasons for moving them here: they'd
 * never actually been deployed (that's why payment kept failing with
 * "Failed to send a request to the Edge Function"), and keeping payment
 * logic in the same Worker as the rest of the API means one deploy
 * command (`npm run deploy`) ships the whole backend instead of needing
 * two separate deploy pipelines (wrangler + supabase CLI) kept in sync.
 */

export interface Env {
  ASSETS: Fetcher
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  ALLOWED_ORIGIN: string
  RESEND_API_KEY?: string
  CONTACT_NOTIFICATION_EMAIL?: string
  PAYSTACK_SECRET_KEY: string
  RATE_LIMITER: RateLimit
}

const JSON_HEADERS = { "Content-Type": "application/json" }
const MONTHLY_AMOUNT_KES = 950
const SUBSCRIPTION_PERIOD_DAYS = 30

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

// ============================================================
// Supabase REST helpers (service role key — bypasses RLS, server-side only)
// ============================================================

function supabaseHeaders(env: Env, extra?: Record<string, string>) {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  }
}

async function supabaseInsert(
  env: Env,
  table: string,
  row: Record<string, unknown>,
  opts?: { onConflict?: string; resolution?: "merge-duplicates" | "ignore-duplicates" }
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const qs = opts?.onConflict ? `?on_conflict=${encodeURIComponent(opts.onConflict)}` : ""
  const prefer = opts?.resolution ? `resolution=${opts.resolution},return=minimal` : "return=minimal"
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}${qs}`, {
    method: "POST",
    headers: supabaseHeaders(env, { Prefer: prefer }),
    body: JSON.stringify(row),
  })
  const body = res.ok ? null : await res.text().catch(() => null)
  return { ok: res.ok, status: res.status, body }
}

async function supabasePatch(
  env: Env,
  table: string,
  filter: string,
  row: Record<string, unknown>
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, { Prefer: "return=minimal" }),
    body: JSON.stringify(row),
  })
  const body = res.ok ? null : await res.text().catch(() => null)
  return { ok: res.ok, status: res.status, body }
}

async function supabaseSelectOne<T>(
  env: Env,
  table: string,
  filter: string,
  select: string
): Promise<T | null> {
  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/${table}?${filter}&select=${encodeURIComponent(select)}&limit=1`,
    { headers: supabaseHeaders(env) }
  )
  if (!res.ok) return null
  const rows = (await res.json()) as T[]
  return rows[0] ?? null
}

/** Verify a Supabase-issued access token and return the user it belongs to. */
async function verifySupabaseUser(
  env: Env,
  accessToken: string
): Promise<{ id: string; email: string | null } | null> {
  if (!accessToken) return null
  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) return null
  const user = (await res.json()) as { id?: string; email?: string | null }
  if (!user?.id) return null
  return { id: user.id, email: user.email ?? null }
}

function bearerToken(request: Request): string {
  return (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "")
}

// ============================================================
// Contact + Newsletter
// ============================================================

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

// ============================================================
// Paystack: initialize / cancel (require a logged-in session)
// ============================================================

async function handlePaystackInitialize(request: Request, env: Env, origin: string): Promise<Response> {
  if (!env.PAYSTACK_SECRET_KEY) {
    return jsonResponse({ error: "Server misconfigured: PAYSTACK_SECRET_KEY not set" }, 500, origin)
  }

  const user = await verifySupabaseUser(env, bearerToken(request))
  if (!user) return jsonResponse({ error: "Invalid session" }, 401, origin)

  // Require a listing to exist before accepting payment for it.
  const listing = await supabaseSelectOne<{ id: string }>(
    env,
    "therapist_profiles",
    `user_id=eq.${user.id}`,
    "id"
  )
  if (!listing) {
    return jsonResponse({ error: "Create your listing before subscribing." }, 400, origin)
  }

  const reference = `thera_${user.id.replace(/-/g, "").slice(0, 12)}_${Date.now()}`
  const amountSubunits = MONTHLY_AMOUNT_KES * 100

  let initData: any
  try {
    const initRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: amountSubunits,
        currency: "KES",
        reference,
        channels: ["card", "mobile_money"],
        callback_url: `${env.ALLOWED_ORIGIN}/therapist-dashboard/`,
        metadata: { user_id: user.id, purpose: "therapist_listing_subscription" },
      }),
    })
    initData = await initRes.json()
    if (!initRes.ok || !initData?.status) {
      return jsonResponse(
        { error: initData?.message ?? "Paystack failed to initialize the transaction" },
        502,
        origin
      )
    }
  } catch (err) {
    console.error("Paystack initialize error:", err)
    return jsonResponse({ error: "Could not reach Paystack" }, 502, origin)
  }

  // Record the attempt so the webhook has a row to update even if it fires
  // before this function returns. Doesn't touch `status` — only the
  // webhook, on a confirmed charge, is allowed to mark a subscription active.
  const { ok, status, body } = await supabaseInsert(
    env,
    "therapist_subscriptions",
    { user_id: user.id, last_reference: reference, amount: amountSubunits, currency: "KES" },
    { onConflict: "user_id", resolution: "merge-duplicates" }
  )
  if (!ok) console.error("Failed to record pending subscription row:", status, body)

  return jsonResponse({ authorization_url: initData.data.authorization_url, reference }, 200, origin)
}

async function handlePaystackCancel(request: Request, env: Env, origin: string): Promise<Response> {
  const user = await verifySupabaseUser(env, bearerToken(request))
  if (!user) return jsonResponse({ error: "Invalid session" }, 401, origin)

  const { ok, status, body } = await supabasePatch(
    env,
    "therapist_subscriptions",
    `user_id=eq.${user.id}`,
    { status: "cancelled" }
  )
  if (!ok) {
    console.error("Cancel subscription failed:", status, body)
    return jsonResponse({ error: "Could not cancel subscription." }, 502, origin)
  }

  return jsonResponse({ ok: true }, 200, origin)
}

// ============================================================
// Paystack: webhook (signature-verified, no user session)
// ============================================================

async function hmacSha512Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function handlePaystackWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.PAYSTACK_SECRET_KEY) return new Response("Server misconfigured", { status: 500 })

  // Signature is computed over the exact raw body, so read it as text
  // before any JSON parsing touches it.
  const rawBody = await request.text()
  const signature = request.headers.get("x-paystack-signature")
  const expected = await hmacSha512Hex(env.PAYSTACK_SECRET_KEY, rawBody)
  if (!signature || !timingSafeEqual(signature, expected)) {
    return new Response("Invalid signature", { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  try {
    if (event.event === "charge.success") {
      const data = event.data
      const userId = data?.metadata?.user_id
      if (userId) {
        const existing = await supabaseSelectOne<{ current_period_end: string | null }>(
          env,
          "therapist_subscriptions",
          `user_id=eq.${userId}`,
          "current_period_end"
        )

        const now = new Date()
        // Stack a renewal on top of remaining time rather than resetting
        // the clock, so paying early never costs the therapist days.
        const base =
          existing?.current_period_end && new Date(existing.current_period_end) > now
            ? new Date(existing.current_period_end)
            : now
        const newPeriodEnd = new Date(base.getTime() + SUBSCRIPTION_PERIOD_DAYS * 24 * 60 * 60 * 1000)

        const { ok: subOk, status: subStatus, body: subBody } = await supabaseInsert(
          env,
          "therapist_subscriptions",
          {
            user_id: userId,
            status: "active",
            paystack_customer_code: data.customer?.customer_code ?? null,
            last_reference: data.reference,
            amount: data.amount,
            currency: data.currency ?? "KES",
            current_period_end: newPeriodEnd.toISOString(),
            last_payment_at: now.toISOString(),
          },
          { onConflict: "user_id", resolution: "merge-duplicates" }
        )
        if (!subOk) console.error("Failed to upsert subscription:", subStatus, subBody)

        // Paystack retries webhooks; a duplicate reference just means
        // we've already recorded this charge, which is fine to ignore.
        const { ok: payOk, status: payStatus, body: payBody } = await supabaseInsert(
          env,
          "therapist_subscription_payments",
          {
            user_id: userId,
            reference: data.reference,
            amount: data.amount,
            currency: data.currency ?? "KES",
            status: "success",
            channel: data.channel ?? null,
            paid_at: data.paid_at ?? now.toISOString(),
            raw_event: event,
          },
          { onConflict: "reference", resolution: "ignore-duplicates" }
        )
        if (!payOk) console.error("Failed to log payment:", payStatus, payBody)
      }
    } else if (event.event === "charge.failed") {
      const data = event.data
      const userId = data?.metadata?.user_id
      if (userId) {
        await supabasePatch(env, "therapist_subscriptions", `user_id=eq.${userId}`, {
          status: "past_due",
        })

        const { ok: payOk, status: payStatus, body: payBody } = await supabaseInsert(
          env,
          "therapist_subscription_payments",
          {
            user_id: userId,
            reference: data.reference,
            amount: data.amount,
            currency: data.currency ?? "KES",
            status: "failed",
            channel: data.channel ?? null,
            paid_at: null,
            raw_event: event,
          },
          { onConflict: "reference", resolution: "ignore-duplicates" }
        )
        if (!payOk) console.error("Failed to log failed payment:", payStatus, payBody)
      }
    }
    // Other event types (e.g. transfer events) aren't relevant to this
    // flow and are acknowledged without action.

    return new Response("ok", { status: 200 })
  } catch (err) {
    console.error("Webhook processing error:", err)
    // Still 500 so Paystack retries — but the signature check above
    // already guarantees we only ever reach here for genuine Paystack
    // events.
    return new Response("error", { status: 500 })
  }
}

// ============================================================
// Router
// ============================================================

const RATE_LIMITED_ROUTES = new Set(["/api/contact", "/api/newsletter", "/api/paystack/initialize", "/api/paystack/cancel"])

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const origin = env.ALLOWED_ORIGIN || url.origin

    try {
      // Webhook first: no CORS/browser concerns (Paystack calls this
      // server-to-server), and it must never be rate-limited by IP since
      // every legitimate call comes from Paystack's own infrastructure.
      if (url.pathname === "/api/paystack/webhook") {
        if (request.method !== "POST") return new Response("Method not allowed", { status: 405 })
        return await handlePaystackWebhook(request, env)
      }

      if (RATE_LIMITED_ROUTES.has(url.pathname)) {
        if (request.method === "OPTIONS") {
          return new Response(null, { headers: corsHeaders(origin) })
        }
        if (request.method !== "POST") {
          return jsonResponse({ error: "Method not allowed" }, 405, origin)
        }

        // Rate limiting is a nice-to-have, not the security boundary (input
        // validation and the webhook signature check are) — if the binding
        // is missing/misconfigured, log it and let the request through
        // rather than 500ing every legitimate submission.
        try {
          const { success } = await env.RATE_LIMITER.limit({ key: `${url.pathname}:${clientIp(request)}` })
          if (!success) {
            return jsonResponse({ error: "Too many requests. Please try again later." }, 429, origin)
          }
        } catch (err) {
          console.error("Rate limiter unavailable, allowing request through:", err)
        }

        switch (url.pathname) {
          case "/api/contact":
            return await handleContact(request, env, origin)
          case "/api/newsletter":
            return await handleNewsletter(request, env, origin)
          case "/api/paystack/initialize":
            return await handlePaystackInitialize(request, env, origin)
          case "/api/paystack/cancel":
            return await handlePaystackCancel(request, env, origin)
        }
      }

      // Everything else: serve the static export as-is.
      return await env.ASSETS.fetch(request)
    } catch (err) {
      console.error("Unhandled Worker error:", err)
      return jsonResponse({ error: "Internal server error" }, 500, origin)
    }
  },
}
