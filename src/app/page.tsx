"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const reveals = document.querySelectorAll('.reveal')

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    reveals.forEach(reveal => {
      revealObserver.observe(reveal)
    })

    return () => {
      reveals.forEach(reveal => revealObserver.unobserve(reveal))
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="gradient-blob w-96 h-96 bg-[#8DA399] top-0 -right-48"></div>
        <div className="gradient-blob w-80 h-80 bg-[#C7826B] animation-delay-200" style={{bottom: '180px', left: '-160px'}}></div>
        <div className="gradient-blob w-64 h-64 bg-[#D4AF37] animation-delay-400" style={{top: 'calc(50% + 100px)', left: 'calc(50% + 20px)'}}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center" style={{marginTop: '-70px'}}>
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E5E0D8] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8DA399] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">The Human Capability Operating System</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up animation-delay-100 text-5xl md:text-7xl font-bold font-serif leading-tight mb-8 text-[#2D2D2D]">
            Learn Abilities That
            <span className="gradient-text block mt-2">Never Expire</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animation-delay-200 text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            In a world where technical skills become obsolete every 5 years, <strong className="font-semibold text-[#2D2D2D]">meta-skills</strong>—the ability to learn, think, adapt, and understand yourself and others—are your lifelong competitive advantage.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/assessment" className="btn-primary px-8 py-4 rounded-full text-base font-semibold inline-flex items-center space-x-2">
              <span>Start Your Assessment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/skills" className="btn-secondary px-8 py-4 rounded-full text-base font-semibold">
              Explore the Framework
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up animation-delay-400 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#8DA399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Evidence-based</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#C7826B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Privacy-first</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Human-centered</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Meta-Skills Framework Section */}
      <section id="framework" className="py-24 lg:py-32 bg-[#F3EFE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">The Framework</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-6">
              Three Systems, One Operating System
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              All human capabilities can be organized into three interconnected systems. This isn't a course list—it's a map of human potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cognitive System */}
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8DA399] to-[#6B8379] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-4">Cognitive System</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                How you understand the world, learn, think, and make decisions. The foundation of all intellectual work.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Learning to Learn</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Critical Thinking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Systems Thinking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Decision Making</span>
                </li>
              </ul>
            </div>

            {/* Interpersonal System */}
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C7826B] to-[#A56550] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-4">Interpersonal System</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                How you understand others, build relationships, communicate, collaborate, and navigate social complexity.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Emotional Intelligence</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Communication</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Empathy & Perspective-Taking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Collaboration</span>
                </li>
              </ul>
            </div>

            {/* Self System */}
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B7C93] to-[#4A5A6D] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-4">Self System</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                How you manage your inner world—emotions, attention, energy, motivation, and personal growth.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Self-Awareness</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Emotional Regulation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Resilience & Adaptability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mindfulness & Focus</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="reveal text-center mt-16">
            <Link href="/skills" className="inline-flex items-center space-x-2 text-[#8DA399] font-semibold hover:text-[#6B8379] transition-colors">
              <span>View Complete Skill Map</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Meta-Skills Section */}
      <section id="why" className="py-24 lg:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">The Why</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-6">
                Why Meta-Skills<br />Matter Now More Than Ever
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We're living through an unprecedented acceleration of change. The half-life of a learned professional skill is now estimated at only <strong className="text-[#2D2D2D]">5 years</strong>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                While specific tools and frameworks will continue to evolve, the fundamental human capabilities to learn, think critically, connect with others, and adapt will only increase in value.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F4F0] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#8DA399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">Automation-Proof Your Career</h4>
                    <p className="text-gray-600">AI excels at repetitive tasks. Humans excel at nuance, creativity, and complex judgment.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FBECE8] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#C7826B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">Build a Foundation for Wellbeing</h4>
                    <p className="text-gray-600">Research shows that meta-skills like resilience and self-awareness correlate strongly with life satisfaction.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F3EF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">Stay Universally Relevant</h4>
                    <p className="text-gray-600">These capabilities are valued across every culture, industry, and role—now and decades from now.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#E5E0D8]">
                <h3 className="text-xl font-bold font-serif text-[#2D2D2D] mb-6">Skill Value Over Time</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">Technical Skills</span>
                      <span className="text-gray-500">↓ Declining</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#6B7C93] to-[#8DA399] h-3 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Lose relevance as technology advances</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">Meta-Skills</span>
                      <span className="text-[#8DA399] font-semibold">↑ Growing</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#8DA399] to-[#C7826B] h-3 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Compound in value throughout your career</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
                  <p className="text-sm text-gray-600 italic">
                    "The ability to learn faster than your competitors is your only sustainable competitive advantage."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">— Arie de Geus, Former Head of Strategy, Royal Dutch Shell</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#8DA399]/20 to-[#C7826B]/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How You Learn Section */}
      <section className="py-24 lg:py-32 bg-[#2D2D2D] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#8DA399] mb-4">The Approach</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              A Different Way to Learn
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              This isn't a course platform. It's a calm space for reflection, practice, and gradual growth—no pressure, no gamification, no comparison.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">🌿</div>
              <h4 className="text-xl font-bold mb-3">Microlearning</h4>
              <p className="text-gray-400 text-sm">5–10 minute practices. No overwhelming courses. Learn in small moments throughout your day.</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-100">
              <div className="text-3xl mb-4">🧭</div>
              <h4 className="text-xl font-bold mb-3">Non-Linear Paths</h4>
              <p className="text-gray-400 text-sm">Follow what resonates. No prescribed order. Your journey is unique to you.</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-200">
              <div className="text-3xl mb-4">📓</div>
              <h4 className="text-xl font-bold mb-3">Practice & Reflection</h4>
              <p className="text-gray-400 text-sm">Knowledge alone isn't transformation. We emphasize real-world application over theory.</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">🤖</div>
              <h4 className="text-xl font-bold mb-3">AI-Guided Reflection</h4>
              <p className="text-gray-400 text-sm">A thoughtful AI companion helps you see patterns, not prescribe solutions. Always your choice.</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-100">
              <div className="text-3xl mb-4">🌙</div>
              <h4 className="text-xl font-bold mb-3">Calm Experience</h4>
              <p className="text-gray-400 text-sm">Distraction-free interfaces. Dark mode available. Designed for focus, not engagement metrics.</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-200">
              <div className="text-3xl mb-4">🪴</div>
              <h4 className="text-xl font-bold mb-3">Long-Term Growth</h4>
              <p className="text-gray-400 text-sm">We measure progress in years, not days. No streaks, no FOMO. Sustainable development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="start" className="py-24 lg:py-32 bg-[#F3EFE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">Entry Points</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-6">
              Begin Where You Are
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              No preparation needed. No prerequisites. Just show up as you are and take one small step.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7826B] to-[#A56550] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-3">Meta-Skills Assessment</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Take 10 minutes to reflect on your current capabilities. Receive a personalized map—not a score.
              </p>
              <Link href="/assessment" className="inline-flex items-center space-x-2 text-[#C7826B] font-semibold hover:text-[#A56550] transition-colors">
                <span>Start Assessment</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8DA399] to-[#6B8379] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-3">5-Minute Practice</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                One simple, grounded exercise you can do right now. No signup required.
              </p>
              <Link href="/practices" className="inline-flex items-center space-x-2 text-[#8DA399] font-semibold hover:text-[#6B8379] transition-colors">
                <span>Try a Practice</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B7C93] to-[#4A5A6D] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-3">Calm Learning Mode</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enter our distraction-free reading and reflection space. No tracking, no notifications.
              </p>
              <Link href="#" className="inline-flex items-center space-x-2 text-[#6B7C93] font-semibold hover:text-[#4A5A6D] transition-colors">
                <span>Enter Calm Space</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 lg:py-32 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="reveal">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-8">
              This Is Not Another Platform to Make You More Productive
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              We exist to help you build a grounded, adaptive inner system—not to optimize you like a machine. Growth takes time. Reflection is messy. And that's okay.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-[#F3EFE9] rounded-2xl p-6">
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-3">What We Believe</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Awareness matters more than performance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Development is more important than comparison</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Structure provides more value than scores</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Long-term growth trumps short-term efficiency</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#F3EFE9] rounded-2xl p-6">
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-3">What We Reject</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Hustle culture and burnout</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Aggressive gamification and addiction</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Ranking, competition, and comparison</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Treating humans like optimization problems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
