"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Please try again or contact our support team if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="flex items-center bg-indian-pink hover:bg-indian-pink/90">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go to Homepage
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/contact")}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
