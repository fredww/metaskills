import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8DA399]/10 via-[#D4AF37]/10 to-[#C7826B]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2D2D2D] mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Choose the plan that fits your journey. Start free and upgrade as you grow.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <Card className="border-2 border-[#E5E0D8] hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                Free Explorer
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Perfect for getting started
              </p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-[#2D2D2D]">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 comprehensive assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic skill profile report</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access to 3 practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Community support</span>
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
              >
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan - Popular */}
          <Card className="border-2 border-[#8DA399] relative hover:shadow-xl transition-shadow">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#8DA399] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                Growth Seeker
              </CardTitle>
              <p className="text-gray-600 mt-2">
                For serious skill development
              </p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-[#8DA399]">$12</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Detailed skill insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access to all practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Progress tracking & analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personalized learning paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority email support</span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href="/signup">
                  Start 14-Day Free Trial
                </Link>
              </Button>
              <p className="text-xs text-gray-600 text-center">
                No credit card required
              </p>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 border-[#C7826B] hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                Teams & Enterprise
              </CardTitle>
              <p className="text-gray-600 mt-2">
                For organizations and teams
              </p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-[#C7826B]">Custom</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in Growth Seeker</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Team analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom skill frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated success manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">SSO & advanced security</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Bulk pricing discounts</span>
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#C7826B] text-[#C7826B] hover:bg-[#C7826B] hover:text-white"
              >
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-8 text-center">
            Compare Features
          </h2>
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E0D8]">
                      <th className="text-left py-4 pr-4">Feature</th>
                      <th className="text-center py-4 px-4">Free Explorer</th>
                      <th className="text-center py-4 px-4 bg-[#8DA399]/5">Growth Seeker</th>
                      <th className="text-center py-4 pl-4">Teams & Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E0D8]/50">
                      <td className="py-4 pr-4 text-gray-700">Assessments per month</td>
                      <td className="text-center py-4 px-4 text-gray-600">1</td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5 font-semibold text-[#8DA399]">Unlimited</td>
                      <td className="text-center py-4 pl-4 font-semibold text-[#C7826B]">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E5E0D8]/50">
                      <td className="py-4 pr-4 text-gray-700">Practice library access</td>
                      <td className="text-center py-4 px-4 text-gray-600">3 practices</td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5 font-semibold text-[#8DA399]">All 50+ practices</td>
                      <td className="text-center py-4 pl-4 font-semibold text-[#C7826B]">All 50+ practices</td>
                    </tr>
                    <tr className="border-b border-[#E5E0D8]/50">
                      <td className="py-4 pr-4 text-gray-700">Progress tracking</td>
                      <td className="text-center py-4 px-4"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5"><Check className="w-5 h-5 text-[#8DA399] mx-auto" /></td>
                      <td className="text-center py-4 pl-4"><Check className="w-5 h-5 text-[#C7826B] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-[#E5E0D8]/50">
                      <td className="py-4 pr-4 text-gray-700">Learning paths</td>
                      <td className="text-center py-4 px-4"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5"><Check className="w-5 h-5 text-[#8DA399] mx-auto" /></td>
                      <td className="text-center py-4 pl-4"><Check className="w-5 h-5 text-[#C7826B] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-[#E5E0D8]/50">
                      <td className="py-4 pr-4 text-gray-700">Journal & reflection</td>
                      <td className="text-center py-4 px-4"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5"><Check className="w-5 h-5 text-[#8DA399] mx-auto" /></td>
                      <td className="text-center py-4 pl-4"><Check className="w-5 h-5 text-[#C7826B] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-[#E5E0D8]/50">
                      <td className="py-4 pr-4 text-gray-700">Team dashboard</td>
                      <td className="text-center py-4 px-4"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 pl-4"><Check className="w-5 h-5 text-[#C7826B] mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 text-gray-700">Dedicated support</td>
                      <td className="text-center py-4 px-4"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 px-4 bg-[#8DA399]/5"><span className="text-gray-400">—</span></td>
                      <td className="text-center py-4 pl-4"><Check className="w-5 h-5 text-[#C7826B] mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  What's included in the free trial?
                </h3>
                <p className="text-gray-600">
                  The 14-day free trial gives you full access to all Growth Seeker features. No credit card required until you decide to subscribe.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us within 30 days for a full refund.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  Can teams get custom pricing?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Contact our sales team for custom pricing based on your team size and specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-[#8DA399] bg-[#8DA399]/5">
            <CardContent className="p-12">
              <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of individuals and teams developing their meta-skills with MetaSkills
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href="/signup">
                  Get Started for Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
