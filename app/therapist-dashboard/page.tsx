"use client"

import {
  Calendar,
  Clock,
  UserPlus,
  Wallet,
  Star,
  MessageSquare,
  Bell,
  NotebookPen,
  Clock4,
  UserCircle2,
} from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"

// Sample data — UI scaffold only. A real version needs an appointments/
// earnings/reviews schema and role-gated access (this page currently
// only checks that someone is signed in, not that they're a therapist).
const todaysAppointments = [
  { client: "Sarah M.", time: "9:00 AM", type: "Video" },
  { client: "James K.", time: "11:30 AM", type: "In-person" },
  { client: "Amina W.", time: "3:00 PM", type: "Video" },
]

const clientRequests = [
  { client: "Peter N.", note: "Requesting a Thursday morning slot" },
  { client: "Grace O.", note: "New client — anxiety support" },
]

export default function TherapistDashboardPage() {
  return (
    <DashboardShell title="Practice overview" subtitle="Signed in as">
      {() => (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Calendar className="w-5 h-5 text-thera-primary mb-2" />
              <p className="text-2xl font-data font-medium">3</p>
              <p className="text-xs text-thera-muted">Today&apos;s sessions</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <UserPlus className="w-5 h-5 text-thera-accent mb-2" />
              <p className="text-2xl font-data font-medium">2</p>
              <p className="text-xs text-thera-muted">New requests</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Wallet className="w-5 h-5 text-thera-success mb-2" />
              <p className="text-2xl font-data font-medium">KES 0</p>
              <p className="text-xs text-thera-muted">Earnings (this month)</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Star className="w-5 h-5 text-thera-warning mb-2" />
              <p className="text-2xl font-data font-medium">—</p>
              <p className="text-xs text-thera-muted">Average rating</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-thera-primary" />
                <h2 className="font-semibold">Today&apos;s appointments</h2>
              </div>
              <div className="space-y-3">
                {todaysAppointments.map((a) => (
                  <div key={a.client} className="flex items-center justify-between p-4 rounded-xl bg-thera-ink/[0.03] border border-thera-ink/5">
                    <div>
                      <p className="font-medium text-sm">{a.client}</p>
                      <p className="text-xs text-thera-muted">{a.time} · {a.type}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg border border-thera-ink/10 text-xs font-medium hover:bg-thera-ink/5 transition-colors">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="w-5 h-5 text-thera-accent" />
                <h2 className="font-semibold text-sm">Client requests</h2>
              </div>
              <div className="space-y-3">
                {clientRequests.map((r) => (
                  <div key={r.client} className="text-sm">
                    <p className="font-medium">{r.client}</p>
                    <p className="text-xs text-thera-muted">{r.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-thera-primary" />
                <h2 className="font-semibold text-sm">Messages</h2>
              </div>
              <p className="text-sm text-thera-muted">No new messages.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <NotebookPen className="w-5 h-5 text-thera-secondary" />
                <h2 className="font-semibold text-sm">Session notes</h2>
              </div>
              <p className="text-sm text-thera-muted">Notes from your recent sessions live here.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Clock4 className="w-5 h-5 text-thera-accent" />
                <h2 className="font-semibold text-sm">Availability</h2>
              </div>
              <p className="text-sm text-thera-muted mb-3">Set the hours clients can book you.</p>
              <button className="text-xs font-medium text-thera-primary hover:underline">Edit availability</button>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-thera-warning" />
                <h2 className="font-semibold text-sm">Reviews</h2>
              </div>
              <p className="text-sm text-thera-muted">Client reviews will appear here.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Notifications</h2>
              </div>
              <p className="text-sm text-thera-muted">You&apos;re all caught up.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <UserCircle2 className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Profile completion</h2>
              </div>
              <div className="w-full h-2 rounded-full bg-thera-ink/10 overflow-hidden mb-2">
                <div className="h-full w-2/3 bg-thera-primary rounded-full" />
              </div>
              <p className="text-xs text-thera-muted">65% complete — add your credentials to finish.</p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
