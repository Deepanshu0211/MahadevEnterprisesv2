"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Filter, Search, X } from "lucide-react"
import ProductCard from "@/components/product-card"

// Sample product data (would come from API in production)
const sampleProducts = [
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
  {
    id: 7,
    name: "Copper Water Bottle",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wellness",
    isNew: false,
    isFeatured: false,
  },
  {
    id: 8,
    name: "Handmade Leather Journal",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: true,
    isFeatured: false,
  },
]

const categories = ["Home Decor", "Accessories", "Wellness", "Clothing", "Jewelry", "Art"]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(sampleProducts)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Get filter values from URL
  const categoryParam = searchParams.get("category")
  const sortParam = searchParams.get("sort") || "featured"
  const searchParam = searchParams.get("search") || ""

  // Set initial filter states from URL
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? categoryParam.split(",") : [])
  const [sortBy, setSortBy] = useState(sortParam)

  // Initialize search query from URL
  useEffect(() => {
    setSearchQuery(searchParam)
  }, [searchParam])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...sampleProducts]

    // Filter by category
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        // In a real app, you'd sort by date
        filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id)
        break
      case "price-low":
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
        break
      case "featured":
      default:
        filteredProducts = [...filteredProducts].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    setProducts(filteredProducts)
  }, [selectedCategories, sortBy, searchQuery])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    }

    if (sortBy !== "featured") {
      params.set("sort", sortBy)
    }

    if (searchQuery) {
      params.set("search", searchQuery)
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : "/shop")
  }, [selectedCategories, sortBy, searchQuery, router])

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
    setSortBy("featured")
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Shop</h1>
          <Button variant="outline" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Sidebar filters - desktop */}
        <div className={`w-full md:w-64 space-y-6 ${mobileFiltersOpen ? "block" : "hidden md:block"}`}>
          <div className="flex items-center justify-between md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:block">
            <h1 className="text-2xl font-bold mb-6">Shop</h1>
          </div>

          <div>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-price">Min</Label>
                      <Input id="min-price" type="number" placeholder="0" min="0" />
                    </div>
                    <div>
                      <Label htmlFor="max-price">Max</Label>
                      <Input id="max-price" type="number" placeholder="1000" min="0" />
                    </div>
                  </div>
                  <Button className="w-full">Apply</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <h3 className="text-sm font-medium mb-2">Sort By</h3>
            <div className="space-y-1">
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`sort-${option.value}`}
                    name="sort"
                    className="mr-2"
                    checked={sortBy === option.value}
                    onChange={() => handleSortChange(option.value)}
                  />
                  <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {(selectedCategories.length > 0 || sortBy !== "featured" || searchQuery) && (
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-500">Showing {products.length} products</p>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Sort:</span>
                <select
                  className="text-sm border rounded-md px-2 py-1"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-60 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
