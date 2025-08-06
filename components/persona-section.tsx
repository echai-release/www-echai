import { Users, Target, TrendingUp, BarChart3 } from "lucide-react"

export default function PersonaSection() {
  const personas = [
    {
      icon: Users,
      title: "Sales Reps",
      description: "Research leads faster",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      icon: Target,
      title: "AEs",
      description: "Stick to process",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      icon: TrendingUp,
      title: "RevOps",
      description: "Improve pipeline hygiene",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      icon: BarChart3,
      title: "Sales Managers",
      description: "Coach smarter, forecast better",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 font-light">Built for every role in your revenue team</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => (
            <div
              key={index}
              className={`${persona.bgColor} ${persona.borderColor} p-6 rounded-2xl border text-center hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <persona.icon className={`h-6 w-6 ${persona.color}`} />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">{persona.title}</h3>
              <p className="text-gray-700 font-light">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
