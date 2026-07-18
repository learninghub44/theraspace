"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import type { TherapistSubscription } from "@/types"

interface UseSubscriptionResult {
  subscription: TherapistSubscription | null
  status: "loading" | "ready" | "error"
  refresh: () => void
}

/** Whether the listing is actually live on the public marketplace right now. */
export function isSubscriptionActive(sub: TherapistSubscription | null): boolean {
  if (!sub) return false
  if (sub.status !== "active") return false
  if (!sub.current_period_end) return false
  return new Date(sub.current_period_end) > new Date()
}

export function useSubscription(session: Session | null): UseSubscriptionResult {
  const [subscription, setSubscription] = useState<TherapistSubscription | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  const load = useCallback(() => {
    if (!session) {
      setSubscription(null)
      setStatus("ready")
      return
    }
    setStatus("loading")
    supabase
      .from("therapist_subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to load subscription:", error.message)
          setSubscription(null)
          setStatus("error")
          return
        }
        setSubscription(data as TherapistSubscription | null)
        setStatus("ready")
      })
  }, [session])

  useEffect(() => {
    load()
  }, [load])

  return { subscription, status, refresh: load }
}
