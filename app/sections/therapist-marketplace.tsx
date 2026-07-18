"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, CheckCircle2, Loader2 } from "lucide-react"
import { supabase } from "@/app/lib/supabase"
import type { TherapistProfile } from "@/types"

function TherapistCard({ therapist, index }: { therapist: TherapistProfile; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/30 overflow-hidden transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-thera-ink/10">
        {therapist.photo_url && (
          <img
            src={therapist.photo_url}
            alt={therapist.full_name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-thera-bg/80 backdrop-blur-sm border border-thera-ink/10 text-xs font-medium text-thera-accent">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-lg">{therapist.full_name}</h3>
        </div>
        <p className="text-sm text-thera-muted mb-3">{therapist.specialty}</p>

        <div className="flex items-center gap-3 text-sm mb-4">
          {therapist.location && (
            <div className="flex items-center gap-1 text-thera-muted">
              <MapPin className="w-3.5 h-3.5" />
              {therapist.location}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-thera-muted">
            {therapist.price_from ? (
              <>From <span className="text-thera-text font-semibold">KES {therapist.price_from.toLocaleString()}</span>/session</>
            ) : (
              "Contact for pricing"
            )}
          </span>
          <a
            href={
              therapist.contact_email
                ? `mailto:${therapist.contact_email}`
                : therapist.contact_phone
                ? `tel:${therapist.contact_phone}`
                : "#contact"
            }
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function TherapistMarketplaceSection() {
  const [therapists, setTherapists] = useState<TherapistProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase
      .from("therapist_profiles")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        if (!active) return
        if (!error && data) setTherapists(data as TherapistProfile[])
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="therapists" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-thera-bg via-thera-card/30 to-thera-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-thera-muted mb-4">Find your therapist</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Browse the marketplace
          </h2>
          <p className="text-thera-muted">
            Therapists list themselves — qualifications, specialties, and their own pricing. Reach out to whoever fits.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-thera-muted text-sm py-12">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading therapists...
          </div>
        ) : therapists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-thera-muted mb-4">No listings yet — be the first therapist on TheraSpace.</p>
            <a
              href="/signup"
              className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
            >
              List yourself
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((therapist, i) => (
              <TherapistCard key={therapist.id} therapist={therapist} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
