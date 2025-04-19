"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HandcraftedBanner() {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".banner-text", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top bottom-=100",
        },
      })
    }, bannerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={bannerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="banner-text text-center text-white max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">HANDCRAFTED WITH PASSION</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80 mb-8">
            Each piece tells a story of tradition, craftsmanship, and cultural heritage passed down through generations
          </p>
          <Link href="/about">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
              Discover Our Story
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
