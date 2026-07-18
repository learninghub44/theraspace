"use client"

import { Search, MessageCircleHeart, Compass, ArrowUpRight } from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"

export default function ClientDashboardPage() {
  return (
    <DashboardShell title="Your space" subtitle="Welcome back">
      {(session) => (
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-thera-primary/10 to-thera-accent/10 border border-thera-ink/10">
            <div className="flex items-center gap-2 mb-3 text-thera-primary">
              <Compass className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Find support</span>
            </div>
            <h2 className="font-display text-2xl font-medium mb-2">
              Browse therapists across Kenya
            </h2>
            <p className="text-thera-muted mb-5 max-w-lg">
              Filter by specialty, location, or session type, then reach out to a therapist
              directly — no booking system, no waiting on approval.
            </p>
            <a
              href="/therapists"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-thera-primary text-white rounded-xl font-medium text-sm hover:bg-thera-primary/90 transition-colors"
            >
              <Search className="w-4 h-4" /> Browse the directory
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircleHeart className="w-5 h-5 text-thera-accent" />
                <h3 className="font-semibold text-sm">Already spoken to someone?</h3>
              </div>
              <p className="text-sm text-thera-muted">
                TheraSpace doesn't run messaging or scheduling on your behalf — once you've
                reached out to a therapist, you continue the conversation directly with them by
                phone, email, or however they list on their profile.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Account</h3>
              </div>
              <p className="text-xs text-thera-muted mb-1">Signed in as</p>
              <p className="text-sm font-medium mb-4">{session.user.email}</p>
              <a
                href="/therapist-dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-thera-primary hover:underline"
              >
                Are you a therapist? List yourself <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
