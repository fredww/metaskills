import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8DA399]/10 via-[#D4AF37]/10 to-[#C7826B]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2D2D2D] mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Last updated: January 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardContent className="p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              At MetaSkills, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using MetaSkills, you agree to this Privacy Policy. If you do not agree with any part of this policy, you must not use our platform.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            1. Information We Collect
          </h2>

          <Card className="mb-4 border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Personal Information
              </h3>
              <p className="text-gray-700 mb-3">
                When you create an account, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Name and email address</li>
                <li>Profile information (optional photo, bio)</li>
                <li>Account credentials (password, authentication tokens)</li>
                <li>Communication preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-4 border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Assessment Data
              </h3>
              <p className="text-gray-700 mb-3">
                We collect information related to your skill assessments:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Assessment responses and answers</li>
                <li>Calculated skill scores and profiles</li>
                <li>Progress tracking data</li>
                <li>Learning path recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Usage Information
              </h3>
              <p className="text-gray-700 mb-3">
                We automatically collect information about your use of the platform:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Device information (browser, operating system)</li>
                <li>Log data (IP address, access times)</li>
                <li>Usage patterns and interactions</li>
                <li>Performance and crash data</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            2. How We Use Your Information
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">We use the collected information for various purposes:</p>
              <ul className="space-y-3">
                {[
                  "To provide, maintain, and improve our services",
                  "To process your assessments and generate personalized recommendations",
                  "To track your progress and display analytics",
                  "To communicate with you about updates, features, and support",
                  "To personalize your experience based on your skill profile",
                  "To ensure security and prevent fraud",
                  "To comply with legal obligations",
                  "To analyze usage patterns and improve our platform"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#8DA399] mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Data Sharing */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            3. Information Sharing
          </h2>

          <Card className="mb-4 border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                We Do Not Sell Your Data
              </h3>
              <p className="text-gray-700">
                We never sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Limited Sharing Circumstances
              </h3>
              <p className="text-gray-700 mb-3">We may share your information only in the following cases:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span><strong>Service Providers:</strong> Third-party services that help us operate (e.g., hosting, analytics)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span><strong>Legal Requirements:</strong> When required by law or to protect our rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span><strong>With Your Consent:</strong> When you explicitly authorize sharing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            4. Data Security
          </h2>
          <Card className="border-[#8DA399] bg-[#8DA399]/5">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="space-y-3">
                {[
                  "Secure HTTPS/TLS encryption for all data transmission",
                  "Encrypted password storage using industry-best practices",
                  "Regular security audits and vulnerability assessments",
                  "Access controls and authentication systems",
                  "Secure data centers with physical security measures",
                  "Data backup and disaster recovery procedures"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#8DA399]">🔒</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            5. Your Rights and Choices
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <div className="space-y-4">
                {[
                  {
                    title: "Access and Review",
                    desc: "Request a copy of your personal data"
                  },
                  {
                    title: "Correction",
                    desc: "Update or correct inaccurate information"
                  },
                  {
                    title: "Deletion",
                    desc: "Request deletion of your personal data"
                  },
                  {
                    title: "Data Portability",
                    desc: "Receive your data in a structured format"
                  },
                  {
                    title: "Opt-Out",
                    desc: "Opt-out of marketing communications"
                  },
                  {
                    title: "Account Deletion",
                    desc: "Delete your account and all associated data"
                  }
                ].map((right, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8DA399]/20 flex items-center justify-center text-[#8DA399] font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2D2D2D] mb-1">{right.title}</h4>
                      <p className="text-sm text-gray-600">{right.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                To exercise these rights, contact us at privacy@metaskills.ai
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Data Retention */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            6. Data Retention
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will securely delete or anonymize your personal data within 30 days, except where we are required by law to retain certain information.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            7. Children's Privacy
          </h2>
          <Card className="border-[#C7826B] bg-[#C7826B]/5">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* International Transfers */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            8. International Data Transfers
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Changes to Policy */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            9. Changes to This Policy
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            10. Contact Us
          </h2>
          <Card className="border-[#8DA399] bg-[#8DA399]/5">
            <CardContent className="p-8">
              <p className="text-gray-700 mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium text-[#2D2D2D]">Email</p>
                    <p className="text-gray-600">privacy@metaskills.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium text-[#2D2D2D]">Address</p>
                    <p className="text-gray-600">MetaSkills, San Francisco, CA 94102</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Back Button */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
          >
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
