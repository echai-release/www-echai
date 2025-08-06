"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Headphones,
  Brain,
  AlertTriangle,
  X,
  User,
  Mail,
  Building,
  Phone,
  MessageSquare,
} from "lucide-react"

export default function WhisprPage() {
  const [showBetaModal, setShowBetaModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    teamSize: "",
    currentTools: "",
    useCase: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const features = [
    {
      icon: Headphones,
      title: "Silent Listening",
      description: "Listens to your calls without interrupting the natural flow of conversation",
      benefit: "Stay focused on your prospect, not your notes",
    },
    {
      icon: Brain,
      title: "Real-Time Intelligence",
      description: "Surfaces relevant answers, objection responses, and next steps during the call",
      benefit: "Never miss an opportunity or stumble on answers",
    },
    {
      icon: AlertTriangle,
      title: "Risk Detection",
      description: "Flags potential deal risks and competitive threats as they emerge",
      benefit: "Address concerns before they become deal-breakers",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setShowBetaModal(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        phone: "",
        teamSize: "",
        currentTools: "",
        useCase: "",
        timeline: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Badge className="bg-blue-50 text-blue-700 text-sm px-3 py-1 font-medium">Beta</Badge>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-8">
                <span className="text-purple-600">Whispr</span> Real-Time Call Copilot
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
                Real-time call assistant that listens silently, surfaces answers, and flags next steps live — without
                distracting the flow.
              </p>
              <p className="text-lg text-gray-500 mb-10 font-light">
                Built for Account Executives & CSMs who need to stay sharp on every call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-full"
                  onClick={() => setShowBetaModal(true)}
                >
                  Join Beta Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-medium bg-transparent rounded-full border-gray-300 hover:bg-gray-50"
                >
                  See Demo
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/whispr-hero.png"
                alt="Whispr silent call assistant with meeting platforms like Zoom, Google Meet, and summarization tools"
                className="max-w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Your Silent Sales Partner</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Whispr works in the background, giving you superpowers without changing how you sell.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4 font-light leading-relaxed">{feature.description}</p>
                <p className="text-sm text-blue-600 font-medium">→ {feature.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Program */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">Join the Beta Program</h2>
          <p className="text-xl text-gray-600 mb-8 font-light">
            We're working with select Account Executives and Customer Success Managers to perfect Whispr before general
            availability.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-medium text-black mb-4">What Beta Users Get:</h3>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="font-light">Early access to Whispr features</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="font-light">Direct input on product development</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="font-light">Preferred pricing when we launch</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="font-light">Dedicated support from our team</span>
              </li>
            </ul>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-medium rounded-full"
              onClick={() => setShowBetaModal(true)}
            >
              Apply for Beta Access
            </Button>
          </div>
        </div>
      </section>

      {/* Beta Application Modal */}
      {showBetaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-black">Join Whispr Beta Program</h3>
              <button
                onClick={() => setShowBetaModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="Account Executive">Account Executive</option>
                      <option value="Customer Success Manager">Customer Success Manager</option>
                      <option value="Sales Development Rep">Sales Development Rep</option>
                      <option value="Sales Manager">Sales Manager</option>
                      <option value="VP of Sales">VP of Sales</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size
                    </label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 people</option>
                      <option value="6-20">6-20 people</option>
                      <option value="21-50">21-50 people</option>
                      <option value="51-100">51-100 people</option>
                      <option value="100+">100+ people</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="currentTools" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Sales Tools
                  </label>
                  <input
                    type="text"
                    id="currentTools"
                    name="currentTools"
                    value={formData.currentTools}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Salesforce, HubSpot, Gong, etc."
                  />
                </div>

                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Use Case *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="useCase"
                      name="useCase"
                      required
                      rows={3}
                      value={formData.useCase}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="How do you plan to use Whispr? What challenges are you hoping to solve?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Implementation Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Within 6 months">Within 6 months</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-lg border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowBetaModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Apply for Beta Access"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your interest in Whispr. We'll review your application and get back to you within 2-3
                  business days.
                </p>
                <p className="text-sm text-gray-500">This window will close automatically in a few seconds.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
