import { HeroSection } from "@/app/sections/hero"
import { TrustSection } from "@/app/sections/trust"
import { CategoriesSection } from "@/app/sections/categories"
import { PhotoShowcaseSection } from "@/app/sections/photo-showcase"
import { TherapistMarketplaceSection } from "@/app/sections/therapist-marketplace"
import { HowItWorksSection } from "@/app/sections/how-it-works"
import { BenefitsSection } from "@/app/sections/benefits"
import { ServicesSection } from "@/app/sections/services"
import { FeaturesSection } from "@/app/sections/features"
import { AISection } from "@/app/sections/ai-section"
import { MultiTenantSection } from "@/app/sections/multi-tenant"
import { PricingSection } from "@/app/sections/pricing"
import { ResourcesSection } from "@/app/sections/resources"
import { FAQSection } from "@/app/sections/faq"
import { BlogSection } from "@/app/sections/blog"
import { CTASection } from "@/app/sections/cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <CategoriesSection />
      <PhotoShowcaseSection />
      <TherapistMarketplaceSection />
      <HowItWorksSection />
      <BenefitsSection />
      <ServicesSection />
      <FeaturesSection />
      <AISection />
      <MultiTenantSection />
      <PricingSection />
      <ResourcesSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </>
  )
}
