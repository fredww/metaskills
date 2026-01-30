import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8DA399]/10 via-[#D4AF37]/10 to-[#C7826B]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2D2D2D] mb-6">
            Terms of Service
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
              Welcome to MetaSkills. These Terms of Service ("Terms") govern your use of our platform, services, and website. By accessing or using MetaSkills, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read these Terms carefully before using our services. If you do not agree with these Terms, you must not use MetaSkills.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            1. Acceptance of Terms
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                By creating an account, accessing our platform, or using our services, you:
              </p>
              <ul className="space-y-3">
                {[
                  "Confirm that you are at least 13 years of age",
                  "Have read, understood, and agree to be bound by these Terms",
                  "Accept our Privacy Policy and Cookie Policy",
                  "Agree to comply with all applicable laws and regulations"
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

        {/* Description of Service */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            2. Description of Service
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                MetaSkills provides a personal development platform focused on meta-skills assessment, learning, and tracking. Our services include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Skill assessments and profiling",
                  "Personalized learning recommendations",
                  "Practice exercises and techniques",
                  "Progress tracking and analytics",
                  "Journal and reflection tools",
                  "Community features and support"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* User Responsibilities */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            3. User Responsibilities
          </h2>
          <Card className="border-[#C7826B] bg-[#C7826B]/5">
            <CardContent className="p-6">
              <p className="text-gray-700 font-semibold mb-4">As a MetaSkills user, you agree to:</p>
              <ul className="space-y-3">
                {[
                  "Provide accurate and complete information during registration",
                  "Maintain the security of your account and password",
                  "Accept responsibility for all activities under your account",
                  "Notify us immediately of any unauthorized use",
                  "Not share your account credentials with others",
                  "Use our services for lawful purposes only",
                  "Respect the rights and privacy of other users"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#C7826B] mt-1">⚠️</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Prohibited Activities */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            4. Prohibited Activities
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">You must not engage in any of the following activities:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Accessing the service without authorization",
                  "Interfering with or disrupting the service",
                  "Spamming, harassing, or abusing other users",
                  "Upgrading viruses or malicious code",
                  "Attempting to gain unauthorized access",
                  "Copying or modifying the platform's code",
                  "Using automated tools to scrape data",
                  "Impersonating any person or entity",
                  "Violating any applicable laws",
                  "Engaging in fraudulent or deceptive practices"
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-red-50 rounded">
                    <span className="text-red-600 text-lg">✗</span>
                    <span className="text-sm text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            5. Intellectual Property
          </h2>

          <Card className="mb-4 border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Our Content
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of MetaSkills, including but not limited to text, graphics, logos, designs, and software, are owned by MetaSkills and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Your Content
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                You retain ownership of any content you submit to MetaSkills, including assessment responses, journal entries, and other user-generated content. By submitting content, you grant us a license to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Store, process, and analyze your content</li>
                <li>Display and personalize your experience</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2D2D] mb-3">
                Limited License
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use MetaSkills for your personal, non-commercial use. You may not reproduce, distribute, or create derivative works without our express written consent.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* User Data and Privacy */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            6. User Data and Privacy
          </h2>
          <Card className="border-[#8DA399] bg-[#8DA399]/5">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. Key points:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#8DA399]">🔒</span>
                  <span>We implement security measures to protect your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8DA399]">📊</span>
                  <span>We use your data to provide personalized experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8DA399]">👤</span>
                  <span>You have rights regarding your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8DA399]">🗑️</span>
                  <span>You can request deletion of your account and data at any time</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Paid Services */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            7. Paid Services
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Certain features and services may require payment. By subscribing to a paid plan:
              </p>
              <ul className="space-y-3">
                {[
                  {
                    title: "Billing",
                    desc: "You authorize us to charge your payment method for the selected plan"
                  },
                  {
                    title: "Auto-Renewal",
                    desc: "Subscriptions automatically renew unless cancelled before the renewal date"
                  },
                  {
                    title: "Price Changes",
                    desc: "We may change pricing with 30 days notice for existing subscribers"
                  },
                  {
                    title: "Refunds",
                    desc: "Refunds are handled on a case-by-case basis within 30 days of purchase"
                  },
                  {
                    title: "Cancellation",
                    desc: "You may cancel at any time; benefits continue until the end of the billing period"
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2D2D2D] mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Disclaimers */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            8. Disclaimers
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                MetaSkills is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee:
              </p>
              <ul className="space-y-2 text-gray-700">
                {[
                  "That the service will be uninterrupted, timely, secure, or error-free",
                  "That the results or assessments will be accurate or reliable",
                  "That any errors will be corrected",
                  "The quality or suitability of any content or recommendations"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C7826B]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                MetaSkills is not a substitute for professional advice in medical, psychological, or career matters.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            9. Limitation of Liability
          </h2>
          <Card className="border-[#C7826B] bg-[#C7826B]/5">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, MetaSkills shall not be liable for:
              </p>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Any indirect, incidental, special, or consequential damages",
                  "Loss of profits, data, or business opportunities",
                  "Personal injury or property damage related to service use",
                  "Unauthorized access to or use of our secure servers"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C7826B]">🛡️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Our total liability shall not exceed the amount you paid for the service in the past 12 months.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Termination */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            10. Account Termination
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate your account at any time:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">By You</h4>
                  <p className="text-sm text-gray-600">
                    You may delete your account at any time through your profile settings or by contacting support
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">By Us</h4>
                  <p className="text-sm text-gray-600">
                    We may suspend or terminate your account for violation of these Terms, illegal activity, or at our discretion
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Upon termination, your right to use the service ceases immediately. We may delete your account data after a reasonable period.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            11. Changes to Terms
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the platform. Your continued use of MetaSkills after changes constitutes acceptance of the updated Terms.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            12. Governing Law
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the federal and state courts located in San Francisco, California.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            13. Contact Us
          </h2>
          <Card className="border-[#8DA399] bg-[#8DA399]/5">
            <CardContent className="p-8">
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium text-[#2D2D2D]">Email</p>
                    <p className="text-gray-600">legal@metaskills.ai</p>
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
              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  <Link href="/privacy">
                    View Privacy Policy
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
