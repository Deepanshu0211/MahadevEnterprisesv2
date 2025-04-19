"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Wall Frames",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/wall-frames",
  },
  {
    id: 2,
    name: "Decorative Elephants",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/decorative-elephants",
  },
  {
    id: 3,
    name: "Cushion Covers",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/cushion-covers",
  },
  {
    id: 4,
    name: "Table Runners",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/table-runners",
  },
  {
    id: 5,
    name: "Wall Decor",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/wall-decor",
  },
  {
    id: 6,
    name: "Lamps",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/lamps",
  },
  {
    id: 7,
    name: "Kutch Bells",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/kutch-bells",
  },
  {
    id: 8,
    name: "Garden Stakes",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/garden-stakes",
  },
  {
    id: 9,
    name: "Candle Holders",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/candle-holders",
  },
  {
    id: 10,
    name: "Rugs & Planters",
    image: "/placeholder.svg?height=150&width=150",
    href: "/category/rugs-planters",
  },
]

export default function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from(".category-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate the category icons
      gsap.from(".category-icon", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".category-container",
          start: "top bottom-=50",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="category-title text-2xl md:text-3xl font-bold text-center mb-8">Shop By Category</h2>

        <div className="category-container overflow-x-auto scrollbar-hide pb-4">
          <div className="flex space-x-6 min-w-max px-2">
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="category-icon flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-3 overflow-hidden border border-gray-100">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm text-center font-medium text-gray-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
