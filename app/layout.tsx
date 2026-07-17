import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Navbar } from "@/app/components/navbar"
import { Footer } from "@/app/components/footer"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "TheraSpace — Run Your Therapy Practice, Not Your Paperwork",
    template: "%s | TheraSpace",
  },
  description: "TheraSpace is the all-in-one practice management platform for therapists, clinics, and mental health professionals. Manage appointments, clients, AI notes, secure messaging, and more.",
  keywords: ["therapy practice management", "therapist software", "mental health platform", "clinic management", "SOAP notes", "AI therapy assistant", "appointment scheduling", "Kenya"],
  authors: [{ name: "TheraSpace" }],
  creator: "TheraSpace",
  metadataBase: new URL("https://mytherapist.christech.co.ke"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://mytherapist.christech.co.ke",
    siteName: "TheraSpace",
    title: "TheraSpace — Run Your Therapy Practice, Not Your Paperwork",
    description: "The all-in-one practice management platform for therapists and mental health professionals.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TheraSpace Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheraSpace — Run Your Therapy Practice, Not Your Paperwork",
    description: "The all-in-one practice management platform for therapists and mental health professionals.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#030712" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TheraSpace",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "1000",
                priceCurrency: "KES",
                priceValidUntil: "2026-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "128",
              },
              description: "All-in-one practice management platform for therapists and mental health professionals.",
              url: "https://mytherapist.christech.co.ke",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
