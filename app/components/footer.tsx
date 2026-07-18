"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowUpRight, Mail, MapPin, Phone, CheckCircle2,
  Twitter, Linkedin, Github, Instagram
} from "lucide-react"
import { LogoMark } from "@/app/components/logo"

const footerLinks = {
  marketplace: [
    { name: "Find Therapist", href: "/therapists" },
    { name: "Get Seen — KES 950/mo", href: "/signup" },
    { name: "How It Works", href: "/#how-it-works" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/#faq" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <footer className="relative border-t border-thera-ink/5 bg-thera-bg">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-20">
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay in the <span className="text-gradient">loop</span>
            </h3>
            <p className="text-thera-muted text-lg">
              Get notified when new therapists join near you, and when we add new specialties to
              the directory.
            </p>
          </div>
          <div>
            {status === "success" ? (
              <div className="flex items-center gap-3 px-5 py-4 bg-thera-primary/10 border border-thera-primary/20 rounded-xl text-thera-text">
                <CheckCircle2 className="w-5 h-5 text-thera-primary flex-shrink-0" />
                <span className="text-sm">You&apos;re subscribed — thanks!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 bg-thera-ink/5 border border-thera-ink/10 rounded-xl text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
            {status === "error" && error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <LogoMark className="w-8 h-8" />
              <span className="text-lg font-display font-medium">
                Thera<span className="text-thera-primary">Space</span>
              </span>
            </Link>
            <p className="text-thera-muted text-sm mb-6 max-w-xs">
              A directory of real, verified therapists across Kenya — each one lists their own
              qualifications, specialties, and pricing. Browsing and contacting them is free,
              always.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href === "#" ? undefined : "_blank"}
                  rel={social.href === "#" ? undefined : "noopener noreferrer"}
                  onClick={social.href === "#" ? (e) => e.preventDefault() : undefined}
                  className="p-2.5 rounded-lg bg-thera-ink/5 hover:bg-thera-ink/10 transition-colors text-thera-muted hover:text-thera-text"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-thera-muted">Marketplace</h4>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-thera-text transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-thera-muted">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-thera-text transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-thera-muted">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-thera-text transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-thera-ink/5 grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 text-sm text-thera-muted">
            <Mail className="w-4 h-4 text-thera-primary" />
            <span>support@christech.co.ke</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-thera-muted">
            <Phone className="w-4 h-4 text-thera-primary" />
            <span>+254 701 059 192</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-thera-muted">
            <MapPin className="w-4 h-4 text-thera-primary" />
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-thera-ink/5 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-thera-muted">
            &copy; {new Date().getFullYear()} TheraSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
