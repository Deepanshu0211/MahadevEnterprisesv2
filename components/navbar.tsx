"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { Menu, X, ShoppingCart, Search, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import CartDrawer from "./cart-drawer"
import WishlistDrawer from "./wishlist-drawer"

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const categoryLinks = [
  { name: "All Products", href: "/shop" },
  { name: "Home Decor", href: "/category/home-decor" },
  { name: "Wall Art", href: "/category/wall-art" },
  { name: "Lighting", href: "/category/lighting" },
  { name: "Textiles", href: "/category/textiles" },
  { name: "Furniture", href: "/category/furniture" },
  { name: "Jewelry", href: "/category/jewelry" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navbar animation
  useEffect(() => {
    gsap.from(".nav-item", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    })

    gsap.from(".logo", {
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: "back.out(1.7)",
    })

    gsap.from(".nav-icons", {
      opacity: 0,
      x: 20,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
  }, [])

  // Toggle search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)

    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus()
      }, 100)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="logo flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-indian-pink rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white font-bold text-xl">ME</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-gray-900">Mahadev Enterprises</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-item text-base font-medium transition-colors hover:text-indian-pink ${
                  pathname === link.href ? "text-indian-pink" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative group">
              <button
                className={`nav-item text-base font-medium transition-colors hover:text-indian-pink flex items-center ${
                  pathname.startsWith("/category") ? "text-indian-pink" : "text-gray-700"
                }`}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                Categories
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  isCategoryOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="py-1">
                  {categoryLinks.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indian-pink"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Icons */}
          <div className="nav-icons flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="relative">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsWishlistOpen(true)}>
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indian-pink">
                  {wishlistItems.length}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="relative">
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indian-pink">
                  {cartItems.length}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="relative w-8 h-8 bg-indian-pink rounded-full overflow-hidden flex items-center justify-center">
                        <span className="text-white font-bold text-sm">DV</span>
                      </div>
                      <span className="font-bold text-lg text-gray-900">Dharmik Vadaliya</span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-1 mt-6 flex-1">
                    {mainNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`py-2 px-3 rounded-md text-base font-medium transition-colors hover:bg-gray-100 ${
                          pathname === link.href ? "text-indian-pink" : "text-gray-700"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}

                    <div className="mt-4 mb-2">
                      <h3 className="px-3 text-xs font-semibold uppercase text-gray-500 tracking-wider">Categories</h3>
                    </div>

                    {categoryLinks.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className={`py-2 px-3 rounded-md text-base font-medium transition-colors hover:bg-gray-100 ${
                          pathname === category.href ? "text-indian-pink" : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-4 border-t">
                    <div className="flex flex-col gap-2">
                      <Link href="/account" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100">
                        <User className="h-5 w-5" />
                        <span>My Account</span>
                      </Link>
                      <button
                        className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setIsWishlistOpen(true)
                          document.querySelector('[data-state="open"]')?.setAttribute("data-state", "closed")
                        }}
                      >
                        <Heart className="h-5 w-5" />
                        <span>Wishlist</span>
                        {wishlistItems.length > 0 && (
                          <Badge className="ml-auto bg-indian-pink">{wishlistItems.length}</Badge>
                        )}
                      </button>
                      <button
                        className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setIsCartOpen(true)
                          document.querySelector('[data-state="open"]')?.setAttribute("data-state", "closed")
                        }}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Cart</span>
                        {cartItems.length > 0 && <Badge className="ml-auto bg-indian-pink">{cartItems.length}</Badge>}
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "h-16 opacity-100 mb-2" : "h-0 opacity-0"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="search-input"
              placeholder="Search for products..."
              className="w-full pl-10 pr-10 py-2 border-none bg-gray-100 focus-visible:ring-indian-pink"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={toggleSearch}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

      {/* Wishlist Drawer */}
      <WishlistDrawer isOpen={isWishlistOpen} setIsOpen={setIsWishlistOpen} />
    </header>
  )
}
