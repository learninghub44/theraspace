"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/app/lib/utils"

const faqs = [
  {
    question: "Is TheraSpace free?",
    answer: "Yes. Listing yourself as a therapist is free, and browsing the directory is free. We don't charge fees on sessions you book.",
  },
  {
    question: "Do you handle bookings or payments?",
    answer: "No. TheraSpace is a directory — you contact a therapist directly by phone or email and arrange sessions and payment between yourselves.",
  },
  {
    question: "How are therapists verified?",
    answer: "Every listing is reviewed by our team before it goes live. We check the qualifications and details a therapist submits before approving their profile.",
  },
  {
    question: "How do I list myself as a therapist?",
    answer: "Create an account, then fill in your profile — specialty, qualifications, languages, location, pricing, and how clients can reach you. It goes live once approved.",
  },
  {
    question: "Can I edit my listing later?",
    answer: "Yes, anytime from your dashboard. Edits to an already-approved listing are briefly re-reviewed before going back live.",
  },
  {
    question: "Is my information secure?",
    answer: "Your account is protected with standard authentication, and only approved listing details are shown publicly.",
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="border-b border-thera-ink/5 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm lg:text-base font-medium pr-8 group-hover:text-gradient transition-all">
          {faq.question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-lg bg-thera-ink/5 flex items-center justify-center flex-shrink-0 transition-all duration-300",
          isOpen && "bg-thera-primary/20"
        )}>
          <ChevronDown className={cn(
            "w-4 h-4 text-thera-muted transition-transform duration-300",
            isOpen && "rotate-180 text-thera-primary"
          )} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-thera-muted leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm mb-6">
            <HelpCircle className="w-4 h-4 text-thera-primary" />
            <span className="text-thera-primary font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Frequently asked{" "}
            <span className="text-gradient">questions</span>
          </h2>
          <p className="text-lg text-thera-muted">
            Everything you need to know about TheraSpace.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="rounded-2xl bg-thera-ink/5 border border-thera-ink/5 p-6 lg:p-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
