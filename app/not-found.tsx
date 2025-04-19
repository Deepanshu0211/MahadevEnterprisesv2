"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="not-found-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="not-found-code">404</div>
        <div className="not-found-message">Page Not Found</div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-600 mb-8"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button variant="outline" className="flex items-center gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Link href="/">
            <Button className="flex items-center gap-2 bg-indian-pink hover:bg-indian-pink/90">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/shop">
            <Button variant="outline" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
