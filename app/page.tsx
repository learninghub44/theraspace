import { HeroSection } from "@/app/sections/hero"
import { CategoriesSection } from "@/app/sections/categories"
import { TherapistMarketplaceSection } from "@/app/sections/therapist-marketplace"
import { HowItWorksSection } from "@/app/sections/how-it-works"
import { FAQSection } from "@/app/sections/faq"
import { CTASection } from "@/app/sections/cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TherapistMarketplaceSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
