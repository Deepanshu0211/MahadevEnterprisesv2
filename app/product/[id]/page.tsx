"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import RelatedProducts from "@/components/related-products"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

// Sample product data (would come from API in production)
const products = [
  {
    id: "1",
    name: "Handcrafted Brass Lamp",
    price: 89.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Home Decor",
    description:
      "This exquisite handcrafted brass lamp is inspired by traditional Indian designs. Each piece is meticulously crafted by skilled artisans using age-old techniques passed down through generations. The intricate patterns allow light to cast beautiful shadows, creating a warm and inviting atmosphere in any room.",
    features: [
      "Handcrafted by skilled artisans",
      "Made from high-quality brass",
      "Intricate traditional Indian design",
      "Includes electrical fittings",
      "Height: 35cm, Width: 15cm",
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Embroidered Silk Scarf",
    price: 49.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Accessories",
    description:
      "Wrap yourself in luxury with this hand-embroidered silk scarf. Featuring traditional Indian motifs and vibrant colors, this scarf is a testament to the rich textile heritage of India. Each piece is crafted by skilled artisans using pure silk and adorned with intricate embroidery that tells a story of craftsmanship and tradition.",
    features: [
      "100% pure silk",
      "Hand-embroidered traditional motifs",
      "Vibrant, fade-resistant colors",
      "Lightweight and versatile",
      "Dimensions: 180cm x 50cm",
    ],
    stock: 23,
    rating: 4.6,
    reviewCount: 86,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Sandalwood Incense Set",
    price: 24.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Wellness",
    description:
      "Experience the calming aroma of authentic Indian sandalwood with this premium incense set. Handcrafted using traditional methods, these incense sticks are made from pure sandalwood powder sourced from the forests of Mysore. The set includes a beautifully carved wooden holder that complements the natural theme.",
    features: [
      "100% natural ingredients",
      "No synthetic fragrances",
      "Handcrafted using traditional methods",
      "Includes decorative wooden holder",
      "50 incense sticks per package",
    ],
    stock: 42,
    rating: 4.9,
    reviewCount: 157,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Hand-painted Ceramic Vase",
    price: 69.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Home Decor",
    description:
      "Add a touch of Indian artistry to your home with this hand-painted ceramic vase. Each piece is individually crafted and painted by skilled artisans, making every vase unique. The vibrant colors and intricate patterns are inspired by the rich cultural heritage of India, bringing warmth and character to any space.",
    features: [
      "Hand-painted by skilled artisans",
      "High-quality ceramic material",
      "Unique, one-of-a-kind piece",
      "Waterproof interior",
      "Height: 25cm, Diameter: 15cm",
    ],
    stock: 8,
    rating: 4.7,
    reviewCount: 93,
    isNew: false,
    isFeatured: true,
  },
]

// Sample reviews
const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 months ago",
    title: "Absolutely stunning craftsmanship",
    comment:
      "I'm amazed by the quality and attention to detail in this product. The craftsmanship is exceptional, and it looks even better in person than in the photos. Shipping was fast, and the packaging was secure. Highly recommend!",
  },
  {
    id: 2,
    name: "Raj Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 month ago",
    title: "Beautiful addition to my home",
    comment:
      "This piece has become the focal point of my living room. The quality is excellent, and the design is authentic. The only reason for 4 stars instead of 5 is that it was slightly smaller than I expected, but that's on me for not checking the dimensions carefully.",
  },
  {
    id: 3,
    name: "Anita Desai",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "3 weeks ago",
    title: "Perfect gift for my mother",
    comment:
      "I purchased this as a gift for my mother, and she absolutely loves it! The craftsmanship is exceptional, and it arrived beautifully packaged. The customer service was also excellent when I had questions about shipping. Will definitely order from Dharmik Vadaliya again!",
  },
]

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const imageRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)

  // Fetch product data
  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true)
      // In a real app, you would fetch from your API
      // const res = await fetch(`/api/products/${id}`)
      // const data = await res.json()

      // For demo, find product in our sample data
      const foundProduct = products.find((p) => p.id === id)

      setTimeout(() => {
        setProduct(foundProduct || null)
        setLoading(false)
      }, 800)
    }

    fetchProduct()
  }, [id])

  // Animations
  useEffect(() => {
    if (!loading && product) {
      const ctx = gsap.context(() => {
        // Image animation
        gsap.fromTo(imageRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })

        // Details animation
        gsap.fromTo(
          detailsRef.current?.querySelectorAll(".animate-in"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        )
      })

      return () => ctx.revert()
    }
  }, [loading, product])

  // Handle quantity change
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Handle add to cart with animation
  const handleAddToCart = () => {
    if (product) {
      // Add to cart
      addToCart({
        ...product,
        quantity,
        image: product.images[0],
      })

      // Button animation
      const button = document.querySelector(".add-to-cart-button")

      gsap
        .timeline()
        .to(button, { scale: 0.95, duration: 0.1 })
        .to(button, { scale: 1, duration: 0.1 })
        .to(".cart-success", {
          opacity: 1,
          y: 0,
          duration: 0.3,
          onComplete: () => {
            setTimeout(() => {
              gsap.to(".cart-success", { opacity: 0, y: 10, duration: 0.3 })
            }, 2000)
          },
        })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (product) {
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
  }

  // Change image with animation
  const changeImage = (index: number) => {
    if (index === selectedImage) return

    gsap.to(".main-image", {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        setSelectedImage(index)
        gsap.to(".main-image", { opacity: 1, scale: 1, duration: 0.3 })
      },
    })
  }

  // Handle image zoom
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomRef.current) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const handleImageMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleImageMouseLeave = () => {
    setIsZoomed(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-[500px] rounded-lg" />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} className="w-full h-24 rounded-md" />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2 mt-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/shop")} className="bg-indian-pink hover:bg-indian-pink/90">
          Browse Products
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Product Images */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <div
            className="relative bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden mb-4"
            onMouseMove={handleImageMouseMove}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            ref={zoomRef}
          >
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="main-image w-full h-auto object-contain aspect-square transition-opacity duration-300"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-accent text-white text-sm font-medium px-2 py-1 rounded">
                New Arrival
              </div>
            )}

            {/* Image zoom overlay */}
            {isZoomed && (
              <div
                className="absolute inset-0 bg-no-repeat pointer-events-none"
                style={{
                  backgroundImage: `url(${product.images[selectedImage]})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: "200%",
                }}
              ></div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-md overflow-hidden transition-all ${
                  selectedImage === index
                    ? "border-indian-pink ring-2 ring-indian-pink/20"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => changeImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          ref={detailsRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <div className="animate-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < product.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="text-2xl font-bold text-indian-pink mb-6">${product.price.toFixed(2)}</div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          </div>

          <div className="space-y-6">
            <div className="animate-in">
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-in">
              <div className="flex items-center mb-2">
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${
                    product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm">
                  {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-3 py-2 border-r hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    className="px-3 py-2 border-l hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={incrementQuantity}
                    disabled={product.stock <= quantity}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {product.stock > 0 ? `Max: ${product.stock}` : "Out of stock"}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 relative">
                <Button
                  size="lg"
                  className="add-to-cart-button bg-indian-pink hover:bg-indian-pink/90 flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button size="lg" variant="outline" className="flex-1" onClick={handleWishlistToggle}>
                  <Heart
                    className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? "fill-indian-pink text-indian-pink" : ""}`}
                  />
                  {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>

                <div className="cart-success absolute -bottom-10 left-0 right-0 text-center text-green-600 opacity-0 translate-y-10">
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 mr-1" />
                    Added to cart successfully!
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping and returns info */}
            <div className="animate-in pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-indian-pink mr-2" />
                  <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-indian-pink mr-2" />
                  <span className="text-sm">2-year warranty</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 text-indian-pink mr-2" />
                  <span className="text-sm">30-day easy returns</span>
                </div>
              </div>
            </div>

            <div className="animate-in pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indian-pink data-[state=active]:bg-transparent py-3 px-6"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indian-pink data-[state=active]:bg-transparent py-3 px-6"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indian-pink data-[state=active]:bg-transparent py-3 px-6"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p>{product.description}</p>
              <p>
                At Dharmik Vadaliya, we take pride in offering authentic Indian craftsmanship that celebrates our rich
                cultural heritage. Each product is carefully selected to ensure the highest quality and authenticity,
                supporting traditional artisans and their craft.
              </p>
              <h3>Product Details</h3>
              <ul>
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p>
                Due to the handcrafted nature of this product, slight variations in color, pattern, and size may occur,
                making each piece uniquely yours.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < product.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Based on {product.reviewCount} reviews
                    </span>
                  </div>
                </div>

                <Button className="bg-indian-pink hover:bg-indian-pink/90">Write a Review</Button>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>

                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <h5 className="font-medium mb-1">{review.title}</h5>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Shipping Information</h3>
              <p>We ship to most countries worldwide. Shipping times and costs vary depending on your location:</p>
              <ul>
                <li>
                  <strong>India:</strong> 2-4 business days
                </li>
                <li>
                  <strong>United States & Canada:</strong> 7-14 business days
                </li>
                <li>
                  <strong>Europe:</strong> 7-14 business days
                </li>
                <li>
                  <strong>Australia & New Zealand:</strong> 10-18 business days
                </li>
                <li>
                  <strong>Rest of the world:</strong> 14-21 business days
                </li>
              </ul>

              <h3>Return Policy</h3>
              <p>
                We want you to be completely satisfied with your purchase. If for any reason you're not happy with your
                order, you can return it within 30 days of delivery for a full refund or exchange.
              </p>
              <p>
                Please note that items must be returned in their original condition and packaging. Custom or
                personalized items cannot be returned unless they arrive damaged or defective.
              </p>

              <h3>Damaged or Defective Items</h3>
              <p>
                If your item arrives damaged or defective, please contact our customer service team within 48 hours of
                receiving your order. We'll arrange for a replacement or refund as soon as possible.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  )
}
