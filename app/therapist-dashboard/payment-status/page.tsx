"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, XCircle, Clock4, Loader2, ArrowLeft, CreditCard } from "lucide-react"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { supabase } from "@/app/lib/supabase"
import type { Session } from "@supabase/supabase-js"

type Result = "verifying" | "success" | "failed" | "pending" | "cancelled" | "error"

const COPY: Record<
  Exclude<Result, "verifying">,
  { icon: typeof CheckCircle2; title: string; body: string; cls: string }
> = {
  success: {
    icon: CheckCircle2,
    title: "Payment successful",
    body: "You're all set — your listing subscription is now active and will appear in the marketplace once it's approved.",
    cls: "text-thera-success bg-thera-success/10 border-thera-success/20",
  },
  failed: {
    icon: XCircle,
    title: "Payment failed",
    body: "Paystack couldn't complete this charge. No money was deducted for this attempt — you can try again below.",
    cls: "text-thera-danger bg-thera-danger/10 border-thera-danger/20",
  },
  cancelled: {
    icon: XCircle,
    title: "Payment cancelled",
    body: "You cancelled checkout before it completed. Your listing isn't subscribed yet — try again whenever you're ready.",
    cls: "text-thera-muted bg-thera-ink/5 border-thera-ink/10",
  },
  pending: {
    icon: Clock4,
    title: "Payment processing",
    body: "This is taking a little longer than usual (common with mobile money). Refresh in a minute — we'll update your subscription as soon as it clears.",
    cls: "text-thera-warning bg-thera-warning/10 border-thera-warning/20",
  },
  error: {
    icon: XCircle,
    title: "Couldn't confirm this payment",
    body: "Something went wrong checking this transaction. If you were charged, it will still be picked up automatically — otherwise, try again.",
    cls: "text-thera-danger bg-thera-danger/10 border-thera-danger/20",
  },
}

function StatusPanel({ session }: { session: Session }) {
  const [result, setResult] = useState<Result>("verifying")

  const verify = useCallback(async () => {
    const params = new URLSearchParams(window.location.search)
    const reference = params.get("reference") ?? params.get("trxref")

    // No reference at all means Paystack never redirected back — the user
    // backed out of checkout before it finished.
    if (!reference) {
      setResult("cancelled")
      return
    }

    setResult("verifying")
    const {
      data: { session: freshSession },
    } = await supabase.auth.getSession()

    try {
      const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`, {
        headers: { Authorization: `Bearer ${freshSession?.access_token ?? ""}` },
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.result) {
        setResult("error")
        return
      }
      setResult(data.result as Result)
    } catch {
      setResult("error")
    }
  }, [])

  useEffect(() => {
    verify()
  }, [verify])

  if (result === "verifying") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Loader2 className="w-8 h-8 text-thera-primary animate-spin" />
        <p className="text-thera-muted text-sm">Confirming your payment with Paystack...</p>
      </div>
    )
  }

  const { icon: Icon, title, body, cls } = COPY[result]

  return (
    <div className={`rounded-2xl border p-6 text-center ${cls}`}>
      <Icon className="w-10 h-10 mx-auto mb-4" />
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <p className="text-sm mb-6 opacity-90">{body}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {(result === "failed" || result === "cancelled" || result === "error") && (
          <Link
            href="/therapist-dashboard/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold text-sm"
          >
            <CreditCard className="w-4 h-4" />
            Back to billing
          </Link>
        )}
        {result === "pending" && (
          <button
            onClick={verify}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold text-sm"
          >
            <Loader2 className="w-4 h-4" />
            Check again
          </button>
        )}
        {result === "success" && (
          <Link
            href="/therapist-dashboard/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-xl font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to your dashboard
          </Link>
        )}
      </div>
    </div>
  )
}

export default function PaymentStatusPage() {
  return (
    <DashboardShell title="Payment status" subtitle="Signed in as">
      {(session) => (
        <div className="max-w-lg mx-auto">
          <StatusPanel session={session} />
        </div>
      )}
    </DashboardShell>
  )
}
