import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export default function FinalCTA() {
  // Generate current month for Calendly link
  const getCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const calendlyUrl = `https://calendly.com/pallavi-ose4/30min?month=${getCurrentMonth()}`

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-8">
          Ready to stop wasting time on bad-fit leads?
        </h2>
        <p className="text-xl text-gray-300 mb-12 font-light">
          LoopX gives your team the AI edge where it matters — early in the funnel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
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
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium bg-transparent rounded-full"
            asChild
          >
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-5 w-5" />
              Talk to Sales
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
