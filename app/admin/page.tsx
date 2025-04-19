"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  BarChart2,
  Calendar,
  AlertTriangle,
} from "lucide-react"

// Sample data for dashboard
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    date: "2023-04-15",
    amount: 2499,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    customer: "Raj Patel",
    date: "2023-04-14",
    amount: 3899,
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Anita Desai",
    date: "2023-04-13",
    amount: 1299,
    status: "Shipped",
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    date: "2023-04-12",
    amount: 4599,
    status: "Delivered",
  },
  {
    id: "ORD-005",
    customer: "Meera Joshi",
    date: "2023-04-11",
    amount: 899,
    status: "Processing",
  },
]

const topProducts = [
  {
    id: 1,
    name: "Handcrafted Brass Lamp",
    sales: 124,
    revenue: 11160,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Embroidered Silk Scarf",
    sales: 98,
    revenue: 12740,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Madhubani Painting",
    sales: 87,
    revenue: 26100,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Rajasthani Puppet Set",
    sales: 76,
    revenue: 11400,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 5,
    name: "Brass Diya Set",
    sales: 65,
    revenue: 5850,
    image: "/placeholder.svg?height=50&width=50",
  },
]

const lowStockProducts = [
  {
    id: 4,
    name: "Hand-painted Ceramic Vase",
    stock: 3,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 8,
    name: "Handmade Leather Journal",
    stock: 5,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 12,
    name: "Wooden Elephant Figurine",
    stock: 2,
    image: "/placeholder.svg?height=50&width=50",
  },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)

  // Check if user is admin
  useEffect(() => {
    setIsClient(true)

    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/")
    }

    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/admin")
    }
  }, [status, session, router])

  if (status === "loading" || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indian-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== "admin")) {
    return null // Will redirect in useEffect
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm" className="bg-indian-pink hover:bg-indian-pink/90">
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₹2,58,000</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
                    <span className="text-green-500 font-medium">+12.5%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
                <div className="bg-indian-pink/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-indian-pink" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">1,245</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
                    <span className="text-green-500 font-medium">+8.2%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <h3 className="text-2xl font-bold mt-1">845</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
                    <span className="text-green-500 font-medium">+5.8%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">356</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
                    <span className="text-green-500 font-medium">+3.2%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card className="admin-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Orders</h3>
                  <Link href="/admin/orders">
                    <Button variant="ghost" size="sm" className="text-xs flex items-center">
                      View All <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium">Order ID</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Customer</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Amount</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-2 text-sm">{order.id}</td>
                          <td className="py-3 px-2 text-sm">{order.customer}</td>
                          <td className="py-3 px-2 text-sm">{order.date}</td>
                          <td className="py-3 px-2 text-sm">₹{order.amount.toLocaleString()}</td>
                          <td className="py-3 px-2 text-sm">
                            <Badge
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Products */}
            <Card className="admin-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Top Selling Products</h3>
                  <Link href="/admin/products">
                    <Button variant="ghost" size="sm" className="text-xs flex items-center">
                      View All <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium">Product</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Sales</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-2 text-sm">
                            <div className="flex items-center">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-8 h-8 rounded-md object-cover mr-3"
                              />
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-sm">{product.sales}</td>
                          <td className="py-3 px-2 text-sm">₹{product.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Low Stock Alert */}
          <Card className="admin-card border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold">Low Stock Alert</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium">Product</th>
                      <th className="text-left py-3 px-2 text-sm font-medium">Stock</th>
                      <th className="text-left py-3 px-2 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-2 text-sm">
                          <div className="flex items-center">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-8 h-8 rounded-md object-cover mr-3"
                            />
                            <span>{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                            Only {product.stock} left
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          <Button size="sm" variant="outline">
                            Restock
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="admin-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-indian-pink/10 p-4 rounded-full mb-4">
                  <Package className="h-8 w-8 text-indian-pink" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
                <p className="text-gray-500 text-sm mb-4">Add a new product to your inventory</p>
                <Link href="/admin/products/add" className="mt-auto">
                  <Button className="w-full bg-indian-pink hover:bg-indian-pink/90">Add Product</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="admin-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <BarChart2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sales Report</h3>
                <p className="text-gray-500 text-sm mb-4">Generate and download sales reports</p>
                <Button variant="outline" className="w-full mt-auto">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="admin-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Schedule Sale</h3>
                <p className="text-gray-500 text-sm mb-4">Plan and schedule your next sale event</p>
                <Button variant="outline" className="w-full mt-auto">
                  Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
              <p className="text-gray-500 mb-6">This section is under development.</p>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <p className="text-gray-400">Sales chart will be displayed here</p>
              </div>
              <Button onClick={() => setActiveTab("overview")} className="bg-indian-pink hover:bg-indian-pink/90">
                Back to Overview
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Product Management</h3>
              <p className="text-gray-500 mb-6">Manage your product inventory.</p>
              <div className="flex justify-center gap-4">
                <Link href="/admin/products">
                  <Button className="bg-indian-pink hover:bg-indian-pink/90">View All Products</Button>
                </Link>
                <Link href="/admin/products/add">
                  <Button variant="outline">Add New Product</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Customer Management</h3>
              <p className="text-gray-500 mb-6">This section is under development.</p>
              <Button onClick={() => setActiveTab("overview")} className="bg-indian-pink hover:bg-indian-pink/90">
                Back to Overview
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
