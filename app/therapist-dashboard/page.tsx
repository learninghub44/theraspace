"use client"

import { useCallback, useEffect, useState } from "react"
import {
  UserCircle2,
  Loader2,
  CheckCircle2,
  Clock4,
  XCircle,
  Save,
  CreditCard,
  AlertTriangle,
} from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { PhotoDropzone } from "@/app/components/photo-dropzone"
import { supabase } from "@/app/lib/supabase"
import { useSubscription, isSubscriptionActive } from "@/app/lib/use-subscription"
import type { Session } from "@supabase/supabase-js"
import type { TherapistProfile } from "@/types"

const SESSION_MODE_OPTIONS = [
  { value: "video", label: "Video" },
  { value: "in_person", label: "In-person" },
  { value: "phone", label: "Phone" },
]

type FormState = {
  full_name: string
  photo_url: string
  specialty: string
  bio: string
  qualifications: string
  languages: string
  location: string
  price_from: string
  session_modes: string[]
  contact_phone: string
  contact_email: string
}

const emptyForm: FormState = {
  full_name: "",
  photo_url: "",
  specialty: "",
  bio: "",
  qualifications: "",
  languages: "",
  location: "",
  price_from: "",
  session_modes: [],
  contact_phone: "",
  contact_email: "",
}

function StatusBadge({ status }: { status: TherapistProfile["status"] }) {
  const map = {
    pending: { icon: Clock4, label: "Pending review", cls: "bg-thera-warning/10 text-thera-warning" },
    approved: { icon: CheckCircle2, label: "Live on the marketplace", cls: "bg-thera-success/10 text-thera-success" },
    rejected: { icon: XCircle, label: "Changes requested", cls: "bg-thera-danger/10 text-thera-danger" },
  } as const
  const { icon: Icon, label, cls } = map[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  )
}

function ListingForm({ session }: { session: Session }) {
  const [listing, setListing] = useState<TherapistProfile | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const loadListing = useCallback(async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from("therapist_profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle()

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    if (data) {
      const row = data as TherapistProfile
      setListing(row)
      setForm({
        full_name: row.full_name ?? "",
        photo_url: row.photo_url ?? "",
        specialty: row.specialty ?? "",
        bio: row.bio ?? "",
        qualifications: row.qualifications ?? "",
        languages: row.languages ?? "",
        location: row.location ?? "",
        price_from: row.price_from?.toString() ?? "",
        session_modes: row.session_modes ?? [],
        contact_phone: row.contact_phone ?? "",
        contact_email: row.contact_email ?? session.user.email ?? "",
      })
    } else {
      setForm((f) => ({ ...f, contact_email: session.user.email ?? "" }))
    }
    setLoading(false)
  }, [session])

  useEffect(() => {
    loadListing()
  }, [loadListing])

  const toggleMode = (value: string) => {
    setForm((f) => ({
      ...f,
      session_modes: f.session_modes.includes(value)
        ? f.session_modes.filter((m) => m !== value)
        : [...f.session_modes, value],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)

    const payload = {
      user_id: session.user.id,
      full_name: form.full_name,
      photo_url: form.photo_url || null,
      specialty: form.specialty,
      bio: form.bio || null,
      qualifications: form.qualifications || null,
      languages: form.languages || null,
      location: form.location || null,
      price_from: form.price_from ? parseInt(form.price_from, 10) : null,
      session_modes: form.session_modes,
      contact_phone: form.contact_phone || null,
      contact_email: form.contact_email || null,
    }

    const { data, error: upsertError } = await supabase
      .from("therapist_profiles")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .single()

    setSaving(false)

    if (upsertError) {
      setError(upsertError.message)
      return
    }

    setListing(data as TherapistProfile)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-thera-muted text-sm py-12 justify-center">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading your listing...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <UserCircle2 className="w-5 h-5 text-thera-primary" />
            <h2 className="font-semibold">Your listing</h2>
          </div>
          {listing && <StatusBadge status={listing.status} />}
        </div>
        <p className="text-sm text-thera-muted mb-2">
          This is what visitors see in the marketplace. TheraSpace doesn&apos;t handle
          session bookings or payments between you and clients — they contact you directly
          using the details below. Your KES 950/month subscription only covers being listed.
        </p>
        {listing?.status === "rejected" && listing.rejection_reason && (
          <p className="text-sm text-thera-danger bg-thera-danger/10 border border-thera-danger/20 rounded-xl px-4 py-3 mt-3">
            <span className="font-medium">Admin feedback:</span> {listing.rejection_reason}
          </p>
        )}
        {listing?.status === "pending" && (
          <p className="text-xs text-thera-muted mt-3">
            An admin will review your details before this listing appears publicly.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm space-y-5">
        {error && (
          <p className="text-sm text-thera-danger bg-thera-danger/10 border border-thera-danger/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full name</label>
            <input
              required
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              placeholder="Dr. Amina Njoroge"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Specialty</label>
            <input
              required
              value={form.specialty}
              onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
              placeholder="Anxiety & Stress Management"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            placeholder="Tell clients about your approach and experience..."
            className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Qualifications</label>
          <input
            value={form.qualifications}
            onChange={(e) => setForm((f) => ({ ...f, qualifications: e.target.value }))}
            placeholder="MSc Clinical Psychology, Licensed Counsellor (Kenya Board)"
            className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Languages</label>
            <input
              value={form.languages}
              onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))}
              placeholder="English, Kiswahili"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="Nairobi"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Price from (KES / session)</label>
            <input
              type="number"
              min="0"
              value={form.price_from}
              onChange={(e) => setForm((f) => ({ ...f, price_from: e.target.value }))}
              placeholder="2500"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
            <p className="text-xs text-thera-muted mt-1">You set your own rate — this is a directory, not a checkout.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Photo</label>
            <PhotoDropzone
              userId={session.user.id}
              value={form.photo_url}
              onChange={(url) => setForm((f) => ({ ...f, photo_url: url }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Session modes</label>
          <div className="flex gap-2 flex-wrap">
            {SESSION_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleMode(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  form.session_modes.includes(opt.value)
                    ? "bg-thera-primary text-white border-thera-primary"
                    : "bg-thera-ink/5 border-thera-ink/10 hover:bg-thera-ink/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Contact phone</label>
            <input
              value={form.contact_phone}
              onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))}
              placeholder="+254 7XX XXX XXX"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contact email</label>
            <input
              type="email"
              value={form.contact_email}
              onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-thera-ink/5 border border-thera-ink/10 focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {listing ? "Save & resubmit for review" : "Submit listing for review"}
        </button>
        {saved && <p className="text-sm text-thera-success">Saved.</p>}
      </form>
    </div>
  )
}

function BillingCard({ session }: { session: Session }) {
  const { subscription, status, refresh } = useSubscription(session)
  const [paying, setPaying] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If we just came back from a Paystack redirect, poll a few times —
  // the webhook that flips the row to "active" can land a second or two
  // after the browser is redirected back.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has("reference") && !params.has("trxref")) return
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      refresh()
      if (attempts >= 5) clearInterval(interval)
    }, 2000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const active = isSubscriptionActive(subscription)

  const handleSubscribe = async () => {
    setPaying(true)
    setError(null)
    const {
      data: { session: freshSession },
    } = await supabase.auth.getSession()
    let data: { authorization_url?: string; error?: string } | null = null
    let requestFailed = false
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { Authorization: `Bearer ${freshSession?.access_token ?? ""}` },
      })
      data = await res.json().catch(() => null)
    } catch {
      requestFailed = true
    }
    setPaying(false)
    if (requestFailed || !data?.authorization_url) {
      setError(data?.error ?? "Could not start payment.")
      return
    }
    window.location.href = data.authorization_url
  }

  const handleCancel = async () => {
    setCancelling(true)
    setError(null)
    const {
      data: { session: freshSession },
    } = await supabase.auth.getSession()
    let ok = false
    let errorMessage = "Could not cancel subscription."
    try {
      const res = await fetch("/api/paystack/cancel", {
        method: "POST",
        headers: { Authorization: `Bearer ${freshSession?.access_token ?? ""}` },
      })
      ok = res.ok
      if (!ok) {
        const data = await res.json().catch(() => null)
        errorMessage = data?.error ?? errorMessage
      }
    } catch {
      ok = false
    }
    setCancelling(false)
    if (!ok) {
      setError(errorMessage)
      return
    }
    refresh()
  }

  return (
    <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="w-5 h-5 text-thera-primary" />
        <h2 className="font-semibold">Listing subscription</h2>
      </div>
      <p className="text-sm text-thera-muted mb-4">
        Your listing only appears in the public marketplace while it&apos;s approved{" "}
        <span className="font-medium">and</span> your subscription is active — KES 950/month, via
        M-Pesa or card.
      </p>

      {error && (
        <p className="text-sm text-thera-danger bg-thera-danger/10 border border-thera-danger/20 rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}

      {status === "loading" ? (
        <div className="flex items-center gap-2 text-thera-muted text-sm py-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Checking subscription...
        </div>
      ) : active ? (
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-thera-success/10 text-thera-success">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active — paid through{" "}
            {subscription?.current_period_end
              ? new Date(subscription.current_period_end).toLocaleDateString()
              : ""}
          </span>
          <div>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="text-xs text-thera-muted hover:text-thera-danger underline disabled:opacity-50"
            >
              {cancelling ? "Cancelling..." : "Cancel — stay listed until the paid period ends"}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-thera-warning/10 text-thera-warning">
            <AlertTriangle className="w-3.5 h-3.5" />
            {subscription?.status === "past_due" ? "Last payment failed" : "Not subscribed — not visible publicly"}
          </span>
          <button
            onClick={handleSubscribe}
            disabled={paying}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all disabled:opacity-50"
          >
            {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            Pay KES 950 & go live
          </button>
        </div>
      )}
    </div>
  )
}

export default function TherapistDashboardPage() {
  return (
    <DashboardShell title="Your listing" subtitle="Signed in as">
      {(session) => (
        <div className="space-y-6">
          <BillingCard session={session} />
          <ListingForm session={session} />
        </div>
      )}
    </DashboardShell>
  )
}
