"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type NavCtx = {
  isLoading: boolean
  setLoading: (v: boolean) => void
}

const NavigationLoadingContext = createContext<NavCtx | undefined>(undefined)

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) {
      const t = setTimeout(() => setIsLoading(false), 150)
      return () => clearTimeout(t)
    }
    return
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element)
      const anchor = target.closest("a") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href) return
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return
      if (anchor.target && anchor.target !== "") return
      try {
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) return
        if (url.pathname === window.location.pathname && url.search === window.location.search) return
      } catch (err) {
        return
      }

      setIsLoading(true)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <NavigationLoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </NavigationLoadingContext.Provider>
  )
}

export function useNavigationLoading() {
  const ctx = useContext(NavigationLoadingContext)
  if (!ctx) throw new Error("useNavigationLoading must be used within NavigationLoadingProvider")
  return ctx
}

export default NavigationLoadingContext
