"use client"

import { motion } from "framer-motion"
import { MapPin, CheckCircle2 } from "lucide-react"
import type { TherapistProfile } from "@/types"

export function TherapistCard({ therapist, index = 0 }: { therapist: TherapistProfile; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05 }}
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
