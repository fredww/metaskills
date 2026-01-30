"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Thank you for your message! We'll get back to you within 24 hours.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8DA399]/10 via-[#D4AF37]/10 to-[#C7826B]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2D2D2D] mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-6">
                  Send us a Message
                </h2>

                {submitMessage && (
                  <Alert className={`mb-6 ${submitMessage.includes("Thank") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                    <AlertDescription className={submitMessage.includes("Thank") ? "text-green-800" : "text-red-800"}>
                      {submitMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-2 bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-2 bg-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-base">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="mt-2 bg-white"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="mt-2 bg-white resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-medium text-[#2D2D2D]">Email</p>
                      <p className="text-sm text-gray-600">support@metaskills.ai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-medium text-[#2D2D2D]">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 9am-6pm PST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-medium text-[#2D2D2D]">Location</p>
                      <p className="text-sm text-gray-600">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                  Support Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-[#2D2D2D] font-medium">9am - 6pm PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-[#2D2D2D] font-medium">10am - 4pm PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-[#2D2D2D] font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="border-[#D4AF37] bg-[#D4AF37]/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-3">
                  Response Time
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8DA399]">✓</span>
                    <span className="text-sm text-gray-700">General inquiries: 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8DA399]">✓</span>
                    <span className="text-sm text-gray-700">Technical support: 12 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8DA399]">✓</span>
                    <span className="text-sm text-gray-700">Enterprise sales: 48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                  Follow Us
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-700 hover:text-[#8DA399] transition-colors"
                  >
                    <span className="text-xl">🐦</span>
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-700 hover:text-[#8DA399] transition-colors"
                  >
                    <span className="text-xl">💼</span>
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-700 hover:text-[#8DA399] transition-colors"
                  >
                    <span className="text-xl">📸</span>
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Links */}
        <section className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-6 text-center">
            Common Questions
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-[#E5E0D8] hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <span className="text-3xl mb-3 block">💡</span>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  How do I get started?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Take our free assessment to discover your meta-skills profile
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  <a href="/assessment">Start Assessment</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8] hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <span className="text-3xl mb-3 block">💰</span>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  What are the pricing options?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose from Free, Pro, or Enterprise plans
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  <a href="/pricing">View Pricing</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8] hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <span className="text-3xl mb-3 block">📚</span>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  What skills can I learn?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore our 8 fundamental meta-skills
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  <a href="/skills">Explore Skills</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
