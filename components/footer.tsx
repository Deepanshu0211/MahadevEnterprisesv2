"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer sections
      gsap.from(".footer-column", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=50",
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="footer-column">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 bg-indian-pink rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-white font-bold text-xl">ME</span>
              </div>
              <span className="font-bold text-xl text-white">Mahadev Enterprises</span>
            </div>
            <p className="text-gray-400 mb-6">
              Bringing the vibrant spirit of India to your doorstep with authentic, handcrafted products that celebrate
              our rich cultural heritage.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-indian-pink transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indian-pink transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indian-pink transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indian-pink transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-indian-pink"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-indian-pink transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Customer Service</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-indian-pink"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-indian-pink transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-indian-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-indian-pink"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-indian-pink mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Cultural Street, Artisan District, Mumbai, India 400001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-indian-pink mr-3 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-indian-pink mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@dharmikvadaliya.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Get Directions</h4>
              <div className="bg-gray-800 rounded-md p-2 h-24 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Map Preview</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Dharmik Vadaliya. All rights reserved.</p>
          <p className="mt-2">Designed with ❤️ for authentic Indian craftsmanship.</p>
        </div>
      </div>
    </footer>
  )
}
