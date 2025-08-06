import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, HelpCircle } from "lucide-react"

export default function DocsPage() {
  const faqItems = [
    {
      question: "Which browsers are currently supported?",
      answer: "EnterpriseChai supports all modern browsers including Chrome, Firefox, Safari, and Edge.",
    },
    {
      question: "How do I integrate the AI assistant into my website?",
      answer: "Integration is simple with our JavaScript SDK. Follow our setup guide for step-by-step instructions.",
    },
    {
      question: "What data security measures are in place?",
      answer: "We implement enterprise-grade security with end-to-end encryption and SOC 2 compliance.",
    },
    {
      question: "Can I customize the AI responses?",
      answer: "Yes, you can train the AI with your specific knowledge base and customize response patterns.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="text-purple-600 font-medium">Documentation</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-normal text-black mb-8">Documentation</h1>
            <p className="text-xl text-gray-600 font-light">
              Real-Time Conversational Intelligence for Exceptional Customer Experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Beta Setup Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-medium text-black">
                Preparing for Beta Success: Essential Information and Setup Requirements
              </h2>
            </div>

            <p className="text-gray-700 mb-6 font-light leading-relaxed">
              Joining our beta program? Here's a quick checklist to ensure you're ready to hit the ground running. From
              setup requirements to necessary information, we'll guide you through each step to make your beta
              experience seamless and impactful.
            </p>

            <Button variant="outline" className="bg-black text-white hover:bg-gray-800 rounded-full border-black">
              Read more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="text-purple-600 font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-normal text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 font-light">
              Real-Time Conversational Intelligence for Exceptional Customer Experiences
            </p>
          </div>

          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-medium text-black mb-6 flex items-center">
                <span className="text-2xl mr-3">1.</span>
                Product Overview
              </h3>
            </div>

            {faqItems.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-medium">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-black mb-3">{item.question}</h4>
                    <p className="text-gray-700 font-light leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-black mb-4">Need More Help?</h3>
              <p className="text-gray-700 mb-6 font-light">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6" asChild>
                <a href="mailto:support@enterprisechai.com">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
