"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  LayoutDashboard, Users, Calendar, MessageSquare, 
  BarChart3, FileText, Heart, BookOpen, Settings 
} from "lucide-react"
import { cn } from "@/app/lib/utils"

const tabs = [
  { id: "therapist", label: "Therapist", icon: LayoutDashboard },
  { id: "client", label: "Client", icon: Users },
  { id: "clinic", label: "Clinic", icon: BarChart3 },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "ai", label: "AI Chat", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "files", label: "Files", icon: FileText },
  { id: "mood", label: "Mood Tracker", icon: Heart },
  { id: "journal", label: "Journal", icon: BookOpen },
]

function DashboardMock({ type }: { type: string }) {
  const renderContent = () => {
    switch (type) {
      case "therapist":
        return (
          <div className="grid grid-cols-3 gap-4 p-6">
            <div className="col-span-3 grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Active Clients", value: "48", color: "thera-primary" },
                { label: "Today's Sessions", value: "6", color: "thera-accent" },
                { label: "Pending Notes", value: "3", color: "thera-warning" },
                { label: "Revenue (MTD)", value: "KES 84K", color: "thera-success" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs text-thera-muted mb-1">{stat.label}</p>
                  <p className={`text-xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="col-span-2 p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-sm font-medium mb-4">Weekly Overview</p>
              <div className="h-32 flex items-end gap-2">
                {[30, 45, 35, 60, 50, 70, 55].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-thera-primary/60 to-thera-accent/40" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-sm font-medium mb-4">Upcoming</p>
              <div className="space-y-3">
                {["2:00 PM - Sarah M.", "3:30 PM - James K.", "5:00 PM - Amina W."].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-thera-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "client":
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-thera-primary to-thera-secondary" />
              <div>
                <p className="font-semibold">Sarah M.</p>
                <p className="text-xs text-thera-muted">Client since Jan 2024</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-thera-muted mb-2">Mood Trend</p>
                <div className="flex items-end gap-1 h-16">
                  {[3, 4, 2, 5, 4, 3, 5].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-thera-success/60 to-thera-primary/40" style={{ height: `${h * 20}%` }} />
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-thera-muted mb-2">Next Session</p>
                <p className="text-lg font-bold">Today</p>
                <p className="text-xs text-thera-muted">2:00 PM</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-xs text-thera-muted mb-2">Recent Journal Entry</p>
              <p className="text-sm text-thera-muted">"Feeling more confident after last session. The breathing exercises really helped during the presentation..."</p>
            </div>
          </div>
        )
      case "clinic":
        return (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Therapists", value: "12" },
                { label: "Active Clients", value: "248" },
                { label: "Monthly Revenue", value: "KES 1.2M" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-2xl font-bold text-thera-primary">{stat.value}</p>
                  <p className="text-xs text-thera-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-sm font-medium mb-4">Therapist Performance</p>
              <div className="space-y-3">
                {["Dr. Kimani - 98% attendance", "Dr. Ochieng - 95% attendance", "Dr. Wanjiku - 92% attendance"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-thera-primary/30 to-thera-secondary/30" />
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-thera-primary to-thera-secondary" style={{ width: `${98 - i * 3}%` }} />
                      </div>
                    </div>
                    <span className="text-xs text-thera-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "calendar":
        return (
          <div className="p-6">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center text-xs text-thera-muted py-2">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const hasEvent = [5, 8, 12, 15, 19, 22, 26].includes(i)
                return (
                  <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs relative ${
                    i === 15 ? "bg-thera-primary/20 text-thera-primary font-bold" : "bg-white/5 text-thera-muted"
                  }`}>
                    {i + 1}
                    {hasEvent && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-thera-primary" />}
                  </div>
                )
              })}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Today's Schedule</p>
              {["9:00 AM - Initial Consultation", "11:00 AM - Follow-up Session", "2:00 PM - Group Therapy"].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-thera-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )
      case "ai":
        return (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-thera-primary/10 border border-thera-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-thera-primary" />
                <span className="text-sm font-medium text-thera-primary">AI Assistant</span>
              </div>
              <p className="text-sm text-thera-muted">How can I help you today?</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-sm mb-2">Generate SOAP note for Session #1429</p>
              <div className="p-3 rounded-lg bg-white/5 text-xs text-thera-muted space-y-1">
                <p><span className="text-thera-primary">S:</span> Client reports improved sleep...</p>
                <p><span className="text-thera-primary">O:</span> Appears relaxed, maintains eye contact...</p>
                <p><span className="text-thera-primary">A:</span> Anxiety symptoms reduced by 40%...</p>
                <p><span className="text-thera-primary">P:</span> Continue CBT exercises, next session in 2 weeks...</p>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-6 flex items-center justify-center h-64">
            <p className="text-thera-muted">Dashboard preview</p>
          </div>
        )
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-thera-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-thera-danger/80" />
          <div className="w-3 h-3 rounded-full bg-thera-warning/80" />
          <div className="w-3 h-3 rounded-full bg-thera-success/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-thera-muted text-center capitalize">
            {type} Dashboard
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  )
}

export function PlatformShowcaseSection() {
  const [activeTab, setActiveTab] = useState("therapist")

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Beautiful dashboards for{" "}
            <span className="text-gradient">everyone</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            From the therapist's desk to the client's phone, every interface is designed for clarity, speed, and delight.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-thera-primary/20 text-thera-primary border border-thera-primary/30"
                    : "bg-white/5 text-thera-muted border border-white/5 hover:bg-white/10 hover:text-white"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <DashboardMock type={activeTab} />
        </motion.div>
      </div>
    </section>
  )
}
