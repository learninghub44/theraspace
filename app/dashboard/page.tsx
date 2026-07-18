"use client"

import {
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Video,
  History,
  BookOpen,
  Smile,
  NotebookPen,
  Target,
  CreditCard,
  Bell,
  User,
} from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"

// Sample data — this page is a UI scaffold. Real appointments, favorites,
// and history will need a bookings/favorites schema wired to Supabase.
const upcomingAppointments = [
  { therapist: "Dr. Amina Njoroge", date: "Mon, 21 Jul", time: "10:00 AM", mode: "Video" },
  { therapist: "David Otieno", date: "Fri, 25 Jul", time: "2:30 PM", mode: "In-person" },
]

const favoriteTherapists = [
  { name: "Dr. Amina Njoroge", specialty: "Anxiety & Stress" },
  { name: "David Otieno", specialty: "Couples & Family" },
]

const moods = ["😔", "😕", "😐", "🙂", "😄"]

export default function ClientDashboardPage() {
  return (
    <DashboardShell title="Your space" subtitle="Welcome back">
      {() => (
        <div className="space-y-6">
          {/* Top row: upcoming + mood */}
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-thera-primary" />
                <h2 className="font-semibold">Upcoming appointments</h2>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map((a) => (
                  <div key={a.therapist + a.date} className="flex items-center justify-between p-4 rounded-xl bg-thera-ink/[0.03] border border-thera-ink/5">
                    <div>
                      <p className="font-medium text-sm">{a.therapist}</p>
                      <p className="text-xs text-thera-muted flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {a.date} · {a.time} · {a.mode}
                      </p>
                    </div>
                    <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-thera-primary text-white text-xs font-medium hover:bg-thera-primary/90 transition-colors">
                      <Video className="w-3.5 h-3.5" /> Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Smile className="w-5 h-5 text-thera-accent" />
                <h2 className="font-semibold">How are you today?</h2>
              </div>
              <div className="flex justify-between">
                {moods.map((m) => (
                  <button
                    key={m}
                    className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-thera-ink/5 transition-colors"
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-xs text-thera-muted mt-4">Your mood log helps track patterns over time.</p>
            </div>
          </div>

          {/* Middle row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-thera-danger" />
                <h2 className="font-semibold text-sm">Favorite therapists</h2>
              </div>
              <div className="space-y-2">
                {favoriteTherapists.map((t) => (
                  <div key={t.name} className="text-sm">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-thera-muted">{t.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-thera-primary" />
                <h2 className="font-semibold text-sm">Messages</h2>
              </div>
              <p className="text-sm text-thera-muted">No new messages yet.</p>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-thera-secondary" />
                <h2 className="font-semibold text-sm">Session history</h2>
              </div>
              <p className="text-sm text-thera-muted">Past sessions will appear here after your first booking.</p>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <NotebookPen className="w-5 h-5 text-thera-accent" />
                <h2 className="font-semibold text-sm">Journal</h2>
              </div>
              <p className="text-sm text-thera-muted mb-3">A private space for your thoughts between sessions.</p>
              <button className="text-xs font-medium text-thera-primary hover:underline">Write an entry</button>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-thera-success" />
                <h2 className="font-semibold text-sm">Goals</h2>
              </div>
              <p className="text-sm text-thera-muted">No goals set yet — add one with your therapist.</p>
            </div>

            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-thera-warning" />
                <h2 className="font-semibold text-sm">Resources</h2>
              </div>
              <p className="text-sm text-thera-muted">Curated articles and exercises based on your sessions.</p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Are you a therapist?</h2>
              </div>
              <p className="text-sm text-thera-muted">
                List yourself on the marketplace — clients contact you directly, we don&apos;t touch payments.
              </p>
              <a href="/therapist-dashboard" className="text-xs font-medium text-thera-primary hover:underline mt-2 inline-block">
                Create your listing
              </a>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Notifications</h2>
              </div>
              <p className="text-sm text-thera-muted">You&apos;re all caught up.</p>
            </div>
            <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-thera-muted" />
                <h2 className="font-semibold text-sm">Profile</h2>
              </div>
              <p className="text-sm text-thera-muted">Keep your details up to date.</p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
