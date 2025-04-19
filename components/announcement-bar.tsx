"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const announcements = [
  "FREE SHIPPING ON ORDERS ABOVE ₹800",
  "USE CODE 'WELCOME10' FOR 10% OFF YOUR FIRST ORDER",
  "NEW COLLECTION LAUNCH: TRADITIONAL INDIAN HANDICRAFTS",
]

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + announcements.length) % announcements.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
  }

  return (
    <div className="announcement-bar text-white py-2 relative">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <button
          onClick={goToPrevious}
          className="absolute left-4 text-white/80 hover:text-white transition-colors"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="text-center text-sm font-medium tracking-wide">{announcements[currentIndex]}</div>

        <button
          onClick={goToNext}
          className="absolute right-4 text-white/80 hover:text-white transition-colors"
          aria-label="Next announcement"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
