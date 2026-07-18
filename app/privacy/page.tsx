"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

const sections = [
  {
    title: "1. What this covers",
    body: [
      "This policy explains what information TheraSpace collects when you use the directory — as a client browsing or contacting a therapist, or as a therapist creating a listing — and how we handle it. We built TheraSpace as a small, focused directory, and we collect no more than we need to run it.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Account information: if you sign up, we store your email address and account role (client or therapist), managed through our authentication provider, Supabase.",
      "Therapist listing information: if you list yourself, we store what you choose to publish — your name, photo, specialty, bio, qualifications, languages, location, session types, pricing, and the phone number / email address you provide for clients to contact you. This information is public by design, because the whole point of a listing is to be found and contacted.",
      "Contact form messages: if you message us through the Contact page, we store your name, email, and message content to respond to you.",
      "Payment information: if you subscribe as a therapist, your payment is processed by Paystack. We never see or store your card, M-Pesa PIN, or full payment credentials — we only receive a confirmation of payment status, amount, and a reference number from Paystack to activate your listing.",
      "Basic technical data: standard web logs (e.g. IP address, browser type) may be collected automatically by our hosting provider for security and reliability, as with virtually any website.",
    ],
  },
  {
    title: "3. What we don't collect",
    body: [
      "We don't collect session notes, therapy content, or any detail about what you discuss with a therapist — those conversations happen entirely outside TheraSpace, directly between you and the therapist you contact.",
    ],
  },
  {
    title: "4. How we use your information",
    body: [
      "To operate the directory — showing approved, paid-up therapist listings to visitors, and letting clients search and filter them.",
      "To run therapist accounts — reviewing listings, processing subscription payments, and managing billing status.",
      "To respond to enquiries sent through our Contact page.",
      "To keep the platform secure and prevent abuse (e.g. fake listings, fraudulent payments).",
      "We do not sell your personal information to third parties, and we do not use your data for advertising.",
    ],
  },
  {
    title: "5. Who we share information with",
    body: [
      "Supabase — our database and authentication provider, which stores account and listing data.",
      "Paystack — our payment processor for therapist subscriptions. Paystack handles your card/M-Pesa details directly; we only receive payment status and reference data.",
      "Resend — our transactional email provider, used to send account-related emails (e.g. password resets).",
      "We don't share your information with anyone else, except where required by law.",
    ],
  },
  {
    title: "6. Your rights",
    body: [
      "Under the Kenya Data Protection Act, 2019, you can ask us to: give you a copy of the personal data we hold about you; correct inaccurate information; delete your account and associated data; or restrict how we use it. To exercise any of these, email support@christech.co.ke — we'll respond within a reasonable time.",
      "As a therapist, you can edit or remove your own listing at any time from your dashboard without needing to contact us.",
    ],
  },
  {
    title: "7. Data retention",
    body: [
      "We keep account and listing data for as long as your account is active. If you delete your account, we remove your listing from public view and delete your personal data within a reasonable period, except where we're required to retain payment records for accounting or legal purposes.",
    ],
  },
  {
    title: "8. Security",
    body: [
      "We use industry-standard practices to protect your data, including encrypted connections (HTTPS) and access controls on our database (row-level security policies that restrict who can read or write which records). No system is 100% secure, but we take reasonable steps to protect what we hold.",
    ],
  },
  {
    title: "9. Cookies & local storage",
    body: [
      "We use minimal local storage in your browser to keep you signed in between visits. We don't use third-party advertising or tracking cookies.",
    ],
  },
  {
    title: "10. Children's privacy",
    body: [
      "TheraSpace is not directed at children. We don't knowingly collect personal information from anyone under 18. If you believe a child has provided us with personal data, contact us and we'll remove it.",
    ],
  },
  {
    title: "11. Changes to this policy",
    body: [
      "We may update this policy occasionally. If we make a material change, we'll update the date below. Continued use of TheraSpace after a change means you accept the updated policy.",
    ],
  },
  {
    title: "12. Contact us",
    body: [
      "Questions about this policy or your data? Email support@christech.co.ke or call +254 701 059 192.",
    ],
  },
]

export default function PrivacyPage() {
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
          <h1 className="font-display font-medium text-4xl lg:text-5xl mb-3">Privacy Policy</h1>
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
