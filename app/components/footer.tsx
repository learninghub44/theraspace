"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Heart, ArrowUpRight, Mail, MapPin, Phone,
  Twitter, Linkedin, Github, Instagram
} from "lucide-react"

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "#security" },
    { name: "Integrations", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "/help" },
    { name: "Help Center", href: "/help" },
    { name: "API Reference", href: "#" },
    { name: "Status", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Compliance", href: "#" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-thera-bg">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-20">
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay in the <span className="text-gradient">loop</span>
            </h3>
            <p className="text-thera-muted text-lg">
              Get the latest updates on features, AI improvements, and practice management tips.
            </p>
          </div>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-thera-primary via-thera-secondary to-thera-accent rounded-lg opacity-80" />
                <div className="absolute inset-1 bg-thera-bg rounded-md flex items-center justify-center">
                  <span className="text-sm font-bold text-gradient">T</span>
                </div>
              </div>
              <span className="text-lg font-bold">
                Thera<span className="text-thera-primary">Space</span>
              </span>
            </Link>
            <p className="text-thera-muted text-sm mb-6 max-w-xs">
              The all-in-one practice management platform for therapists and mental health professionals in Kenya and beyond.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-thera-muted hover:text-white"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-thera-muted">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-white transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-thera-muted">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-white transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-thera-muted">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-white transition-colors flex items-center gap-1 group">
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
                  <Link href={link.href} className="text-sm text-thera-muted hover:text-white transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-white/5 grid md:grid-cols-3 gap-6">
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
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-thera-muted">
            &copy; {new Date().getFullYear()} TheraSpace. All rights reserved.
          </p>
          <p className="text-sm text-thera-muted flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-thera-danger fill-thera-danger" /> in Kenya
          </p>
        </div>
      </div>
    </footer>
  )
}
