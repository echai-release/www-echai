import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Rocket, Heart, Mail } from "lucide-react"

export default function CareersPage() {
  const perks = [
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Join us at the forefront of AI innovation and grow your career with cutting-edge technology.",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with a passionate team that values collaboration, creativity, and continuous learning.",
    },
    {
      icon: Heart,
      title: "Mission-Driven Work",
      description: "Make a real impact by helping Customer Success teams thrive with AI-powered solutions.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-25 py-24 lg:py-32 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-8 leading-tight">
            Join Our <span className="text-purple-600">Mission</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed font-light">
            We're building the future of AI-powered Customer Success. Be part of something extraordinary.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-medium text-black mb-4">We're Growing!</h2>
            <p className="text-gray-700 font-light leading-relaxed">
              EnterpriseChai is expanding rapidly, and we'll be looking for exceptional talent to join our team soon.
              Stay tuned for exciting opportunities to shape the future of AI in Customer Success.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Why EnterpriseChai?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Join a team that's passionate about transforming how businesses approach Customer Success through AI
              innovation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <perk.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-black mb-4">{perk.title}</h3>
                <p className="text-gray-700 font-light leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Roles Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Future Opportunities</h2>
            <p className="text-xl text-gray-700 font-light">
              As we continue to grow, we anticipate openings in these key areas:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-medium text-black mb-2">Engineering</h3>
              <p className="text-gray-600 font-light">Full-stack developers, AI/ML engineers, DevOps specialists</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-medium text-black mb-2">Product</h3>
              <p className="text-gray-600 font-light">Product managers, UX/UI designers, product analysts</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-medium text-black mb-2">Sales & Marketing</h3>
              <p className="text-gray-600 font-light">Sales executives, marketing specialists, customer success</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-medium text-black mb-2">Operations</h3>
              <p className="text-gray-600 font-light">Business operations, finance, people operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-normal text-white mb-8">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            Don't see the perfect role yet? We'd love to hear from exceptional talent who shares our vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <a href="mailto:careers@enterprisechai.com">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium bg-transparent rounded-full"
              asChild
            >
              <a href="https://www.linkedin.com/company/enterprisechai" target="_blank" rel="noopener noreferrer">
                Follow Our Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <p className="text-gray-400 mt-8 font-light">
            We're an equal opportunity employer committed to diversity and inclusion.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
