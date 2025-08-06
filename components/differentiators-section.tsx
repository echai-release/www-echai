import { Brain, FileText, Zap } from "lucide-react"

export default function DifferentiatorsSection() {
  const differentiators = [
    {
      icon: Brain,
      title: "Process-aware AI",
      description: "Built around MEDDICC/BANT and your sales methodology",
    },
    {
      icon: FileText,
      title: "Strategic output",
      description: "Notes, account plans, stakeholder clarity — not just data",
    },
    {
      icon: Zap,
      title: "Instant value",
      description: "No CRM integrations needed to get started",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Why LoopX is Different</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                <item.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">{item.title}</h3>
              <p className="text-gray-700 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
