"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Clothing",
    image: "/placeholder.svg?height=400&width=300",
    count: 124,
  },
  {
    id: 2,
    name: "Jewelry",
    image: "/placeholder.svg?height=400&width=300",
    count: 86,
  },
  {
    id: 3,
    name: "Home Decor",
    image: "/placeholder.svg?height=400&width=300",
    count: 97,
  },
  {
    id: 4,
    name: "Wellness",
    image: "/placeholder.svg?height=400&width=300",
    count: 65,
  },
]

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".category-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })

      // Category cards animation
      gsap.from(".category-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".category-grid",
          start: "top bottom-=50",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 mandala-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 category-heading">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our diverse collection of authentic Indian products across various categories.
          </p>
        </div>

        <div className="category-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="category-card group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">{category.count} Products</span>
                  <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
