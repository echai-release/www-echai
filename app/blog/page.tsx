import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const blogPosts = [
    {
      date: "February 15, 2025",
      title: 'Introducing "Ask Me Anything" – AI Assistance for Internal and External Use',
      description:
        "Discover how EnterpriseChai's AI assistant, 'Ask Me Anything', enhances internal and external customer interactions with instant, contextual answers.",
      slug: "introducing-ask-me-anything",
      author: "Pallavi Nayak",
    },
    {
      date: "December 18, 2024",
      title: "Enhancing Conversational AI with Visual Information: A Deep Dive into Image Integration Strategies",
      description:
        "Explore advanced techniques for integrating visual information into conversational AI systems, including image recognition, visual context understanding, and multi-modal AI applications.",
      slug: "enhancing-conversational-ai-with-visual-information",
      author: "Michael Rodriguez",
    },
    {
      date: "December 5, 2024",
      title: "Conversational AI: Navigating Images in Documents",
      description:
        "Learn how modern AI systems can understand and process images within documents, enabling more comprehensive document analysis and intelligent content extraction.",
      slug: "conversational-ai-navigating-images-in-documents",
      author: "Sarah Chen",
    },
    {
      date: "November 12, 2024",
      title: "Advanced Prompt Engineering Strategies for AI Workflow Optimization",
      description:
        "Explore advanced prompt engineering techniques for AI assistants. Discover role prompting, chain prompting, and cutting-edge applications like RAG to optimize your AI workflow and communication.",
      slug: "advanced-prompt-engineering-strategies",
      author: "Michael Rodriguez",
    },
    {
      date: "October 30, 2024",
      title: "Prompt Engineering Fundamentals for Conversational AI",
      description:
        "Master the art of prompt engineering for conversational AI and AI assistants. Learn techniques to enhance your AI workflow, including RAG, and optimize communication with chatbots and virtual assistants.",
      slug: "prompt-engineering-fundamentals",
      author: "Ziba Arak",
    },
    {
      date: "October 2, 2024",
      title: "The Evolution of AI: From CoPilots to Autonomous Agents",
      description:
        "Explore the journey of AI from assisting humans to autonomous decision-making, and how EnterpriseChai is leading this transition in the customer success space.",
      slug: "evolution-of-ai-copilots-to-autonomous-agents",
      author: "Sarah Chen",
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
              <span className="text-purple-600 font-medium">Blog</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-normal text-black mb-8">Our Latest Blog Posts</h1>
            <p className="text-xl text-gray-600 font-light">AI Copilots for Every Stage of Your Revenue Journey.</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                  <time className="text-purple-600 font-medium text-sm">{post.date}</time>
                </div>

                <h2 className="text-xl font-medium text-black mb-4 leading-tight">{post.title}</h2>

                <p className="text-gray-700 mb-6 font-light leading-relaxed">{post.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-light">By {post.author}</span>
                  <Button
                    variant="outline"
                    className="bg-black text-white hover:bg-gray-800 rounded-full border-black"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
