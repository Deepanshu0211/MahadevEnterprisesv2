"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"

// Sample product data
const products = [
  {
    id: 5,
    name: "Traditional Jute Rug",
    price: 2499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: true,
  },
  {
    id: 6,
    name: "Handwoven Cotton Saree",
    price: 3999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    isNew: true,
  },
  {
    id: 7,
    name: "Copper Water Bottle",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wellness",
    isNew: true,
  },
  {
    id: 8,
    name: "Handmade Leather Journal",
    price: 699,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: true,
  },
  {
    id: 9,
    name: "Wooden Elephant Figurine",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: true,
  },
  {
    id: 10,
    name: "Embroidered Wall Hanging",
    price: 1899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    isNew: true,
  },
]

export default function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesPerView = 4
  const totalSlides = Math.ceil(products.length / slidesPerView)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for product cards
      gsap.from(".new-arrival-card", {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    const inWishlist = isInWishlist(product.id)

    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
      gsap.to(sliderRef.current, {
        x: `-${(currentSlide + 1) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      gsap.to(sliderRef.current, {
        x: `-${(currentSlide - 1) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-indian-pink/10 text-indian-pink rounded-full text-sm font-medium mb-2">
              Just Arrived
            </span>
            <h2 className="text-3xl font-bold">New Arrivals</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex space-x-2"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="rounded-full border-indian-pink text-indian-pink hover:bg-indian-pink/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="rounded-full border-indian-pink text-indian-pink hover:bg-indian-pink/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${totalSlides * 100}%` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex gap-6 w-full" style={{ flexBasis: `${100 / totalSlides}%` }}>
                {products.slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-1"
                  >
                    <Card className="new-arrival-card overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <Link href={`/product/${product.id}`}>
                            <div className="overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                              />
                            </div>
                          </Link>

                          <Badge className="absolute top-3 left-3 bg-accent text-white">New Arrival</Badge>

                          <div className="absolute bottom-3 right-3 flex gap-2">
                            <Button
                              size="icon"
                              className="rounded-full bg-white text-gray-800 hover:bg-indian-pink hover:text-white shadow-md"
                              onClick={(e) => handleAddToCart(e, product)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span className="sr-only">Add to cart</span>
                            </Button>
                            <Button
                              size="icon"
                              className={`rounded-full bg-white text-gray-800 hover:bg-indian-pink hover:text-white shadow-md ${
                                isInWishlist(product.id) ? "text-indian-pink" : ""
                              }`}
                              onClick={(e) => handleWishlistToggle(e, product)}
                            >
                              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                              <span className="sr-only">
                                {isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                              </span>
                            </Button>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                          <h3 className="font-semibold text-lg mb-1 hover:text-indian-pink transition-colors">
                            <Link href={`/product/${product.id}`}>{product.name}</Link>
                          </h3>
                          <div className="font-bold text-lg text-indian-pink">₹{product.price.toLocaleString()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/shop?filter=new-arrivals">
            <Button className="bg-indian-pink hover:bg-indian-pink/90">View All New Arrivals</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
