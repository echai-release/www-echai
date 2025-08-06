import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProblemSection from "@/components/problem-section"
import SolutionSection from "@/components/solution-section"
import ROISection from "@/components/roi-section"
import PlatformPreview from "@/components/platform-preview"
import TestimonialsSection from "@/components/testimonials-section"
import WhyEnterpriseChai from "@/components/why-enterprisechai"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ROISection />
      <PlatformPreview />
      <TestimonialsSection />
      <WhyEnterpriseChai />
      <FinalCTA />
      <Footer />
    </div>
  )
}
