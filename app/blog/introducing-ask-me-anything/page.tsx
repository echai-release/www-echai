import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"
import Link from "next/link"

export default function AskMeAnythingPost() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Article Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-normal text-black mb-6 leading-tight">
              Introducing "Ask Me Anything" – AI Assistance for Internal and External Use
            </h1>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              Discover how EnterpriseChai's AI assistant, 'Ask Me Anything', enhances internal and external customer
              interactions with instant, contextual answers.
            </p>

            <div className="flex items-center justify-center text-gray-600">
              <span className="font-medium">Pallavi Nayak</span>
              <Calendar className="h-4 w-4 mx-3" />
              <span>February 15, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-6 text-gray-700 font-light leading-relaxed">
                <p className="text-lg">
                  In today's fast-paced business environment, having instant access to accurate information can make the
                  difference between closing a deal and losing a customer. That's why we're excited to introduce "Ask Me
                  Anything" – EnterpriseChai's revolutionary AI assistant designed to transform how teams access and
                  utilize information.
                </p>

                <h2 className="text-2xl font-medium text-black mt-8 mb-4">The Challenge: Information Silos</h2>

                <p>
                  Customer Success and Sales teams often struggle with information scattered across multiple platforms –
                  CRM systems, knowledge bases, product documentation, and internal wikis. When a customer asks a
                  complex question during a call, representatives frequently find themselves saying, "Let me get back to
                  you on that," leading to delayed responses and frustrated customers.
                </p>

                <h2 className="text-2xl font-medium text-black mt-8 mb-4">The Solution: Contextual AI Assistance</h2>

                <p>
                  "Ask Me Anything" bridges this gap by providing instant, contextual answers drawn from your entire
                  knowledge ecosystem. Whether you're in a customer call, preparing for a meeting, or responding to an
                  internal query, our AI assistant delivers accurate information in seconds.
                </p>

                <h3 className="text-xl font-medium text-black mt-6 mb-3">Key Features:</h3>

                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>
                      <strong>Real-time Integration:</strong> Connects with your CRM, knowledge base, and internal
                      systems
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>
                      <strong>Contextual Understanding:</strong> Considers customer history, product usage, and current
                      conversation context
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>
                      <strong>Multi-modal Responses:</strong> Provides text, links, documents, and visual aids as needed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>
                      <strong>Learning Capability:</strong> Improves responses based on feedback and usage patterns
                    </span>
                  </li>
                </ul>

                <h2 className="text-2xl font-medium text-black mt-8 mb-4">Real-World Impact</h2>

                <p>
                  Early adopters have reported a 60% reduction in response time to customer queries and a 40% increase
                  in first-call resolution rates. More importantly, customer satisfaction scores have improved
                  significantly as representatives can provide immediate, accurate answers.
                </p>

                <blockquote className="border-l-4 border-purple-600 pl-6 italic text-lg text-gray-800 my-8">
                  "Ask Me Anything has transformed how our team handles customer calls. We're no longer scrambling for
                  information – it's right there when we need it."
                  <footer className="text-sm text-gray-600 mt-2">— Sarah Chen, Customer Success Manager</footer>
                </blockquote>

                <h2 className="text-2xl font-medium text-black mt-8 mb-4">Getting Started</h2>

                <p>
                  "Ask Me Anything" is now available as part of our EnterpriseChai platform. The setup process is
                  straightforward – our team will work with you to integrate your existing knowledge sources and
                  customize the AI to understand your specific business context.
                </p>

                <p>
                  Ready to eliminate information silos and empower your team with instant, intelligent assistance?
                  Contact us today to schedule a demo and see "Ask Me Anything" in action.
                </p>
              </div>
            </div>

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Share this article:</span>
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Link href="/blog" className="text-purple-600 hover:text-purple-700 font-medium">
                  ← Back to all posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
