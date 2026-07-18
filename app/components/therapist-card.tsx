"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, CheckCircle2, GraduationCap } from "lucide-react"
import type { TherapistProfile } from "@/types"

export function TherapistCard({ therapist, index = 0 }: { therapist: TherapistProfile; index?: number }) {
  const profileHref = `/therapists/profile/?id=${therapist.id}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05 }}
      className="group rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/30 overflow-hidden transition-all duration-500 hover:-translate-y-1"
    >
      <Link href={profileHref} className="block">
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
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={profileHref} className="hover:text-thera-primary transition-colors">
            <h3 className="font-semibold text-lg">{therapist.full_name}</h3>
          </Link>
        </div>
        <p className="text-sm text-thera-muted mb-2">{therapist.specialty}</p>

        {therapist.qualifications && (
          <div className="flex items-start gap-1.5 text-xs text-thera-muted mb-3">
            <GraduationCap className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{therapist.qualifications}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-sm mb-4 flex-wrap">
          {therapist.location && (
            <div className="flex items-center gap-1 text-thera-muted">
              <MapPin className="w-3.5 h-3.5" />
              {therapist.location}
            </div>
          )}
          {therapist.languages && (
            <span className="text-thera-muted">· {therapist.languages}</span>
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
          <Link
            href={profileHref}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View & book
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
