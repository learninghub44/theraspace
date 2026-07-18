"use client"

import {
  Users,
  UserCheck,
  ShieldCheck,
  Calendar,
  Wallet,
  BarChart3,
  FileCog,
  LifeBuoy,
  Bell,
  Settings,
} from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"

// Sample data — UI scaffold only. A real version needs platform-wide
// tables (users, therapist verification queue, revenue, support
// tickets) and proper admin role-gating, not just a signed-in check.
const pendingVerifications = [
  { name: "Dr. Kevin Mwangi", submitted: "2 days ago" },
  { name: "Faith Chebet", submitted: "5 days ago" },
]

const supportTickets = [
  { subject: "Can't reschedule a session", status: "Open" },
  { subject: "Payment not reflecting", status: "Open" },
]

export default function AdminDashboardPage() {
  return (
    <DashboardShell title="Platform overview" subtitle="Admin">
      {() => (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Users className="w-5 h-5 text-thera-primary mb-2" />
              <p className="text-2xl font-data font-medium">0</p>
              <p className="text-xs text-thera-muted">Total users</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <UserCheck className="w-5 h-5 text-thera-secondary mb-2" />
              <p className="text-2xl font-data font-medium">0</p>
              <p className="text-xs text-thera-muted">Total therapists</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-thera-warning mb-2" />
              <p className="text-2xl font-data font-medium">2</p>
              <p className="text-xs text-thera-muted">Pending verification</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Calendar className="w-5 h-5 text-thera-accent mb-2" />
              <p className="text-2xl font-data font-medium">0</p>
              <p className="text-xs text-thera-muted">Appointments</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Wallet className="w-5 h-5 text-thera-success mb-2" />
              <p className="text-2xl font-data font-medium">KES 0</p>
              <p className="text-xs text-thera-muted">Revenue</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-thera-warning" />
                <h2 className="font-semibold">Pending therapist verification</h2>
              </div>
              <div className="space-y-3">
                {pendingVerifications.map((v) => (
                  <div key={v.name} className="flex items-center justify-between p-4 rounded-xl bg-thera-ink/[0.03] border border-thera-ink/5">
                    <div>
                      <p className="font-medium text-sm">{v.name}</p>
                      <p className="text-xs text-thera-muted">Submitted {v.submitted}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-thera-success text-white text-xs font-medium hover:bg-thera-success/90 transition-colors">
                        Approve
                      </button>
                      <button className="px-3 py-1.5 rounded-lg border border-thera-ink/10 text-xs font-medium hover:bg-thera-ink/5 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <LifeBuoy className="w-5 h-5 text-thera-danger" />
                <h2 className="font-semibold">Support tickets</h2>
              </div>
              <div className="space-y-3">
                {supportTickets.map((t) => (
                  <div key={t.subject} className="flex items-center justify-between p-4 rounded-xl bg-thera-ink/[0.03] border border-thera-ink/5">
                    <p className="text-sm font-medium">{t.subject}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-thera-warning/10 text-thera-warning font-medium">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-thera-primary" />
                <h2 className="font-semibold text-sm">User management</h2>
              </div>
              <p className="text-sm text-thera-muted">Search, suspend, or edit any account.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileCog className="w-5 h-5 text-thera-secondary" />
                <h2 className="font-semibold text-sm">Content management</h2>
              </div>
              <p className="text-sm text-thera-muted">Manage blog posts, resources, and categories.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-thera-accent" />
                <h2 className="font-semibold text-sm">Analytics &amp; reports</h2>
              </div>
              <p className="text-sm text-thera-muted">Platform growth, retention, and revenue trends.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Notifications</h2>
              </div>
              <p className="text-sm text-thera-muted">System alerts and flagged activity.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Platform settings</h2>
              </div>
              <p className="text-sm text-thera-muted">Fees, payout schedules, and platform policies.</p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
