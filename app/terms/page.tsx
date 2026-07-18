"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

const sections = [
  {
    title: "1. What TheraSpace is",
    body: [
      "TheraSpace (\"we\", \"us\", \"the platform\") is a directory website where independent therapists in Kenya create and manage their own public listings. We are not a therapy clinic, we do not employ or supervise any listed therapist, and we are not a party to any therapy relationship, session, or payment arranged between a client and a therapist.",
      "TheraSpace does not provide medical, psychiatric, or therapeutic advice, and using the directory does not create a therapist-client relationship with TheraSpace.",
    ],
  },
  {
    title: "2. If you are in crisis",
    body: [
      "TheraSpace is a directory, not an emergency service, and listings are not monitored in real time. If you are in immediate danger or experiencing a mental health emergency, please contact local emergency services or go to your nearest hospital rather than relying on a message sent through this site.",
    ],
  },
  {
    title: "3. Who can use TheraSpace",
    body: [
      "You must be at least 18 years old to create a therapist listing or to submit a booking/contact enquiry through the site on your own behalf. If you are seeking support for a minor, a parent or guardian should make contact with the therapist directly.",
    ],
  },
  {
    title: "4. Therapist listings",
    body: [
      "If you list yourself as a therapist, you are solely responsible for the accuracy of everything in your profile — your qualifications, licensing, specialties, languages, pricing, and contact details. You confirm that you hold any qualifications or licenses you claim, and that you are legally permitted to offer the services you describe.",
      "We review listings before they go live and may reject or remove a listing, at any time, if it appears inaccurate, misleading, incomplete, or in violation of these Terms — with or without prior notice. Editing an approved listing sends it back for re-review before it's public again.",
      "You are responsible for keeping your listing accurate and up to date. TheraSpace does not verify professional licenses or credentials with issuing bodies; approval means a listing passed our review, not that we have independently confirmed every claim in it.",
    ],
  },
  {
    title: "5. Subscription & payment (therapists)",
    body: [
      "Being listed publicly costs KES 950 per month, billed via Paystack. Your listing becomes visible to the public only while your listing is approved AND your subscription is active and unexpired — if a payment isn't made, your listing simply stops appearing publicly; nothing is deleted.",
      "Subscription payments are non-refundable, including for partial months, unused time, or listings that are later rejected or removed for a Terms violation. You may cancel anytime from your therapist dashboard; cancellation stops future billing but does not refund the current period.",
      "Kenyan mobile money (M-Pesa) payments through Paystack don't support automatic recurring debits, so your subscription is tracked as a rolling paid-through date rather than an auto-renewing charge. You're responsible for renewing before your current period ends if you want to remain listed continuously.",
    ],
  },
  {
    title: "6. Contact, booking & payment between clients and therapists",
    body: [
      "TheraSpace does not process session bookings and does not process, hold, or transmit any payment for therapy sessions. All scheduling, session fees, cancellation policies, and payment methods are arranged directly and independently between you and the therapist you contact.",
      "We are not responsible for a therapist's availability, response time, conduct, the quality or outcome of any session, or any dispute — financial or otherwise — arising between a client and a therapist.",
    ],
  },
  {
    title: "7. Acceptable use",
    body: [
      "You agree not to: submit false or misleading information in a listing or enquiry; use the site to harass, threaten, or defraud another user; scrape or bulk-collect listing data; attempt to bypass the subscription requirement; or use the platform for any unlawful purpose.",
      "We may suspend or terminate access for any account that violates these Terms.",
    ],
  },
  {
    title: "8. Limitation of liability",
    body: [
      "To the fullest extent permitted by Kenyan law, TheraSpace and its operators are not liable for any indirect, incidental, or consequential damages arising from your use of the site, your reliance on a listing, or any interaction, session, or payment arranged with a therapist found through the directory.",
      "The platform is provided \"as is\" — we don't guarantee it will be uninterrupted, error-free, or that any particular therapist will be available or suitable for your needs.",
    ],
  },
  {
    title: "9. Intellectual property",
    body: [
      "The TheraSpace name, logo, and site design belong to us. Content within your own listing (your bio, photo, qualifications) remains yours — by publishing it you grant us a license to display it on the directory for as long as your listing is live.",
    ],
  },
  {
    title: "10. Changes to these Terms",
    body: [
      "We may update these Terms from time to time. Continued use of the site after a change means you accept the updated Terms. Material changes will be reflected by an updated date on this page.",
    ],
  },
  {
    title: "11. Governing law",
    body: [
      "These Terms are governed by the laws of Kenya. Any dispute arising from your use of TheraSpace will be subject to the exclusive jurisdiction of the courts of Kenya.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      "Questions about these Terms? Reach us at support@christech.co.ke or +254 701 059 192.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-display font-medium text-4xl lg:text-5xl mb-3">Terms of Service</h1>
          <p className="text-sm text-thera-muted mb-12">Last updated: July 18, 2026</p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <div className="space-y-3">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-thera-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
