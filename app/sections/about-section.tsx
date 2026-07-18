"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

// Photo: "People relaxing on a sofa in a sunlit room" by The Ridge Ohio,
// free to use under the Unsplash License.
// https://unsplash.com/photos/people-relaxing-on-a-sofa-in-a-sunlit-room-anoapVyOVyI
function ListeningPhoto() {
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-thera-ink/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1780945806713-4bb884acec90?fm=jpg&q=80&w=1200&auto=format&fit=crop"
        alt="A woman listening attentively, calm and present, in a warm sunlit room"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
      <div className="absolute inset-0 flex items-end p-6">
        <p className="text-sm text-white/90 italic">
          &ldquo;Every person deserves a safe space to speak, be heard, and grow.&rdquo;
        </p>
      </div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section className="relative py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ListeningPhoto />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-thera-primary font-medium mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              About TheraSpace
            </p>
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl mb-6">
              Compassionate care, designed around you
            </h2>
            <p className="text-lg text-thera-muted leading-relaxed mb-4">
              We believe everyone deserves access to quality mental healthcare. TheraSpace is a
              directory of real, verified therapists across Kenya, each one listing their own
              qualifications, specialties, and rates in their own words.
            </p>
            <p className="text-lg text-thera-muted leading-relaxed">
              Finding the right therapist should be simple and reassuring from the very
              beginning — so once you find someone who fits, you reach out to them directly.
              No booking system, no waiting list, no middleman standing between you and care.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
