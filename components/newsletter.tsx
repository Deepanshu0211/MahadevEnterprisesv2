"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Animation for successful submission
      const tl = gsap.timeline()
      tl.to(".newsletter-form", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => setIsSubmitted(true),
      })
      tl.fromTo(".success-message", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate the form elements
      gsap.from(".newsletter-content > *", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".newsletter-content",
          start: "top bottom-=50",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center newsletter-content">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, special offers, and Indian
            cultural insights.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="newsletter-form flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-white text-orange-500 hover:bg-orange-100">
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div className="success-message p-4 bg-white/10 rounded-lg max-w-md mx-auto">
              <h3 className="font-semibold text-xl mb-2">Thank You for Subscribing!</h3>
              <p>We've sent a confirmation email to your inbox. Please check and confirm your subscription.</p>
            </div>
          )}

          <p className="text-sm text-white/60 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  )
}
