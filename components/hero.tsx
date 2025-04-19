"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(
        textRef.current?.querySelectorAll("h1, p, .button-group"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
        },
      )

      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.75)",
        },
        "-=0.5",
      )

      // Floating animation for the image
      gsap.to(imageRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Subtle background pattern animation
      gsap.to(".pattern-bg", {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative overflow-hidden">
      <div className="pattern-bg absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Authentic Indian Craftsmanship
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Discover the <span className="text-orange-500">Vibrant</span> Spirit of India
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Explore our curated collection of authentic Indian products, handcrafted with love and tradition.
            </p>
            <div className="button-group flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/collections">
                <Button variant="outline" size="lg" className="group">
                  Explore Collections
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          <div ref={imageRef} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Indian Handicrafts Collection"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <div className="text-center">
                <div className="text-xs">UP TO</div>
                <div className="text-xl">40%</div>
                <div className="text-xs">OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
