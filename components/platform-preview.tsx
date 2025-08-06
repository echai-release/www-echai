import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Headphones, Bot } from "lucide-react"

export default function PlatformPreview() {
  // Generate current month for Calendly link
  const getCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const calendlyUrl = `https://calendly.com/pallavi-ose4/30min?month=${getCurrentMonth()}`

  const products = [
    {
      name: "LoopX",
      status: "Pilot",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Zap,
      persona: "For Account Executives & SDRs",
      description: "Research leads, qualify accounts, and follow sales process — all in one guided workspace.",
      cta: "Try LoopX",
      ctaVariant: "outline" as const,
      link: "https://loopx.enterprisechai.net",
    },
    {
      name: "Whispr",
      status: "Beta",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Headphones,
      persona: "For CSMs & Sales Executives/SDRs",
      description:
        "Real-time call assistant that listens silently, surfaces answers, and flags next steps live — without distracting the flow.",
      cta: "Join Beta",
      ctaVariant: "outline" as const,
      link: calendlyUrl,
    },
    {
      name: "Concierge",
      status: "Live",
      statusColor: "bg-green-50 text-green-700 border-green-200",
      icon: Bot,
      persona: "For Marketing & RevOps",
      description:
        "Website chatbot that captures, qualifies, and routes inbound leads with AI-powered precision — 24/7.",
      cta: "Get Demo",
      ctaVariant: "default" as const,
      link: calendlyUrl,
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Meet Your GTM Copilots</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-light">
            EnterpriseChai offers specialized AI copilots that support your revenue team at every stage of the customer
            journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200">
                    <product.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-normal text-black">{product.name}</h3>
                </div>
                <Badge className={`${product.statusColor} border`}>{product.status}</Badge>
              </div>

              <p className="text-lg font-medium text-purple-600 mb-4">{product.persona}</p>

              <p className="text-gray-700 mb-8 leading-relaxed font-light">{product.description}</p>

              <Button
                variant={product.ctaVariant}
                className={`w-full font-medium ${product.ctaVariant === "default" ? "bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200" : "rounded-full border-gray-300 hover:bg-white bg-white shadow-sm border"}`}
                size="lg"
                asChild
              >
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  {product.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
