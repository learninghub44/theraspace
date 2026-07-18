// POST /paystack-webhook
// Configure this URL in the Paystack dashboard (Settings -> API Keys & Webhooks).
// This is the ONLY place that marks a subscription active — never trust a
// client-side "payment succeeded" callback for that, since it's trivial to
// fake. Every request's signature is verified against PAYSTACK_SECRET_KEY
// before any data is touched.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0"

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const PERIOD_DAYS = 30

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 })
  if (!PAYSTACK_SECRET_KEY) return new Response("Server misconfigured", { status: 500 })

  const rawBody = await req.text()
  const signature = req.headers.get("x-paystack-signature")

  const expected = await hmacSha512Hex(PAYSTACK_SECRET_KEY, rawBody)
  if (!signature || !timingSafeEqual(signature, expected)) {
    return new Response("Invalid signature", { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try {
    if (event.event === "charge.success") {
      const data = event.data
      const userId = data?.metadata?.user_id
      if (userId) {
        const { data: existing } = await supabase
          .from("therapist_subscriptions")
          .select("current_period_end")
          .eq("user_id", userId)
          .maybeSingle()

        const now = new Date()
        // Stack a renewal on top of remaining time rather than resetting the
        // clock, so paying early never costs the therapist days.
        const base =
          existing?.current_period_end && new Date(existing.current_period_end) > now
            ? new Date(existing.current_period_end)
            : now
        const newPeriodEnd = new Date(base.getTime() + PERIOD_DAYS * 24 * 60 * 60 * 1000)

        await supabase.from("therapist_subscriptions").upsert(
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
          { onConflict: "user_id" }
        )

        const { error: paymentInsertError } = await supabase
          .from("therapist_subscription_payments")
          .insert({
            user_id: userId,
            reference: data.reference,
            amount: data.amount,
            currency: data.currency ?? "KES",
            status: "success",
            channel: data.channel ?? null,
            paid_at: data.paid_at ?? now.toISOString(),
            raw_event: event,
          })
        // Paystack retries webhooks; a duplicate reference just means we've
        // already recorded this charge, which is fine to ignore.
        if (paymentInsertError && paymentInsertError.code !== "23505") {
          console.error("Failed to log payment:", paymentInsertError.message)
        }
      }
    } else if (event.event === "charge.failed") {
      const data = event.data
      const userId = data?.metadata?.user_id
      if (userId) {
        await supabase
          .from("therapist_subscriptions")
          .update({ status: "past_due" })
          .eq("user_id", userId)

        const { error: paymentInsertError } = await supabase
          .from("therapist_subscription_payments")
          .insert({
            user_id: userId,
            reference: data.reference,
            amount: data.amount,
            currency: data.currency ?? "KES",
            status: "failed",
            channel: data.channel ?? null,
            paid_at: null,
            raw_event: event,
          })
        if (paymentInsertError && paymentInsertError.code !== "23505") {
          console.error("Failed to log failed payment:", paymentInsertError.message)
        }
      }
    }
    // Other event types (e.g. transfer events) aren't relevant to this flow
    // and are acknowledged without action.

    return new Response("ok", { status: 200 })
  } catch (err) {
    console.error("Webhook processing error:", err)
    // Still 500 so Paystack retries — but the signature check above already
    // guarantees we only ever reach here for genuine Paystack events.
    return new Response("error", { status: 500 })
  }
})

async function hmacSha512Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-512" }, false, [
    "sign",
  ])
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
