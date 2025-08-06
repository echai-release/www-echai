import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Lightbulb, Award } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Pallavi Gadepalli",
      role: "CEO & Founder",
      image: "/images/pallavi-gadepalli.png",
      bio: "Former McKinsey consultant with deep expertise in AI strategy and enterprise transformation. Pallavi leads EnterpriseChai's vision to democratize AI for business teams.",
    },
    {
      name: "Pari Ambatkar",
      role: "Co-Founder & CTO",
      image: "/images/pari-ambatkar.png",
      bio: "AI engineering leader with 15+ years building scalable systems. Pari architected EnterpriseChai's core AI infrastructure and ContextIQ™ technology.",
    },
  ]

  const values = [
    {
      icon: Users,
      title: "Human-Centric AI",
      description:
        "We believe AI should augment human capabilities, not replace them. Our solutions are designed to make teams more effective and strategic.",
    },
    {
      icon: Target,
      title: "Enterprise-Ready",
      description:
        "Built for the complexity of real business environments with security, compliance, and scalability at the core.",
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description:
        "We're constantly pushing the boundaries of what's possible with AI, staying ahead of the curve for our customers.",
    },
    {
      icon: Award,
      title: "Customer Success",
      description:
        "Your success is our success. We're committed to delivering measurable value and exceptional support.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-8">
              About <span className="text-purple-600">EnterpriseChai</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed font-light max-w-4xl mx-auto">
              We're building the future of AI-powered business intelligence, making advanced AI accessible and
              actionable for every team.
            </p>
            <p className="text-lg text-gray-500 mb-10 font-light max-w-3xl mx-auto">
              Founded by AI experts with deep enterprise experience, EnterpriseChai transforms how businesses understand
              their customers, optimize their operations, and accelerate growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-6 font-light leading-relaxed">
                To democratize AI-powered business intelligence, making it accessible, actionable, and transformative
                for organizations of all sizes.
              </p>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                We believe every business should have access to the same level of AI-powered insights that drive success
                at the world's most innovative companies. That's why we've built a platform that brings enterprise-grade
                AI capabilities to teams everywhere.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-medium text-black mb-6">What We Do</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 mt-2"></div>
                  <span className="text-gray-600 font-light">
                    Transform customer conversations into actionable business intelligence
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 mt-2"></div>
                  <span className="text-gray-600 font-light">
                    Provide 24/7 AI-powered customer engagement and support
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 mt-2"></div>
                  <span className="text-gray-600 font-light">
                    Deliver real-time insights that drive GTM strategy and growth
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 mt-2"></div>
                  <span className="text-gray-600 font-light">
                    Enable data-driven decision making across all business functions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              The principles that guide everything we build and every relationship we nurture.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-black mb-4">{value.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Led by experienced AI and business strategy experts who understand the challenges of scaling AI in
              enterprise environments.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-6">
                  <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-medium text-black mb-2">{member.name}</h3>
                  <p className="text-lg text-purple-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 font-light leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-purple-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-10 font-light">
            Join forward-thinking companies who are already using EnterpriseChai to unlock the power of AI-driven
            insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-full"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-transparent rounded-full border-gray-300 hover:bg-gray-50"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
