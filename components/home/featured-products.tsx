"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"

// Sample product data
const products = [
  {
    id: 1,
    name: "Handcrafted Brass Lamp",
    price: 1899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Embroidered Silk Scarf",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Sandalwood Incense Set",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wellness",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Hand-painted Ceramic Vase",
    price: 1499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: false,
    isFeatured: true,
  },
]

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    // Create animation
    const button = e.currentTarget
    const originalContent = button.innerHTML

    gsap.to(button, {
      scale: 0.9,
      duration: 0.1,
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.1,
        })
      },
    })

    // Add to cart
    addToCart(product)

    // Show toast notification
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

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 bg-indian-pink/10 text-indian-pink rounded-full text-sm font-medium mb-3"
          >
            Handpicked Selection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our handpicked selection of authentic Indian treasures, crafted with tradition and love.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="product-card overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <div className="overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="product-image w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </Link>

                    {product.isNew && <Badge className="absolute top-3 left-3 bg-accent text-white">New Arrival</Badge>}

                    <div className="product-actions absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
                      <Link href={`/product/${product.id}`}>
                        <Button
                          size="icon"
                          className="rounded-full bg-white text-gray-800 hover:bg-indian-pink hover:text-white shadow-md"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Quick view</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
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

        <div className="text-center mt-14">
          <Link href="/shop">
            <Button size="lg" className="bg-indian-pink hover:bg-indian-pink/90">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
