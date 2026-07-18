"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { Sparkles, LogOut, Loader2, ShieldAlert } from "lucide-react"
import { supabase } from "@/app/lib/supabase"
import { useProfile } from "@/app/lib/use-profile"
import type { Session } from "@supabase/supabase-js"
import type { Profile } from "@/types"

interface DashboardShellProps {
  title: string
  subtitle?: string
  /** Restrict this dashboard to a single role (e.g. "admin"). Omit for any signed-in user. */
  requiredRole?: Profile["role"]
  /** Where "sign in" / "wrong account" links point. Defaults to the main /login page. */
  loginHref?: string
  children: (session: Session, profile: Profile | null) => ReactNode
}

export function DashboardShell({ title, subtitle, requiredRole, loginHref = "/login", children }: DashboardShellProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<"checking" | "ready" | "signed-out">("checking")
  const [signingOut, setSigningOut] = useState(false)
  const { profile, status: profileStatus } = useProfile(session)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      if (data.session) {
        setSession(data.session)
        setStatus("ready")
      } else {
        setStatus("signed-out")
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!active) return
      if (event === "SIGNED_OUT" || !newSession) {
        setSession(null)
        setStatus("signed-out")
      } else {
        setSession(newSession)
        setStatus("ready")
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    setSigningOut(false)
    window.location.href = loginHref
  }

  if (status === "checking") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 py-20">
        <Loader2 className="w-8 h-8 text-thera-muted animate-spin" />
        <p className="text-thera-muted text-sm">Loading your dashboard...</p>
      </div>
    )
  }

  if (status === "signed-out" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-thera-primary to-thera-secondary mb-6">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-3">You&apos;re not signed in</h1>
          <p className="text-thera-muted mb-6">Sign in to view your dashboard.</p>
          <Link
            href={loginHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  // Session exists, but we haven't confirmed the role yet — don't flash the
  // gated content (or a false "access restricted") while this is in flight.
  if (requiredRole && profileStatus === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 py-20">
        <Loader2 className="w-8 h-8 text-thera-muted animate-spin" />
        <p className="text-thera-muted text-sm">Checking access...</p>
      </div>
    )
  }

  if (requiredRole && (profileStatus === "error" || profile?.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-thera-danger/10 mb-6">
            <ShieldAlert className="w-6 h-6 text-thera-danger" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Access restricted</h1>
          <p className="text-thera-muted mb-6">
            {profileStatus === "error"
              ? "We couldn't verify your account access. Try refreshing the page."
              : "This area is only available to admin accounts."}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold"
          >
            Back to your dashboard
          </Link>
        </div>
      </div>
    )
  }

  const email = session.user?.email ?? ""

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-thera-primary to-thera-secondary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-thera-muted">
                {subtitle ?? "Welcome back"}
              </p>
              <p className="font-semibold">{email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-sm font-medium hover:bg-thera-ink/10 transition-colors disabled:opacity-50"
          >
            {signingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Sign out
          </button>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-medium mb-8">{title}</h1>

        {children(session, profile)}
      </div>
    </div>
  )
}
