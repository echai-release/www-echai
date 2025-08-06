import { CheckCircle, Users, Beaker } from "lucide-react"

export default function TractionSection() {
  const tractionItems = [
    {
      icon: CheckCircle,
      text: "Deployed by Empress Natural",
      status: "live",
    },
    {
      icon: Beaker,
      text: "Selected for CPG pilot (Whispr)",
      status: "pilot",
    },
    {
      icon: Users,
      text: "LoopX in pilot with 5 GTM teams",
      status: "pilot",
    },
  ]

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Trusted by Forward-Thinking Teams</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tractionItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-lg text-gray-800 font-light">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center border border-purple-100">
                <span className="text-purple-600 text-lg">"</span>
              </div>
            </div>
            <blockquote className="text-xl text-gray-800 italic font-light mb-4">
              "LoopX helped us move faster and stay aligned — even with new reps."
            </blockquote>
            <cite className="text-gray-600 font-medium">— Sales Manager, Design Partner</cite>
          </div>
        </div>
      </div>
    </section>
  )
}
