"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface CartDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const cartRef = useRef<HTMLDivElement>(null)

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    if (isOpen && cartRef.current) {
      // Animate cart items when drawer opens
      gsap.fromTo(
        ".cart-item",
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
  }, [isOpen, cartItems.length])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center text-xl">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div ref={cartRef} className="mt-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => setIsOpen(false)} className="bg-indian-pink hover:bg-indian-pink/90">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item flex items-center gap-4 py-4 border-b border-gray-200">
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

                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <span>-</span>
                          <span className="sr-only">Decrease quantity</span>
                        </Button>

                        <span className="mx-2 w-8 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <span>+</span>
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between text-base font-medium">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid gap-2 mt-6">
                  <Button size="lg" className="w-full bg-indian-pink hover:bg-indian-pink/90">
                    Checkout
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={() => setIsOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
