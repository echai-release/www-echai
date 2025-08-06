import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, CheckCircle, FolderSyncIcon as Sync, Clock, TrendingUp, Target } from "lucide-react"

export default function LoopXPage() {
  // Generate current month for Calendly link
  const getCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const calendlyUrl = `https://calendly.com/pallavi-ose4/30min?month=${getCurrentMonth()}`

  const features = [
    {
      icon: Search,
      title: "Unified Search & Context",
      description:
        "Pull leads from Apollo, LinkedIn, and web sources — AI synthesizes everything into actionable insights",
      benefit: "No more 12-tab chaos",
    },
    {
      icon: CheckCircle,
      title: "Guided Qualification",
      description: "Organizes qualification to fit your sales process and account plan formats",
      benefit: "AI flags gaps, helps you improve data quality & coverage",
    },
    {
      icon: Sync,
      title: "Strategic Notes & Org Mapping",
      description: "Structured insights and stakeholder clarity — built for team handoff, sharing and deal momentum.",
      benefit: "No after-call scramble",
    },
  ]

  const metrics = [
    {
      icon: Clock,
      percentage: "50%",
      metric: "Less Time on Research & Prep",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      percentage: "+30%",
      metric: "Increase in Qualified Pipeline",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Target,
      percentage: "+22%",
      metric: "Improvement in Forecast Accuracy",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Badge className="bg-purple-50 text-purple-700 text-sm px-3 py-1 font-medium border border-purple-200">
                  Pilot
                </Badge>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-8">
                <span className="text-purple-600">LoopX</span> AI Sales Workspace
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
                Research leads, qualify accounts, and follow sales process — all in one guided workspace.
              </p>
              <p className="text-lg text-gray-500 mb-10 font-light">
                Built for Account Executives & SDRs who want to move faster and qualify deeper.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-full"
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
                  className="px-8 py-4 text-lg font-medium bg-transparent rounded-full border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Book a Demo
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/loopx-hero.png"
                alt="LoopX AI sales workspace showing profit growth, efficient analysis, and sales success metrics"
                className="max-w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Everything You Need in One Workspace</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              LoopX combines research tools, your playbook, and AI assistance in one intuitive flow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-medium text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4 font-light leading-relaxed">{feature.description}</p>
                <p className="text-sm text-purple-600 font-medium">→ {feature.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Proven Results</h2>
            <p className="text-xl text-gray-600 font-light">
              Sales teams using LoopX don't just move faster — they move smarter.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-sm text-center">
                <div
                  className={`w-16 h-16 ${metric.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                <div className={`text-5xl lg:text-6xl font-light ${metric.color} mb-4`}>{metric.percentage}</div>
                <h3 className="text-lg font-medium text-black">{metric.metric}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-normal text-white mb-8">Ready to Transform Your Sales Process?</h2>
          <p className="text-xl text-gray-300 mb-10 font-light">
            Join hundreds of sales reps who've already made the switch to smarter selling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full"
              asChild
            >
              <a href="https://loopx.enterprisechai.net" target="_blank" rel="noopener noreferrer">
                Start Free Trial
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
                Schedule Demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
