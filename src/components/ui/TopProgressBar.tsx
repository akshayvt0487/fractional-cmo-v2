"use client"

import React from "react"
import { useNavigationLoading } from "@/contexts/NavigationLoadingContext"

export function TopProgressBar() {
  const { isLoading } = useNavigationLoading()

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-x-0 top-0 z-[9999] transition-opacity duration-200 ${isLoading ? "opacity-100" : "opacity-0"}`}>
      <div className="h-1 bg-transparent">
        <div
          style={{
            transition: "width 300ms linear",
            width: isLoading ? "70%" : "100%",
          }}
          className={`h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400`}
        />
      </div>
    </div>
  )
}

export default TopProgressBar
