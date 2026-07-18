// POST /paystack-cancel
// Since renewals here are one-off charges rather than a Paystack
// auto-recurring subscription (M-Pesa can't auto-renew), "cancel" just means
// "don't ask me to pay again" — access continues until current_period_end,
// then the marketplace RLS policy stops showing the listing on its own.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0"
import { corsHeaders, json } from "../_shared/cors.ts"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders })
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405)

  const authHeader = req.headers.get("Authorization")
  if (!authHeader) return json({ error: "Missing Authorization header" }, 401)

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const token = authHeader.replace("Bearer ", "")
  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData?.user) return json({ error: "Invalid session" }, 401)

  const { error: updateError } = await supabase
    .from("therapist_subscriptions")
    .update({ status: "cancelled" })
    .eq("user_id", userData.user.id)

  if (updateError) return json({ error: updateError.message }, 500)

  return json({ ok: true })
})
