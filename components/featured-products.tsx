"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"

// Sample product data
const products = [
  {
    id: 1,
    name: "Handcrafted Brass Lamp",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Embroidered Silk Scarf",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Sandalwood Incense Set",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wellness",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Hand-painted Ceramic Vase",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: false,
    isFeatured: true,
  },
]

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for product cards
      gsap.from(".product-card", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      })

      // Hover animations for product cards
      const productCards = document.querySelectorAll(".product-card")

      productCards.forEach((card) => {
        const image = card.querySelector(".product-image")
        const actions = card.querySelector(".product-actions")

        // Create hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.05, duration: 0.3 })
          gsap.to(actions, { opacity: 1, y: 0, duration: 0.3 })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.3 })
          gsap.to(actions, { opacity: 0, y: 10, duration: 0.3 })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 gsap-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of authentic Indian treasures, crafted with tradition and love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="product-card overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="product-image w-full h-64 object-cover transition-transform duration-300"
                  />

                  {product.isNew && <Badge className="absolute top-3 left-3 bg-accent text-white">New Arrival</Badge>}

                  <div className="product-actions absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 translate-y-10">
                    <Button
                      size="icon"
                      className="rounded-full bg-white text-gray-800 hover:bg-orange-500 hover:text-white"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                    <Button
                      size="icon"
                      className="rounded-full bg-white text-gray-800 hover:bg-orange-500 hover:text-white"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                    <Button
                      size="icon"
                      className="rounded-full bg-white text-gray-800 hover:bg-orange-500 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Quick view</span>
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-lg mb-1 hover:text-orange-500 transition-colors">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="font-bold text-lg text-orange-500">${product.price.toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
