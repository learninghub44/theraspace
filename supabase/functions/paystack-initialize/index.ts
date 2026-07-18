// POST /paystack-initialize
// Called by a signed-in therapist from the dashboard. Verifies they have a
// listing, then asks Paystack to start a transaction for KES 950 and
// returns the checkout URL to redirect the browser to. The webhook
// (paystack-webhook) is what actually marks the subscription active once
// Paystack confirms the charge — this function never trusts the client's
// word that payment succeeded.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0"
import { corsHeaders, json } from "../_shared/cors.ts"

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://mytherapist.christech.co.ke"

const MONTHLY_AMOUNT_KES = 950

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders })
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405)

  if (!PAYSTACK_SECRET_KEY) return json({ error: "Server misconfigured: PAYSTACK_SECRET_KEY not set" }, 500)

  const authHeader = req.headers.get("Authorization")
  if (!authHeader) return json({ error: "Missing Authorization header" }, 401)

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const token = authHeader.replace("Bearer ", "")
  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData?.user) return json({ error: "Invalid session" }, 401)
  const user = userData.user

  // Require a listing to exist before accepting payment for it.
  const { data: listing, error: listingError } = await supabase
    .from("therapist_profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (listingError) return json({ error: listingError.message }, 500)
  if (!listing) return json({ error: "Create your listing before subscribing." }, 400)

  const reference = `thera_${user.id.replace(/-/g, "").slice(0, 12)}_${Date.now()}`
  const amountSubunits = MONTHLY_AMOUNT_KES * 100

  let initData: any
  try {
    const initRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: amountSubunits,
        currency: "KES",
        reference,
        channels: ["card", "mobile_money"],
        callback_url: `${SITE_URL}/therapist-dashboard/`,
        metadata: {
          user_id: user.id,
          purpose: "therapist_listing_subscription",
        },
      }),
    })
    initData = await initRes.json()
    if (!initRes.ok || !initData?.status) {
      return json({ error: initData?.message ?? "Paystack failed to initialize the transaction" }, 502)
    }
  } catch (err) {
    console.error("Paystack initialize error:", err)
    return json({ error: "Could not reach Paystack" }, 502)
  }

  // Record the attempt so the webhook has a row to update even if it fires
  // before this function returns. Doesn't touch `status` — only the
  // webhook, on a confirmed charge, is allowed to mark a subscription active.
  const { error: upsertError } = await supabase.from("therapist_subscriptions").upsert(
    {
      user_id: user.id,
      last_reference: reference,
      amount: amountSubunits,
      currency: "KES",
    },
    { onConflict: "user_id" }
  )
  if (upsertError) console.error("Failed to record pending subscription row:", upsertError.message)

  return json({
    authorization_url: initData.data.authorization_url,
    reference,
  })
})
