"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Mail, Phone, MapPin, Send, 
  CheckCircle2, User, Building, MessageSquare 
} from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    message: "",
  })

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Fold the "I am a..." + phone fields into the message body — the
    // backend table only has name/email/subject/message columns.
    const extras = [
      form.role && `Role: ${form.role}`,
      form.phone && `Phone: ${form.phone}`,
    ]
      .filter(Boolean)
      .join("\n")
    const fullMessage = extras ? `${extras}\n\n${form.message}` : form.message

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.role || undefined,
          message: fullMessage,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      setIsSubmitted(true)
      setForm({ name: "", email: "", role: "", phone: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s <span className="text-gradient">talk</span>
            </h1>
            <p className="text-lg text-thera-muted mb-12 leading-relaxed">
              Question about a listing, a therapist you found, or your subscription? Reach out —
              a real person reads every message.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-thera-ink/5 border border-thera-ink/5">
                <div className="w-10 h-10 rounded-lg bg-thera-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-thera-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p className="text-sm text-thera-muted">support@christech.co.ke</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-thera-ink/5 border border-thera-ink/5">
                <div className="w-10 h-10 rounded-lg bg-thera-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-thera-secondary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <p className="text-sm text-thera-muted">+254 701 059 192</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-thera-ink/5 border border-thera-ink/5">
                <div className="w-10 h-10 rounded-lg bg-thera-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-thera-accent" />
                </div>
                <div>
                  <p className="font-medium mb-1">Location</p>
                  <p className="text-sm text-thera-muted">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-thera-muted mx-auto mb-2" />
                <p className="text-sm text-thera-muted">Interactive Map</p>
                <p className="text-xs text-thera-muted">Nairobi, Kenya</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isSubmitted ? (
              <div className="p-8 rounded-3xl bg-thera-ink/5 border border-thera-ink/10 text-center">
                <div className="w-16 h-16 rounded-full bg-thera-success/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-thera-success" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Message sent!</h2>
                <p className="text-thera-muted mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-thera-ink/5 border border-thera-ink/10 rounded-xl hover:bg-thera-ink/10 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-thera-ink/5 border border-thera-ink/10 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-thera-muted" />
                        <input
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={updateField("name")}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-thera-muted" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={updateField("email")}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">I am a...</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-thera-muted" />
                        <input
                          type="text"
                          placeholder="Client / Therapist / Other"
                          value={form.role}
                          onChange={updateField("role")}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-thera-muted" />
                        <input
                          type="tel"
                          placeholder="+254 701 059 192"
                          value={form.phone}
                          onChange={updateField("phone")}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-thera-muted" />
                      <textarea
                        rows={5}
                        placeholder="How can we help you?"
                        value={form.message}
                        onChange={updateField("message")}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-thera-ink/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
