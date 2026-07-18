"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Languages,
  Video,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import { supabase } from "@/app/lib/supabase"
import type { TherapistProfile } from "@/types"

const SESSION_MODE_LABELS: Record<string, { label: string; icon: typeof Video }> = {
  video: { label: "Video sessions", icon: Video },
  in_person: { label: "In-person sessions", icon: Users },
  phone: { label: "Phone sessions", icon: Phone },
}

/** Normalizes a Kenyan-style phone number to the digits-only, country-code
 * form wa.me expects (e.g. "0712 345 678" -> "254712345678"). */
function toWhatsAppNumber(raw: string) {
  const digits = raw.replace(/[^\d]/g, "")
  if (digits.startsWith("254")) return digits
  if (digits.startsWith("0")) return `254${digits.slice(1)}`
  return digits
}

export default function TherapistProfilePage() {
  const [therapist, setTherapist] = useState<TherapistProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    if (!id) {
      setError("No therapist specified.")
      setLoading(false)
      return
    }

    let active = true
    supabase
      .from("therapist_profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error: queryError }) => {
        if (!active) return
        if (queryError || !data) {
          setError("We couldn't find that listing. It may have been removed or isn't live yet.")
        } else {
          setTherapist(data as TherapistProfile)
        }
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center gap-2 text-thera-muted text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading profile...
      </div>
    )
  }

  if (error || !therapist) {
    return (
      <div className="min-h-screen pt-28 pb-20 max-w-2xl mx-auto px-4 text-center">
        <p className="text-thera-muted mb-6">{error ?? "Listing not found."}</p>
        <Link
          href="/therapists/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Back to directory
        </Link>
      </div>
    )
  }

  const whatsappHref = therapist.contact_phone
    ? `https://wa.me/${toWhatsAppNumber(therapist.contact_phone)}?text=${encodeURIComponent(
        `Hi ${therapist.full_name}, I found your listing on TheraSpace and would like to book a session.`
      )}`
    : null

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/therapists/"
          className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to directory
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[280px_1fr] gap-8"
        >
          {/* Left: photo + quick contact card */}
          <div>
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden bg-thera-ink/10 mb-4">
              {therapist.photo_url && (
                <img
                  src={therapist.photo_url}
                  alt={therapist.full_name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-thera-bg/80 backdrop-blur-sm border border-thera-ink/10 text-xs font-medium text-thera-accent">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </div>
            </div>

            <div className="rounded-2xl bg-thera-ink/5 border border-thera-ink/5 p-5 space-y-3">
              <p className="text-sm font-medium text-thera-muted mb-1">Book / contact directly</p>

              {therapist.contact_phone && (
                <a
                  href={`tel:${therapist.contact_phone}`}
                  className="flex items-center gap-2 text-sm hover:text-thera-primary transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" /> {therapist.contact_phone}
                </a>
              )}
              {therapist.contact_email && (
                <a
                  href={`mailto:${therapist.contact_email}`}
                  className="flex items-center gap-2 text-sm hover:text-thera-primary transition-colors break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" /> {therapist.contact_email}
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" /> Message on WhatsApp
                </a>
              )}

              <p className="text-xs text-thera-muted pt-2 border-t border-thera-ink/10">
                Sessions and payment are arranged directly between you and{" "}
                {therapist.full_name.split(" ")[0]} — TheraSpace doesn't take a booking fee or
                commission.
              </p>
            </div>
          </div>

          {/* Right: details */}
          <div>
            <h1 className="font-display font-medium text-3xl sm:text-4xl mb-2">
              {therapist.full_name}
            </h1>
            <p className="text-thera-primary font-medium mb-4">{therapist.specialty}</p>

            <div className="flex flex-wrap gap-4 text-sm text-thera-muted mb-6">
              {therapist.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {therapist.location}
                </div>
              )}
              {therapist.languages && (
                <div className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4" /> {therapist.languages}
                </div>
              )}
            </div>

            {therapist.session_modes?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {therapist.session_modes.map((mode) => {
                  const meta = SESSION_MODE_LABELS[mode]
                  if (!meta) return null
                  const Icon = meta.icon
                  return (
                    <span
                      key={mode}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-thera-primary/10 text-thera-primary"
                    >
                      <Icon className="w-3.5 h-3.5" /> {meta.label}
                    </span>
                  )
                })}
              </div>
            )}

            {therapist.bio && (
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2">About</h2>
                <p className="text-thera-muted leading-relaxed whitespace-pre-line">{therapist.bio}</p>
              </div>
            )}

            {therapist.qualifications && (
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-thera-primary" /> Qualifications
                </h2>
                <p className="text-thera-muted leading-relaxed whitespace-pre-line">
                  {therapist.qualifications}
                </p>
              </div>
            )}

            <div className="rounded-2xl bg-thera-ink/5 border border-thera-ink/5 p-5">
              <p className="text-sm text-thera-muted">
                {therapist.price_from ? (
                  <>
                    Sessions from{" "}
                    <span className="text-thera-text font-semibold">
                      KES {therapist.price_from.toLocaleString()}
                    </span>
                    . Exact pricing and scheduling are confirmed directly with{" "}
                    {therapist.full_name.split(" ")[0]}.
                  </>
                ) : (
                  <>Contact {therapist.full_name.split(" ")[0]} directly for pricing and availability.</>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
