import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 text-indian-pink animate-spin" />
      <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  )
}
