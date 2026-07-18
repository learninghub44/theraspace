"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Users,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
} from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { supabase } from "@/app/lib/supabase"
import type { TherapistProfile } from "@/types"

export default function AdminDashboardPage() {
  const [pending, setPending] = useState<TherapistProfile[]>([])
  const [approvedCount, setApprovedCount] = useState<number | null>(null)
  const [totalUsers, setTotalUsers] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [actioningId, setActioningId] = useState<string | null>(null)
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const [pendingRes, approvedRes, usersRes] = await Promise.all([
      supabase
        .from("therapist_profiles")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("therapist_profiles")
        .select("id", { count: "exact", head: true })
        .eq("status", "approved"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ])

    if (pendingRes.error) {
      setError(pendingRes.error.message)
    } else {
      setPending((pendingRes.data ?? []) as TherapistProfile[])
    }
    setApprovedCount(approvedRes.count ?? null)
    setTotalUsers(usersRes.count ?? null)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleApprove = async (id: string) => {
    setActioningId(id)
    const { error: updateError } = await supabase
      .from("therapist_profiles")
      .update({ status: "approved", rejection_reason: null })
      .eq("id", id)
    setActioningId(null)
    if (updateError) {
      setError(updateError.message)
      return
    }
    setPending((prev) => prev.filter((p) => p.id !== id))
    setApprovedCount((prev) => (prev ?? 0) + 1)
  }

  const handleReject = async (id: string) => {
    setActioningId(id)
    const { error: updateError } = await supabase
      .from("therapist_profiles")
      .update({ status: "rejected", rejection_reason: rejectReason || null })
      .eq("id", id)
    setActioningId(null)
    setRejectingId(null)
    setRejectReason("")
    if (updateError) {
      setError(updateError.message)
      return
    }
    setPending((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <DashboardShell title="Platform overview" subtitle="Admin" requiredRole="admin" loginHref="/admin/login">
      {() => (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <Users className="w-5 h-5 text-thera-primary mb-2" />
              <p className="text-2xl font-data font-medium">{totalUsers ?? "—"}</p>
              <p className="text-xs text-thera-muted">Total users</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <UserCheck className="w-5 h-5 text-thera-secondary mb-2" />
              <p className="text-2xl font-data font-medium">{approvedCount ?? "—"}</p>
              <p className="text-xs text-thera-muted">Approved listings</p>
            </div>
            <div className="p-5 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-thera-warning mb-2" />
              <p className="text-2xl font-data font-medium">{pending.length}</p>
              <p className="text-xs text-thera-muted">Pending verification</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-thera-warning" />
              <h2 className="font-semibold">Pending therapist listings</h2>
            </div>

            {error && (
              <p className="text-sm text-thera-danger mb-4">{error}</p>
            )}

            {loading ? (
              <div className="flex items-center gap-2 text-thera-muted text-sm py-8 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading queue...
              </div>
            ) : pending.length === 0 ? (
              <p className="text-sm text-thera-muted py-8 text-center">Nothing waiting for review.</p>
            ) : (
              <div className="space-y-3">
                {pending.map((listing) => (
                  <div
                    key={listing.id}
                    className="p-4 rounded-xl bg-thera-ink/[0.03] border border-thera-ink/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-sm">{listing.full_name}</p>
                        <p className="text-xs text-thera-muted mt-0.5">
                          {listing.specialty}
                          {listing.location ? ` · ${listing.location}` : ""}
                        </p>
                        <p className="text-xs text-thera-muted mt-1">
                          Submitted {new Date(listing.created_at).toLocaleDateString()}
                        </p>
                        {listing.bio && (
                          <p className="text-xs text-thera-text/80 mt-2 max-w-xl">{listing.bio}</p>
                        )}
                        {listing.qualifications && (
                          <p className="text-xs text-thera-muted mt-1">
                            <span className="font-medium">Qualifications:</span> {listing.qualifications}
                          </p>
                        )}
                        {listing.photo_url && (
                          <a
                            href={listing.photo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-thera-primary hover:underline mt-2"
                          >
                            View photo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handleApprove(listing.id)}
                          disabled={actioningId === listing.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-thera-success text-white text-xs font-medium hover:bg-thera-success/90 transition-colors disabled:opacity-50"
                        >
                          {actioningId === listing.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectingId(rejectingId === listing.id ? null : listing.id)}
                          disabled={actioningId === listing.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-thera-ink/10 text-xs font-medium hover:bg-thera-ink/5 transition-colors disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    </div>

                    {rejectingId === listing.id && (
                      <div className="mt-3 pt-3 border-t border-thera-ink/10">
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Reason for rejection (shown to the therapist so they can resubmit)"
                          rows={2}
                          className="w-full text-xs px-3 py-2 rounded-lg bg-thera-bg border border-thera-ink/10 placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50"
                        />
                        <button
                          onClick={() => handleReject(listing.id)}
                          disabled={actioningId === listing.id}
                          className="mt-2 px-3 py-1.5 rounded-lg bg-thera-danger text-white text-xs font-medium hover:bg-thera-danger/90 transition-colors disabled:opacity-50"
                        >
                          Confirm rejection
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
