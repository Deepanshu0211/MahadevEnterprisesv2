"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Truck, Award, Package, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders above ₹800",
  },
  {
    icon: Award,
    title: "Authentic Craftsmanship",
    description: "Handcrafted by skilled artisans across India",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    description: "Products carefully packaged to ensure safe delivery",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day easy return policy for all products",
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from(".features-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate the feature cards
      gsap.from(".feature-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top bottom-=50",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="features-title text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indian-pink/10 text-indian-pink mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
