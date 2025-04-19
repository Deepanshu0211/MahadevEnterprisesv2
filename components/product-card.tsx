"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
  isFeatured?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true)
    const image = e.currentTarget.querySelector(".product-image")
    const actions = e.currentTarget.querySelector(".product-actions")

    gsap.to(image, { scale: 1.05, duration: 0.3 })
    gsap.to(actions, { opacity: 1, y: 0, duration: 0.3 })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false)
    const image = e.currentTarget.querySelector(".product-image")
    const actions = e.currentTarget.querySelector(".product-actions")

    gsap.to(image, { scale: 1, duration: 0.3 })
    gsap.to(actions, { opacity: 0, y: 10, duration: 0.3 })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
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

    // Show success feedback
    button.innerHTML = "<span>Added!</span>"
    setTimeout(() => {
      button.innerHTML = originalContent
    }, 1000)
  }

  return (
    <Card
      className="product-card overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="product-image w-full h-64 object-cover transition-transform duration-300"
            />
          </Link>

          {product.isNew && <Badge className="absolute top-3 left-3 bg-accent text-white">New Arrival</Badge>}

          <div
            className="product-actions absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 translate-y-10"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <Button
              size="icon"
              className="rounded-full bg-white text-gray-800 hover:bg-orange-500 hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            <Button size="icon" className="rounded-full bg-white text-gray-800 hover:bg-orange-500 hover:text-white">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Link href={`/product/${product.id}`}>
              <Button size="icon" className="rounded-full bg-white text-gray-800 hover:bg-orange-500 hover:text-white">
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Button>
            </Link>
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
  )
}
