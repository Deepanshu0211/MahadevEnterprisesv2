"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      subItems: [
        { name: "All Products", href: "/admin/products" },
        { name: "Add Product", href: "/admin/products/add" },
        { name: "Categories", href: "/admin/products/categories" },
      ],
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      subItems: [
        { name: "All Orders", href: "/admin/orders" },
        { name: "Pending", href: "/admin/orders/pending" },
        { name: "Completed", href: "/admin/orders/completed" },
      ],
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart2,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" className="bg-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed top-0 left-0 z-40 h-screen w-64 transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indian-pink rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-white font-semibold">Admin Panel</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => (
                <li key={link.name}>
                  {link.subItems ? (
                    <div>
                      <button
                        className={`admin-sidebar-link flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          pathname.startsWith(link.href) ? "active" : "hover:bg-gray-800 hover:text-white"
                        }`}
                        onClick={() => {
                          if (link.name === "Products") {
                            setIsProductsOpen(!isProductsOpen)
                          } else if (link.name === "Orders") {
                            setIsOrdersOpen(!isOrdersOpen)
                          }
                        }}
                      >
                        <link.icon className="h-5 w-5 mr-3" />
                        <span>{link.name}</span>
                        {link.name === "Products" ? (
                          <ChevronDown
                            className={`ml-auto h-4 w-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                          />
                        ) : link.name === "Orders" ? (
                          <ChevronDown
                            className={`ml-auto h-4 w-4 transition-transform ${isOrdersOpen ? "rotate-180" : ""}`}
                          />
                        ) : null}
                      </button>
                      {link.name === "Products" && isProductsOpen && (
                        <ul className="mt-1 space-y-1 pl-10">
                          {link.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={`admin-sidebar-link block px-3 py-2 text-sm rounded-md transition-colors ${
                                  pathname === subItem.href ? "active" : "hover:bg-gray-800 hover:text-white"
                                }`}
                                onClick={() => setIsSidebarOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {link.name === "Orders" && isOrdersOpen && (
                        <ul className="mt-1 space-y-1 pl-10">
                          {link.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={`admin-sidebar-link block px-3 py-2 text-sm rounded-md transition-colors ${
                                  pathname === subItem.href ? "active" : "hover:bg-gray-800 hover:text-white"
                                }`}
                                onClick={() => setIsSidebarOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`admin-sidebar-link flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        pathname === link.href ? "active" : "hover:bg-gray-800 hover:text-white"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <link.icon className="h-5 w-5 mr-3" />
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-800">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:ml-64 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
