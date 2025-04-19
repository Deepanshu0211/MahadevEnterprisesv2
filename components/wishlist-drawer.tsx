"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

interface WishlistDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function WishlistDrawer({ isOpen, setIsOpen }: WishlistDrawerProps) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const wishlistRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && wishlistRef.current) {
      // Animate wishlist items when drawer opens
      gsap.fromTo(
        ".wishlist-item",
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
      )
    }
  }, [isOpen, wishlistItems.length])

  const handleAddToCart = (item: any) => {
    addToCart(item)
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center text-xl">
            <Heart className="mr-2 h-5 w-5" />
            Your Wishlist
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div ref={wishlistRef} className="mt-8">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Save your favorite items to your wishlist for later.</p>
              <Button onClick={() => setIsOpen(false)} className="bg-indian-pink hover:bg-indian-pink/90">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="wishlist-item flex items-center gap-4 py-4 border-b border-gray-200">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">₹{item.price.toLocaleString()}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                          Add to Cart
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-2 mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    clearWishlist()
                    toast({
                      title: "Wishlist cleared",
                      description: "All items have been removed from your wishlist.",
                    })
                  }}
                >
                  Clear Wishlist
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
