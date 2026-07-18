import { HeroSection } from "@/app/sections/hero"
import { AboutSection } from "@/app/sections/about-section"
import { ServicesSection } from "@/app/sections/services-editorial"
import { CategoriesSection } from "@/app/sections/categories"
import { TherapistMarketplaceSection } from "@/app/sections/therapist-marketplace"
import { BenefitsSection } from "@/app/sections/benefits"
import { HowItWorksSection } from "@/app/sections/how-it-works"
import { FAQSection } from "@/app/sections/faq"
import { CTASection } from "@/app/sections/cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CategoriesSection />
      <TherapistMarketplaceSection />
      <BenefitsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
