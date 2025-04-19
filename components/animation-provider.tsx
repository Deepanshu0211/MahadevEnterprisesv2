"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

interface AnimationProviderProps {
  children: React.ReactNode
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current) {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

      // Initialize smooth scrolling
      const smoothScroll = () => {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: window.location.hash, offsetY: 80 },
          ease: "power3.inOut",
        })
      }

      // Set up reveal animations for elements with .gsap-reveal class
      const setupRevealAnimations = () => {
        const revealElements = document.querySelectorAll(".gsap-reveal")

        revealElements.forEach((element) => {
          gsap.set(element, { autoAlpha: 0, y: 50 })

          ScrollTrigger.create({
            trigger: element as Element,
            start: "top bottom-=100",
            onEnter: () => {
              gsap.to(element, {
                duration: 0.8,
                autoAlpha: 1,
                y: 0,
                ease: "power3.out",
                overwrite: "auto",
              })
            },
            once: true,
          })
        })
      }

      // Initialize animations
      setupRevealAnimations()

      // Handle hash links for smooth scrolling
      if (window.location.hash) {
        setTimeout(smoothScroll, 300)
      }

      // Add event listener for hash changes
      window.addEventListener("hashchange", smoothScroll)

      // Set initialization flag
      isInitialized.current = true

      // Cleanup
      return () => {
        window.removeEventListener("hashchange", smoothScroll)
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return <>{children}</>
}
