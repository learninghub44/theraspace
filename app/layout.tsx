import type { Metadata } from "next"
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Navbar } from "@/app/components/navbar"
import { Footer } from "@/app/components/footer"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  weight: ["500"],
})

export const metadata: Metadata = {
  title: {
    default: "TheraSpace — Find a Therapist in Kenya",
    template: "%s | TheraSpace",
  },
  description: "A directory of therapists across Kenya, free to browse. Contact a therapist directly — no booking fees, no middleman.",
  keywords: ["find a therapist Kenya", "therapist directory", "mental health support Kenya", "counseling Nairobi", "therapy marketplace"],
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
    title: "TheraSpace — Find a Therapist in Kenya",
    description: "A directory of therapists across Kenya, free to browse — contact a therapist directly.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TheraSpace therapist directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheraSpace — Find a Therapist in Kenya",
    description: "A directory of therapists across Kenya, free to browse — contact a therapist directly.",
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2B6E64" />
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
                price: "950",
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
      <body className={`${inter.variable} ${fraunces.variable} ${plexMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
