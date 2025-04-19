"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ShoppingCartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const { toast } = useToast()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax - discount

  // Apply coupon code
  const applyCoupon = () => {
    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      if (couponCode.toLowerCase() === "welcome10") {
        const discountAmount = subtotal * 0.1
        setDiscount(discountAmount)
        toast({
          title: "Coupon applied",
          description: "10% discount has been applied to your order.",
        })
      } else {
        toast({
          title: "Invalid coupon",
          description: "The coupon code you entered is invalid or expired.",
          variant: "destructive",
        })
      }
      setIsApplyingCoupon(false)
    }, 1000)
  }

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  // Handle remove item
  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/shop">
            <Button className="bg-indian-pink hover:bg-indian-pink/90">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Items ({cartItems.length})</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => {
                    clearCart()
                    toast({
                      title: "Cart cleared",
                      description: "All items have been removed from your cart.",
                    })
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="cart-item border-b last:border-b-0"
                >
                  <div className="p-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <Link href={`/product/${item.id}`}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </Link>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-semibold text-lg hover:text-indian-pink transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          {item.category && <p className="text-sm text-gray-500">{item.category}</p>}
                        </div>

                        <div className="mt-2 sm:mt-0 text-right">
                          <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 font-medium">{item.quantity}</span>
                          <button
                            className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <Separator className="my-3" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <Button variant="outline" onClick={applyCoupon} disabled={isApplyingCoupon || !couponCode}>
                  {isApplyingCoupon ? "Applying..." : "Apply"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Try "WELCOME10" for 10% off your first order</p>
            </div>

            <Button className="w-full bg-indian-pink hover:bg-indian-pink/90 mb-3">
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </Button>

            <Link href="/shop">
              <Button variant="outline" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
