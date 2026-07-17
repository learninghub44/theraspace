"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { supabase, APP_DASHBOARD_URL } from "@/app/lib/supabase"

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"checking" | "invalid">("checking")

  useEffect(() => {
    // detectSessionInUrl handles the PKCE code exchange automatically.
    // We just wait for the resulting session and then forward the user
    // into the main app (same Supabase project/DB, different domain).
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        window.location.href = APP_DASHBOARD_URL
      }
    })

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.href = APP_DASHBOARD_URL
      }
    })

    const timeout = setTimeout(() => setStatus("invalid"), 4000)

    return () => {
      listener.subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  if (status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-thera-danger/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-thera-danger" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Couldn&apos;t verify link</h1>
          <p className="text-thera-muted mb-6">
            This confirmation link is invalid or has expired. Try signing in, or sign up again to get a new link.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 py-20">
      <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-thera-muted text-sm">Verifying your account...</p>
    </div>
  )
}
