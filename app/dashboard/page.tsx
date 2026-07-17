"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  Users,
  Calendar,
  FileText,
  LogOut,
  Loader2,
} from "lucide-react"
import { supabase } from "@/app/lib/supabase"
import type { Session } from "@supabase/supabase-js"

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<"checking" | "ready" | "signed-out">("checking")
  const [signingOut, setSigningOut] = useState(false)

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
    window.location.href = "/login"
  }

  if (status === "checking") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 py-20">
        <Loader2 className="w-8 h-8 text-thera-muted animate-spin" />
        <p className="text-thera-muted text-sm">Loading your dashboard...</p>
      </div>
    )
  }

  if (status === "signed-out") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-thera-primary to-thera-secondary mb-6">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-3">You&apos;re not signed in</h1>
          <p className="text-thera-muted mb-6">Sign in to view your dashboard.</p>
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

  const email = session?.user?.email ?? ""

  return (
    <div className="min-h-screen px-4 py-10 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-thera-primary to-thera-secondary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-thera-muted">Welcome back</p>
              <p className="font-semibold">{email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {signingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Sign out
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Users className="w-5 h-5 text-thera-primary mb-3" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-thera-muted">Clients</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Calendar className="w-5 h-5 text-thera-accent mb-3" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-thera-muted">Appointments</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <FileText className="w-5 h-5 text-thera-secondary mb-3" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-thera-muted">AI notes</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
          <h2 className="text-xl font-semibold mb-2">Your practice dashboard is set up</h2>
          <p className="text-thera-muted max-w-lg mx-auto">
            You&apos;re signed in and this account is live. Client records, scheduling, and AI
            notes will appear here as they&apos;re added to your practice.
          </p>
        </div>
      </div>
    </div>
  )
}
