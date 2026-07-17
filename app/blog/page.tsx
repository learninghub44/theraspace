"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Tag } from "lucide-react"

const posts = [
  { title: "The Future of AI in Mental Health Practice", excerpt: "How artificial intelligence is transforming therapy documentation, client engagement, and clinical decision support without replacing the human connection.", category: "AI", readTime: "8 min", date: "Jul 15, 2026", color: "from-thera-primary to-thera-secondary" },
  { title: "5 Ways to Reduce Therapist Burnout", excerpt: "Practical strategies for managing caseloads, automating administrative tasks, and maintaining work-life balance in a demanding profession.", category: "Mental Health", readTime: "6 min", date: "Jul 10, 2026", color: "from-thera-secondary to-thera-accent" },
  { title: "Building a Thriving Private Practice in Kenya", excerpt: "From licensing and marketing to client retention and scaling — a comprehensive guide for therapists starting their own practice in Kenya.", category: "Business Growth", readTime: "10 min", date: "Jul 5, 2026", color: "from-thera-accent to-thera-primary" },
  { title: "Understanding SOAP Notes: A Complete Guide", excerpt: "Master the art of clinical documentation with structured note formats, best practices, and common pitfalls to avoid.", category: "Practice Management", readTime: "7 min", date: "Jun 28, 2026", color: "from-thera-success to-thera-primary" },
  { title: "HIPAA Compliance for Kenyan Therapists", excerpt: "Navigating data protection requirements in mental health practice. What you need to know about Kenya Data Protection Act 2019.", category: "Security", readTime: "9 min", date: "Jun 20, 2026", color: "from-thera-warning to-thera-danger" },
  { title: "Client Engagement Through Technology", excerpt: "How digital tools can improve therapy outcomes, increase client retention, and create a more connected therapeutic relationship.", category: "Mental Health", readTime: "5 min", date: "Jun 15, 2026", color: "from-thera-primary to-thera-accent" },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            TheraSpace <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-lg text-thera-muted max-w-2xl">
            Insights on mental health, AI, practice management, and business growth for therapists.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all h-full flex flex-col">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${post.color} bg-clip-text text-transparent border border-white/10 w-fit mb-4`}>
                  {post.category}
                </span>
                <h2 className="text-lg font-bold mb-3 group-hover:text-gradient transition-all line-clamp-2">{post.title}</h2>
                <p className="text-sm text-thera-muted leading-relaxed mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-thera-muted pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
