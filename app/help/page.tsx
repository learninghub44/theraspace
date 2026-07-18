"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Search, BookOpen, MessageCircle, FileText, HelpCircle, ExternalLink } from "lucide-react"

const categories = [
  { icon: BookOpen, title: "Getting Started", articles: ["Creating your account", "Setting up your calendar", "Adding your first client", "Configuring AI preferences"] },
  { icon: FileText, title: "Documentation", articles: ["Writing SOAP notes", "Using AI note generation", "Treatment plans guide", "Assessment templates"] },
  { icon: MessageCircle, title: "Client Portal", articles: ["Inviting clients", "Secure messaging", "Mood tracking setup", "Journal sharing"] },
  { icon: HelpCircle, title: "Troubleshooting", articles: ["Login issues", "Payment problems", "Data export", "Account recovery"] },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Help <span className="text-gradient">Center</span>
          </h1>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto mb-8">
            Find answers, documentation, and support for TheraSpace.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-thera-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-thera-ink/5 border border-thera-ink/10 text-thera-text placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
            />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-thera-primary/20 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-thera-primary" />
                </div>
                <h2 className="font-semibold">{cat.title}</h2>
              </div>
              <ul className="space-y-2">
                {cat.articles.map((article) => (
                  <li key={article}>
                    <button className="flex items-center gap-2 text-sm text-thera-muted hover:text-thera-primary transition-colors group">
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {article}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-gradient-to-br from-thera-primary/10 to-thera-secondary/10 border border-thera-ink/5 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-thera-muted mb-6">Our support team is ready to assist you.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all">
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
