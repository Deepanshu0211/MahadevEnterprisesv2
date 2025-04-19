"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    id: 1,
    name: "Rajasthani Heritage",
    description: "Vibrant handicrafts from the desert state",
    image: "/placeholder.svg?height=600&width=400",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    name: "Kerala Treasures",
    description: "Traditional crafts from God's own country",
    image: "/placeholder.svg?height=600&width=400",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    name: "Madhubani Magic",
    description: "Ancient art form with intricate patterns",
    image: "/placeholder.svg?height=600&width=400",
    color: "from-blue-500 to-indigo-500",
  },
]

export default function FeaturedCollections() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the title (excluding motion-controlled)
      gsap.from(".collection-title:not(.motion)", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate the collection cards (excluding motion-controlled)
      gsap.from(".collection-card:not(.motion)", {
        autoAlpha: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".collection-grid",
          start: "top bottom-=50",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="collection-title motion text-3xl md:text-4xl font-bold mb-4"
          >
            Explore Our Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover the rich cultural heritage of India through our carefully curated collections
          </motion.p>
        </div>

        <div className="collection-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="collection-card motion group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-80 z-10`} />
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-white/90 mb-4">{collection.description}</p>
                <Link href={`/collections/${collection.id}`}>
                  <Button className="bg-white text-gray-900 hover:bg-black/90 group flex items-center">
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
                  </Button>

                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/collections">
          <Button variant="outline" className="border-indian-pink text-indian-pink hover:bg-indian-pink/10 hover:text-black">
            View All Collections
          </Button>

          </Link>
        </div>
      </div>
    </section>
  )
}
