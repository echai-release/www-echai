import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export default function HeroSection() {
  // Generate current month for Calendly link
  const getCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const calendlyUrl = `https://calendly.com/pallavi-ose4/30min?month=${getCurrentMonth()}`

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-purple-25 py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-8 leading-tight">
            Turn Research into Revenue with{" "}
            <span className="text-purple-600 relative">
              LoopX
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed font-light">
            The AI sales workspace that helps you qualify leads faster, work smarter, and stay in control — from first
            click to closed-won.
          </p>

          <p className="text-lg text-gray-600 mb-12 font-light">
            Powered by <span className="font-medium text-black">EnterpriseChai</span> — building AI copilots for every
            step of your revenue journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <a href="https://loopx.enterprisechai.net" target="_blank" rel="noopener noreferrer">
                Try LoopX Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-4 text-lg font-medium border-gray-300 hover:bg-gray-50 bg-white shadow-sm"
              asChild
            >
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 h-5 w-5" />
                Book a Demo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
