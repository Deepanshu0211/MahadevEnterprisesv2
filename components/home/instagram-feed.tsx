"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300",
    likes: 124,
    comments: 23,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300",
    likes: 98,
    comments: 15,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    likes: 156,
    comments: 32,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    likes: 87,
    comments: 11,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    likes: 213,
    comments: 45,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    likes: 76,
    comments: 8,
  },
]

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the title (only if not motion-controlled)
      gsap.from(".instagram-title:not(.motion)", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate posts (excluding motion-controlled ones)
      gsap.from(".instagram-post:not(.motion)", {
        autoAlpha: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".instagram-grid",
          start: "top bottom-=50",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="motion flex items-center justify-center gap-2 mb-4"
          >
            <Instagram className="h-6 w-6 text-indian-pink" />
            <span className="text-lg font-medium text-indian-pink">@MahadevEnterprises</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="instagram-title motion text-3xl md:text-4xl font-bold mb-4"
          >
            Follow Us on Instagram
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="motion text-gray-600 max-w-2xl mx-auto"
          >
            Join our community and stay updated with our latest products and behind-the-scenes content
          </motion.p>
        </div>

        <div className="instagram-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="instagram-post motion group relative overflow-hidden rounded-lg"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Instagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
