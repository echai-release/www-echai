import { AlertTriangle, ExternalLink, Database, Clock } from "lucide-react"

export default function ProblemSection() {
  const painPoints = [
    {
      icon: ExternalLink,
      text: "Reps juggle 6–10 tools just to prep for one call",
    },
    {
      icon: Database,
      text: "CRM data is missing or wrong → bad forecasts",
    },
    {
      icon: AlertTriangle,
      text: "Qualification is skipped under pressure",
    },
    {
      icon: Clock,
      text: "Managers can't see deal risk until it's too late",
    },
  ]

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">
            Sales research is broken. <span className="text-purple-600">LoopX fixes it.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200">
                  <point.icon className="h-6 w-6 text-gray-600" />
                </div>
                <p className="text-lg text-gray-800 pt-2 font-light">{point.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="bg-gray-50 p-3 rounded-lg font-light border border-gray-100">
                  Tab 1: Apollo - Lead Search
                </div>
                <div className="bg-gray-50 p-3 rounded-lg font-light border border-gray-100">
                  Tab 2: LinkedIn - Profile Research
                </div>
                <div className="bg-gray-50 p-3 rounded-lg font-light border border-gray-100">
                  Tab 3: Salesforce - CRM Update
                </div>
                <div className="bg-gray-50 p-3 rounded-lg font-light border border-gray-100">Tab 4: Notion - Notes</div>
                <div className="bg-gray-50 p-3 rounded-lg font-light border border-gray-100">
                  Tab 5: Google Docs - Qualification
                </div>
                <div className="text-center text-purple-600 font-medium mt-4">= Chaos & Wasted Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-lg">📊</span>
              </div>
            </div>
            <p className="text-lg text-gray-800 font-light">
              <span className="font-medium text-purple-600">"65% of rep time is not spent selling."</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">— Salesforce State of Sales Report</p>
          </div>
        </div>
      </div>
    </section>
  )
}
