"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ShoppingBag,
  Calendar,
  ChevronRight,
  Edit,
  Plus,
} from "lucide-react"
import { signOut } from "next-auth/react"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    date: "2023-04-15",
    status: "Delivered",
    total: 2499,
    items: [
      {
        id: 1,
        name: "Handcrafted Brass Lamp",
        price: 1899,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Embroidered Silk Scarf",
        price: 600,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2023-03-22",
    status: "Processing",
    total: 3899,
    items: [
      {
        id: 3,
        name: "Sandalwood Incense Set",
        price: 599,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 4,
        name: "Hand-painted Ceramic Vase",
        price: 1499,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 5,
        name: "Traditional Jute Rug",
        price: 1299,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2023-02-10",
    status: "Delivered",
    total: 1299,
    items: [
      {
        id: 6,
        name: "Handwoven Cotton Saree",
        price: 1299,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

// Sample wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Handcrafted Brass Lamp",
    price: 1899,
    image: "/placeholder.svg?height=100&width=100",
    category: "Home Decor",
  },
  {
    id: 7,
    name: "Copper Water Bottle",
    price: 899,
    image: "/placeholder.svg?height=100&width=100",
    category: "Wellness",
  },
  {
    id: 8,
    name: "Handmade Leather Journal",
    price: 699,
    image: "/placeholder.svg?height=100&width=100",
    category: "Accessories",
  },
]

// Sample address data
const addresses = [
  {
    id: 1,
    name: "Home",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    address: "456 Business Park, Building B",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400051",
    country: "India",
    isDefault: false,
  },
]

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indian-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{session?.user?.name || "User"}</h2>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "overview" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <User className="mr-2 h-5 w-5" />
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "orders" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-5 w-5" />
                Orders
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "wishlist" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "addresses" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "addresses" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "payment" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "payment" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "notifications" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "settings" ? "bg-indian-pink hover:bg-indian-pink/90" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>

              <Separator className="my-2" />

              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="dashboard-stat">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                        <h3 className="text-2xl font-bold mt-1">{orders.length}</h3>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <ShoppingBag className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-stat">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Wishlist Items</p>
                        <h3 className="text-2xl font-bold mt-1">{wishlistItems.length}</h3>
                      </div>
                      <div className="bg-red-100 p-3 rounded-full">
                        <Heart className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-stat">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                        <h3 className="text-2xl font-bold mt-1">Apr 2023</h3>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("orders")}>
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Your most recent purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-md">
                              <Package className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <Badge
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Wishlist</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("wishlist")}>
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Items you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {wishlistItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                          </div>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{session?.user?.name || "User"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{session?.user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Default Shipping Address</p>
                        <p className="font-medium">
                          {addresses.find((addr) => addr.isDefault)?.address || "No default address"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setActiveTab("settings")}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

              {orders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                    <Link href="/shop">
                      <Button className="bg-indian-pink hover:bg-indian-pink/90">Start Shopping</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Order Placed</p>
                            <p className="font-medium">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                          </div>
                          <div>
                            <Badge
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <Button variant="outline">Track Order</Button>
                          <Button variant="outline">View Invoice</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

              {wishlistItems.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save items you like to your wishlist.</p>
                    <Link href="/shop">
                      <Button className="bg-indian-pink hover:bg-indian-pink/90">Explore Products</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                          <Button size="sm" className="bg-indian-pink hover:bg-indian-pink/90">
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Addresses</h1>
                <Button className="bg-indian-pink hover:bg-indian-pink/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <Card key={address.id} className="relative">
                    {address.isDefault && (
                      <Badge className="absolute top-4 right-4 bg-green-100 text-green-800 hover:bg-green-100">
                        Default
                      </Badge>
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-1">{address.name}</h3>
                      <div className="space-y-1 text-gray-600 mb-4">
                        <p>{address.address}</p>
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {!address.isDefault && (
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        )}
                        {!address.isDefault && (
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Delete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Other tabs would be implemented similarly */}
          {(activeTab === "payment" || activeTab === "notifications" || activeTab === "settings") && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">
                {activeTab === "payment" && "Payment Methods"}
                {activeTab === "notifications" && "Notifications"}
                {activeTab === "settings" && "Account Settings"}
              </h1>
              <p className="text-gray-500 mb-6">This section is under development.</p>
              <Button onClick={() => setActiveTab("overview")} className="bg-indian-pink hover:bg-indian-pink/90">
                Back to Overview
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
