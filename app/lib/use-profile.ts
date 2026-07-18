"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import type { Profile } from "@/types"

interface UseProfileResult {
  profile: Profile | null
  status: "loading" | "ready" | "error"
}

/**
 * Fetches the `profiles` row (id, email, role) for the given session's user.
 * Returns status "loading" while the query is in flight, "ready" once
 * `profile` is populated (or confirmed absent), and "error" if the query
 * itself failed (e.g. network issue) — treat "error" as "can't verify role,
 * don't grant access" rather than silently falling back to open access.
 */
export function useProfile(session: Session | null): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let active = true

    if (!session) {
      setProfile(null)
      setStatus("ready")
      return
    }

    setStatus("loading")

    supabase
      .from("profiles")
      .select("id, email, role, created_at")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to load profile:", error.message)
          setProfile(null)
          setStatus("error")
          return
        }
        setProfile(data as Profile | null)
        setStatus("ready")
      })

    return () => {
      active = false
    }
  }, [session])

  return { profile, status }
}
