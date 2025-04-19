"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category?: string
  isNew?: boolean
  isFeatured?: boolean
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (product: any) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
})

export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product: any) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex > -1) {
        // Item already exists, don't add it again
        return prevItems
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...product }]
      }
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
