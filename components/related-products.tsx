"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ProductCard from "@/components/product-card"

// Sample product data (would come from API in production)
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
  {
    id: 5,
    name: "Traditional Jute Rug",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    isNew: true,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Handwoven Cotton Saree",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    isNew: false,
    isFeatured: true,
  },
]

interface RelatedProductsProps {
  currentProductId: string | number
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Filter related products
  const relatedProducts = products
    .filter((product) => product.id.toString() !== currentProductId.toString() && product.category === category)
    .slice(0, 4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".section-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate product cards
      gsap.from(".related-product", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".related-products-grid",
          start: "top bottom-=50",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef}>
      <h2 className="section-title text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>

      <div className="related-products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="related-product">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
