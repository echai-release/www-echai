"use client"

import { useState } from "react"
import Link from "next/link"
import { Linkedin, Twitter, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [showCookieModal, setShowCookieModal] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(true)

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "LoopX", href: "/loopx" },
        { name: "Whispr", href: "/whispr" },
        { name: "Concierge", href: "/concierge" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help", href: "/help" },
        { name: "Docs", href: "/docs" },
        { name: "Contact", href: "/contact" },
        { name: "Terms", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Preferences", href: "#", onClick: () => setShowCookieModal(true) },
      ],
    },
  ]

  const handleDeclineAll = () => {
    setAnalyticsEnabled(false)
    setMarketingEnabled(false)
    setShowCookieModal(false)
  }

  const handleAcceptAll = () => {
    setAnalyticsEnabled(true)
    setMarketingEnabled(true)
    setShowCookieModal(false)
  }

  const handleSavePreferences = () => {
    setShowCookieModal(false)
  }

  return (
    <div>
      <footer className="bg-gray-50 text-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/images/logo-black.png" alt="EnterpriseChai" className="h-8 w-auto" />
              </div>
              <p className="text-gray-600 mb-6 font-light">
                Building AI copilots for every step of your revenue journey.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Footer sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-4 text-gray-900">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="text-gray-600 hover:text-gray-900 font-light text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900 font-light"
                          {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p className="font-light">&copy; 2025 EnterpriseChai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Preferences Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-black">Cookie Preferences</h3>
              <button onClick={() => setShowCookieModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              We use different types of cookies to optimize your experience on our website. Choose which cookies you
              allow us to use.
            </p>

            <div className="space-y-4 mb-8">
              {/* Essential Cookies */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                  <label className="relative inline-flex items-center cursor-not-allowed">
                    <input type="checkbox" className="sr-only peer" checked disabled />
                    <div className="w-11 h-6 bg-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all opacity-50"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  These cookies are necessary for the website to function and cannot be disabled.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    />
                    <div
                      className={`w-11 h-6 ${analyticsEnabled ? "bg-purple-600" : "bg-gray-200"} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    ></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Used for:</strong> Google Analytics, page views, user behavior analysis
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={marketingEnabled}
                      onChange={(e) => setMarketingEnabled(e.target.checked)}
                    />
                    <div
                      className={`w-11 h-6 ${marketingEnabled ? "bg-purple-600" : "bg-gray-200"} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    ></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Used to deliver personalized content and advertisements relevant to you.
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Used for:</strong> Chatbot personalization, targeted content, advertising
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                onClick={handleDeclineAll}
              >
                Decline All
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
