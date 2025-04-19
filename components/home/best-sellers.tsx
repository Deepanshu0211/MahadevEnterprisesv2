"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"

// Sample product data
const products = [
  {
    id: 11,
    name: "Rajasthani Puppet Set",
    price: 1499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 12,
    name: "Madhubani Painting",
    price: 2999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    rating: 4.9,
    reviewCount: 86,
  },
  {
    id: 13,
    name: "Brass Diya Set",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    rating: 4.7,
    reviewCount: 157,
  },
]

export default function BestSellers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for product cards
      gsap.from(".bestseller-card", {
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

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our most popular products that customers love</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bestseller-card overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="absolute top-3 left-3 bg-white/90 text-indian-pink text-sm font-medium px-2 py-1 rounded-full">
                    Best Seller
                  </div>

                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <Button
                      size="icon"
                      className="rounded-full bg-white text-gray-800 hover:bg-indian-pink hover:text-white"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                    <Button
                      size="icon"
                      className={`rounded-full bg-white text-gray-800 hover:bg-indian-pink hover:text-white ${
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
                  <div className="font-bold text-lg text-indian-pink mb-2">₹{product.price.toLocaleString()}</div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/shop?filter=best-sellers">
            <Button className="bg-indian-pink hover:bg-indian-pink/90">View All Best Sellers</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
