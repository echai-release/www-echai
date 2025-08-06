import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Privacy Policy</h1>
            <p className="text-lg text-purple-600">Updated: May 28, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">1. Introduction and Acceptance of Terms</h2>
                <p>
                  This Privacy Policy describes how EnterpriseChai ("we," "our," or "us") collects, uses, and protects
                  your personal information when you use our conversational AI platform and related services. By
                  accessing and using EnterpriseChai, you agree to the collection and use of information in accordance
                  with this policy.
                </p>

                <p className="mt-4">
                  <strong>Acceptance of Terms:</strong> By accessing and using EnterpriseChai, you agree to comply with
                  and be bound by these Terms of Use. If you do not agree, please do not use our services.
                  EnterpriseChai offers software as a service (SaaS). We reserve the right to modify or discontinue
                  services at any time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-black mb-3">2.1 Information You Provide</h3>
                <p>We collect information you directly provide to us, including:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Account registration information (name, email, company details)</li>
                  <li>Profile information and preferences</li>
                  <li>Content you upload or input into our Services</li>
                  <li>Communications with our support team</li>
                  <li>Feedback, surveys, and other voluntary submissions</li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.2 Information Collected Automatically</h3>
                <p>When you use our Services, we automatically collect:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Usage data and analytics (pages visited, features used, time spent)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Log files and technical data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.3 Information from Third Parties</h3>
                <p>We may receive information from third-party services you connect to our platform, such as:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>CRM systems (Salesforce, HubSpot, etc.)</li>
                  <li>Communication platforms (Zoom, Google Meet, etc.)</li>
                  <li>Social media platforms (LinkedIn, etc.)</li>
                  <li>Data enrichment services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">3. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Personalize your experience and provide relevant content</li>
                  <li>Communicate with you about our Services, updates, and support</li>
                  <li>Analyze usage patterns and optimize performance</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                  <li>Comply with legal obligations and enforce our Terms of Service</li>
                  <li>Conduct research and development to improve our AI capabilities</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">4. Information Sharing and Disclosure</h2>
                <p>
                  We do not sell your personal information. We may share your information in the following
                  circumstances:
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-4">4.1 Service Providers</h3>
                <p>
                  We may share information with trusted third-party service providers who assist us in operating our
                  Services, such as cloud hosting, analytics, and customer support providers.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-4">4.2 Business Transfers</h3>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part
                  of the transaction.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-4">4.3 Legal Requirements</h3>
                <p>
                  We may disclose information when required by law, court order, or to protect our rights, property, or
                  safety, or that of others.
                </p>

                <h3 className="text-xl font-semibold text-black mb-3 mt-4">4.4 With Your Consent</h3>
                <p>We may share information with your explicit consent or at your direction.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your information
                  against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response procedures</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">6. Data Retention</h2>
                <p>
                  We retain your information for as long as necessary to provide our Services, comply with legal
                  obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we
                  will securely delete or anonymize it.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">7. Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>
                    <strong>Access:</strong> Request access to your personal information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your information in a portable format
                  </li>
                  <li>
                    <strong>Restriction:</strong> Request restriction of processing
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain types of processing
                  </li>
                  <li>
                    <strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent
                  </li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@enterprisechai.com. We will respond to your
                  request within the timeframe required by applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">8. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage, and
                  provide personalized content. You can manage your cookie preferences through your browser settings or
                  our cookie preference center.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">9. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of
                  residence. We ensure appropriate safeguards are in place to protect your information in accordance
                  with applicable data protection laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">10. Children's Privacy</h2>
                <p>
                  Our Services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected such information, we
                  will take steps to delete it promptly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of material changes by posting
                  the updated policy on our website or through other reasonable means. Your continued use of our
                  Services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">12. Contact Us</h2>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                  please contact us:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p>
                    <strong>EnterpriseChai</strong>
                  </p>
                  <p>Email: privacy@enterprisechai.com</p>
                  <p>Website: www.enterprisechai.com</p>
                  <p>For data protection inquiries: dpo@enterprisechai.com</p>
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
