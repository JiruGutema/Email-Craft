"use client"

import { useState } from "react"
import type { ViewType } from "@/lib/types"

export function useAuth() {
  const [currentView, setCurrentView] = useState<ViewType>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentView("composer")
  }

  const handleSignup = () => {
    setIsAuthenticated(true)
    setCurrentView("composer")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView("login")
  }

  const navigateTo = (view: ViewType) => {
    setCurrentView(view)
  }

  return {
    currentView,
    isAuthenticated,
    handleLogin,
    handleSignup,
    handleLogout,
    navigateTo,
  }
}
