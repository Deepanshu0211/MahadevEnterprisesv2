import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { Toaster } from "@/components/ui/toaster"
import AnnouncementBar from "@/components/announcement-bar"
import AnimationProvider from "@/components/animation-provider"
import AuthProvider from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mahadev Enterprises | Vibrant Indian Handicrafts & Home Decor",
  description: "Discover authentic Indian handicrafts and home decor with a modern shopping experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnimationProvider>
                <div className="flex min-h-screen flex-col">
                  <AnnouncementBar />
                  <Navbar />
                  <div className="flex-1">{children}</div>
                  <Footer />
                  <Toaster />
                </div>
              </AnimationProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
