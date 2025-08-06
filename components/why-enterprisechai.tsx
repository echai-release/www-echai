import { Users, Zap, TrendingUp, Chrome } from "lucide-react"

export default function WhyEnterpriseChai() {
  const reasons = [
    {
      icon: Users,
      title: "Built by operators who've been in the seat",
      description: "Not just another AI tool",
    },
    {
      icon: Zap,
      title: "Fast to deploy",
      description: "No need to change your process",
    },
    {
      icon: TrendingUp,
      title: "Expands with you",
      description: "LoopX today, full GTM AI tomorrow",
    },
    {
      icon: Chrome,
      title: "Chrome plugin and native integrations",
      description: "Works where you work",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Why EnterpriseChai</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200">
                <reason.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-black mb-3">{reason.title}</h3>
              <p className="text-gray-700 font-light">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
