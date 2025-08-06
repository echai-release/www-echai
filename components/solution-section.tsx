export default function SolutionSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Your AI Workspace for Sales Research & Qualification
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LoopX combines research tools, your playbook, and AI assistance in one intuitive flow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Unified Search & Context</h3>
            <p className="text-gray-600 mb-4">
              Pull leads from Apollo, LinkedIn, and web sources — AI synthesizes everything into actionable insights
            </p>
            <p className="text-sm text-purple-600 font-medium">→ No more 12-tab chaos</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Guided Qualification</h3>
            <p className="text-gray-600 mb-4">
              Organizes qualification to fit your sales process and account plan formats
            </p>
            <p className="text-sm text-purple-600 font-medium">
              → AI flags gaps, helps you improve data quality & coverage
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14,2 14,8 20,8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Notes & Org Mapping</h3>
            <p className="text-gray-600 mb-4">
              Structured insights and stakeholder clarity — built for team handoff, sharing and deal momentum.
            </p>
            <p className="text-sm text-purple-600 font-medium">→ No after-call scramble</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://loopx.enterprisechai.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
          >
            Try LoopX
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
