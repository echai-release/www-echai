import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: January 1, 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using EnterpriseChai's services, including our website, applications, and
                    AI-powered tools (collectively, the "Services"), you agree to be bound by these Terms of Service
                    ("Terms"). If you do not agree to these Terms, please do not use our Services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">2. Description of Services</h2>
                  <p>
                    EnterpriseChai provides AI-powered tools and platforms designed to enhance sales, customer success,
                    and revenue operations, including but not limited to:
                  </p>
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    <li>LoopX - AI sales workspace for lead research and qualification</li>
                    <li>Whispr - Real-time call assistant and copilot</li>
                    <li>Concierge - AI website assistant for lead capture and routing</li>
                    <li>Related documentation, support, and training materials</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">3. User Accounts and Registration</h2>
                  <p>
                    To access certain features of our Services, you may be required to create an account. You agree to:
                  </p>
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and update your account information</li>
                    <li>Keep your account credentials secure and confidential</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">4. Acceptable Use Policy</h2>
                  <p>
                    You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree
                    not to:
                  </p>
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    <li>Violate any applicable laws, regulations, or third-party rights</li>
                    <li>Use the Services for any fraudulent, abusive, or harmful activities</li>
                    <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Upload or transmit malicious code, viruses, or harmful content</li>
                    <li>Reverse engineer, decompile, or attempt to extract source code</li>
                    <li>Use the Services to compete with EnterpriseChai or develop competing products</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">5. Data and Privacy</h2>
                  <p>
                    Your privacy is important to us. Our collection, use, and protection of your personal information is
                    governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our
                    Services, you consent to the collection and use of your information as described in our Privacy
                    Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">6. Intellectual Property Rights</h2>
                  <p>
                    The Services and all content, features, and functionality are owned by EnterpriseChai and are
                    protected by copyright, trademark, and other intellectual property laws. You are granted a limited,
                    non-exclusive, non-transferable license to use the Services for your internal business purposes,
                    subject to these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">7. Payment Terms</h2>
                  <p>
                    If you purchase paid Services, you agree to pay all applicable fees as described in your
                    subscription or purchase agreement. Fees are non-refundable except as expressly stated in your
                    agreement or required by law. We reserve the right to modify our pricing with reasonable notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">8. Service Availability</h2>
                  <p>
                    While we strive to provide reliable Services, we do not guarantee that the Services will be
                    available at all times or free from interruptions. We may modify, suspend, or discontinue any aspect
                    of the Services at any time with reasonable notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">9. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, EnterpriseChai shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages, including but not limited to loss of
                    profits, data, or business opportunities, arising from your use of the Services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">10. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless EnterpriseChai and its affiliates, officers, directors,
                    employees, and agents from any claims, damages, losses, or expenses arising from your use of the
                    Services or violation of these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">11. Termination</h2>
                  <p>
                    Either party may terminate your access to the Services at any time, with or without cause. Upon
                    termination, your right to use the Services will cease immediately, and we may delete your account
                    and data in accordance with our data retention policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">12. Governing Law</h2>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of
                    California, without regard to its conflict of law principles. Any disputes arising under these Terms
                    shall be subject to the exclusive jurisdiction of the courts in California.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">13. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify you of material changes by
                    posting the updated Terms on our website or through other reasonable means. Your continued use of
                    the Services after such changes constitutes acceptance of the new Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black mb-4">14. Contact Information</h2>
                  <p>If you have any questions about these Terms, please contact us at:</p>
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <p>
                      <strong>EnterpriseChai</strong>
                    </p>
                    <p>Email: legal@enterprisechai.com</p>
                    <p>Website: www.enterprisechai.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
