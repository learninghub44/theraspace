"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Clock, Tag } from "lucide-react"

const posts = [
  {
    title: "The Future of AI in Mental Health Practice",
    excerpt: "How artificial intelligence is transforming therapy documentation, client engagement, and clinical decision support without replacing the human connection.",
    category: "AI",
    readTime: "8 min read",
    date: "Jul 15, 2026",
    color: "from-thera-primary to-thera-secondary",
  },
  {
    title: "5 Ways to Reduce Therapist Burnout",
    excerpt: "Practical strategies for managing caseloads, automating administrative tasks, and maintaining work-life balance in a demanding profession.",
    category: "Mental Health",
    readTime: "6 min read",
    date: "Jul 10, 2026",
    color: "from-thera-secondary to-thera-accent",
  },
  {
    title: "Building a Thriving Private Practice in Kenya",
    excerpt: "From licensing and marketing to client retention and scaling — a comprehensive guide for therapists starting their own practice in Kenya.",
    category: "Business Growth",
    readTime: "10 min read",
    date: "Jul 5, 2026",
    color: "from-thera-accent to-thera-primary",
  },
]

export function BlogSection() {
  return (
    <section id="resources" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Latest{" "}
              <span className="text-gradient">articles</span>
            </h2>
            <p className="text-lg text-thera-muted max-w-xl">
              Insights on mental health, AI, practice management, and business growth.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-thera-primary hover:text-thera-secondary transition-colors"
          >
            View all articles
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <Link href="/blog" className="block">
                <div className="relative p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-ink/10 transition-all duration-500 h-full flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${post.color} bg-clip-text text-transparent border border-thera-ink/10`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 group-hover:text-gradient transition-all line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-thera-muted leading-relaxed mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-thera-muted pt-4 border-t border-thera-ink/5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
