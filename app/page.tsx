import { HeroSection } from "@/app/sections/hero"
import { TrustSection } from "@/app/sections/trust"
import { PhotoShowcaseSection } from "@/app/sections/photo-showcase"
import { TherapistMarketplaceSection } from "@/app/sections/therapist-marketplace"
import { FeaturesSection } from "@/app/sections/features"
import { AISection } from "@/app/sections/ai-section"
import { HowItWorksSection } from "@/app/sections/how-it-works"
import { MultiTenantSection } from "@/app/sections/multi-tenant"
import { BenefitsSection } from "@/app/sections/benefits"
import { PricingSection } from "@/app/sections/pricing"
import { FAQSection } from "@/app/sections/faq"
import { BlogSection } from "@/app/sections/blog"
import { CTASection } from "@/app/sections/cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <PhotoShowcaseSection />
      <TherapistMarketplaceSection />
      <FeaturesSection />
      <AISection />
      <HowItWorksSection />
      <MultiTenantSection />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </>
  )
}
