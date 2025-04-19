"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    quote:
      "The quality of the handcrafted items is exceptional. Each piece tells a story of Indian craftsmanship and heritage. I'm absolutely in love with my purchases!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "London, UK",
    quote:
      "As an NRI, Dharmik Vadaliya helps me stay connected to my roots. The authentic products remind me of home and the shipping is surprisingly fast!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "New York, USA",
    quote:
      "I discovered this store while searching for authentic Indian decor. The attention to detail in every product is remarkable. Customer service is top-notch too!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Amit Verma",
    location: "Delhi, India",
    quote:
      "The traditional designs with modern touches are perfect for my home. I've received so many compliments on the items I've purchased from Dharmik Vadaliya.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the section when it scrolls into view
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Animate only the slide content
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
  }, [activeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with our authentic Indian products.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div ref={slideRef} className="relative">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8 md:p-12">
                <Quote className="h-12 w-12 text-indian-pink/20 mb-6" />
                <p className="text-lg md:text-xl text-gray-700 mb-8 italic">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-gray-500">{testimonials[activeIndex].location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-indian-pink text-indian-pink hover:bg-indian-pink/10"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? "bg-indian-pink" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-indian-pink text-indian-pink hover:bg-indian-pink/10"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
