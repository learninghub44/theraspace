"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/app/lib/utils"

const faqs = [
  {
    question: "What is TheraSpace and who is it for?",
    answer: "TheraSpace is an all-in-one practice management platform designed specifically for therapists, counselors, psychologists, and mental health clinics. It helps you manage appointments, client records, clinical notes, secure messaging, and AI-assisted documentation — all in one secure platform.",
  },
  {
    question: "How does the 14-day free trial work?",
    answer: "You get full access to every feature for 14 days without entering payment details. After the trial, you can subscribe via Paystack using M-Pesa, card, or bank transfer. No contracts, cancel anytime.",
  },
  {
    question: "Is my client data secure?",
    answer: "Absolutely. TheraSpace is built on Supabase with enterprise-grade security including Row Level Security (RLS), AES-256 encryption at rest, encrypted file uploads, audit logs, and session security. We are GDPR and Kenya Data Protection Act compliant.",
  },
  {
    question: "How does the AI note generation work?",
    answer: "Powered by Groq AI, our system can generate SOAP, DAP, and BIRP notes from session summaries or transcripts. The AI never diagnoses or replaces professional judgment — it simply drafts structured notes that you review and approve before saving.",
  },
  {
    question: "Can I use TheraSpace for a group practice or clinic?",
    answer: "Yes! TheraSpace supports multi-tenant architecture where each therapist has their own secure workspace. Clinic administrators can oversee operations, manage billing, and generate reports while maintaining complete data isolation between therapists.",
  },
  {
    question: "What note formats are supported?",
    answer: "TheraSpace supports SOAP (Subjective, Objective, Assessment, Plan), DAP (Data, Assessment, Plan), and BIRP (Behavior, Intervention, Response, Plan) note formats. You can also create custom templates.",
  },
  {
    question: "Do clients get their own portal?",
    answer: "Yes, every client gets a secure portal where they can book appointments, view their schedule, track mood, write journal entries, complete assessments, and message their therapist securely.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes, you can export all your data including client records, notes, appointments, and reports in various formats (PDF, CSV, Excel) at any time. Your data belongs to you.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept payments via Paystack, which supports M-Pesa, Visa/Mastercard, and bank transfers. All payments are processed securely in Kenyan Shillings (KES).",
  },
  {
    question: "Is there a mobile app?",
    answer: "TheraSpace is fully responsive and works beautifully on mobile browsers. A native mobile app is currently in development and will be available for iOS and Android soon.",
  },
  {
    question: "How do I get support?",
    answer: "We offer email support for all subscribers. Our help center includes comprehensive documentation, video tutorials, and FAQs. Enterprise customers get priority support with dedicated account managers.",
  },
  {
    question: "Can I integrate with other tools?",
    answer: "We are working on integrations with popular tools like Google Calendar, Zoom, and WhatsApp Business. Our API will be available soon for custom integrations.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer: "You can cancel anytime with no penalties. Your data will be retained for 30 days after cancellation, giving you time to export everything. After 30 days, data is permanently deleted.",
  },
  {
    question: "Is TheraSpace compliant with healthcare regulations?",
    answer: "TheraSpace is designed to be HIPAA-ready and compliant with the Kenya Data Protection Act 2019. We implement privacy-by-design principles, data minimization, and provide tools for consent management and data deletion requests.",
  },
  {
    question: "How does the mood tracking feature work?",
    answer: "Clients can log their mood daily using a simple scale or detailed entry. The system visualizes trends over time, identifies patterns, and alerts therapists to significant changes. All data is encrypted and only visible to the client and their therapist.",
  },
  {
    question: "Can receptionists use the system?",
    answer: "Yes! We have a dedicated receptionist dashboard for managing check-ins, scheduling, payments, and waiting room displays. Receptionists have limited access based on role permissions set by the clinic admin.",
  },
  {
    question: "What is the uptime guarantee?",
    answer: "Built on Supabase infrastructure, TheraSpace targets 99.9% uptime. We use geographic redundancy, automatic backups, and real-time monitoring to ensure your practice never stops.",
  },
  {
    question: "Do you offer discounts for nonprofits or NGOs?",
    answer: "Yes! We offer special pricing for registered nonprofits, NGOs, and community mental health organizations. Contact us to learn more about our social impact program.",
  },
  {
    question: "How do I migrate from my current system?",
    answer: "We offer free data migration assistance. Our team will help you export data from your current system and import it into TheraSpace. Most migrations are completed within 48 hours.",
  },
  {
    question: "Can I customize the platform for my clinic's brand?",
    answer: "Yes! You can customize colors, logos, email templates, and client-facing pages to match your clinic's brand identity. White-label options are available for enterprise plans.",
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
