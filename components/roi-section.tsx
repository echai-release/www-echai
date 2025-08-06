export default function ROISection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            LoopX Drives Pipeline Quality, Rep Performance, and Forecast Accuracy
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Sales teams using LoopX don't just move faster — they move smarter, qualify deeper, and close with more
            confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-200 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-200">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-light text-blue-600 mb-4">50%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Less Time on Research & Prep</h3>
            <p className="text-gray-600">
              Reps get all the key intel — from LinkedIn to CRM — in one guided workspace, slashing time spent prepping
              for outreach.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-green-200 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 border border-green-200">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                <polyline points="17,6 23,6 23,12" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-light text-green-600 mb-4">+30%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Increase in Qualified Pipeline</h3>
            <p className="text-gray-600">
              LoopX helps reps stick to your qualification process (MEDDPICC, BANT, etc.) and fill gaps fast — boosting
              the number of sales-ready leads.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-200 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 border border-purple-200">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-light text-purple-600 mb-4">+22%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Improvement in Forecast Accuracy</h3>
            <p className="text-gray-600">
              By enforcing process rigor and surfacing red/yellow flags on deal readiness, LoopX gives sales managers
              more confidence in pipeline and forecast health.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center max-w-4xl mx-auto">
          <div className="text-4xl mb-4">💡</div>
          <p className="text-lg text-gray-700">
            Built with insights from elite GTM leaders, LoopX acts like a coach inside every deal — guiding reps and
            giving managers a clearer picture of what's real.
          </p>
        </div>
      </div>
    </section>
  )
}
