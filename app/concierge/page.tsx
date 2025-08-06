import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MessageCircle, Shield, BarChart3, Zap, Settings, CheckCircle } from "lucide-react"

export default function ConciergePage() {
  const differentiators = [
    {
      icon: MessageCircle,
      title: "Context-Aware Conversations",
      description:
        "Powered by our proprietary ContextIQ™ engine — always accurate, always aligned with your latest content.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Secure, Guardrailed AI",
      description:
        "Built-in frameworks ensure safe, on-brand, and compliant responses — no hallucinations or rogue outputs.",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: BarChart3,
      title: "Actionable Intelligence",
      description: "Surface pain points, gaps, buying signals, and missed expectations with real visitor data.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ]

  const brandControls = ["Appearance & voice", "Guardrails & content sources", "Behavior by page or intent"]

  const deliverables = [
    {
      area: "24/7 AI Engagement",
      description: "Real-time answers across your content",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      icon: MessageCircle,
    },
    {
      area: "ContextIQ™ Report",
      description: "Content quality + coverage insights",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      icon: BarChart3,
    },
    {
      area: "Traffic & Intent Signals",
      description: "Know what your audience really wants",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      icon: Zap,
    },
    {
      area: "Action Recommendations",
      description: "Messaging & content priorities based on usage data",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      icon: Settings,
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
                <Badge className="bg-green-50 text-green-700 text-sm px-3 py-1 font-medium">Live & Deployed</Badge>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-8">
                <span className="text-purple-600">Concierge</span> – Your AI-Powered Engagement & Intelligence Assistant
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
                24/7 contextual conversations that engage visitors, qualify intent, and uncover what your market really
                wants — powered by ContextIQ™.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-full"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/concierge-hero.png"
                alt="AI Concierge interface showing customer engagement and insights dashboard"
                className="max-w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Concierge Different */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">
              More Than a Chatbot — A Smarter Engagement Layer
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <item.icon className={`h-8 w-8 ${item.iconColor}`} />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <h3 className="text-xl font-medium text-black">{item.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 font-light leading-relaxed text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Everything you need to engage visitors, capture insights, and optimize your GTM strategy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <item.icon className={`h-8 w-8 ${item.iconColor}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-black mb-3">{item.area}</h3>
                    <p className="text-gray-600 font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Easy to Deploy */}
      <section className="py-24 bg-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Easy to Deploy. Built for Your Brand.</h2>
            <h3 className="text-2xl font-medium text-gray-700 mb-8">No Engineering Headaches. Fully On-Brand.</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              Concierge is live on websites today — deployed with just a few lines of code. Customize its look, tone,
              and behavior to match your brand and audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="text-xl font-medium text-black mb-6">You Control:</h4>
              <div className="space-y-4">
                {brandControls.map((control, index) => (
                  <div key={index} className="flex items-center">
                    <Settings className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-700 font-light">{control}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-sm mb-6">
                <Zap className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  From startup to enterprise, Concierge fits your stack.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Already Deployed */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">See It Live</h2>
          <p className="text-xl text-gray-600 mb-12 font-light">
            Concierge is actively deployed and helping businesses understand their customers better.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Live Demo Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">Try It Yourself</h3>
              <p className="text-gray-600 font-light mb-6 leading-relaxed">
                Experience Concierge in action on our own website. Ask questions, explore features, and see the
                intelligence in real-time.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium">
                Chat with Our Concierge
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Customer Feedback Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-4xl text-blue-200 mb-3">"</div>
                <p className="text-lg text-gray-700 font-light leading-relaxed mb-4">
                  We didn't just get support automation — we got insights that changed how we write content.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Head of CX</p>
                    <p className="text-gray-500 text-xs">Beta Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 font-light">
              Join businesses already using Concierge to understand their customers better
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-purple-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">
            Let Your Website Start Listening — and Responding
          </h2>
          <p className="text-xl text-gray-600 mb-10 font-light">
            Concierge helps you convert, support, and learn — automatically.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-medium rounded-full"
            >
              Request a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
