"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ComposerSidebar } from "@/components/email/composer-sidebar"
import { ComposerHeader } from "@/components/email/composer-header"
import { ComposerForm } from "@/components/email/composer-form"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ProfileContent } from "@/components/profile/profile-content"
import type { ViewType } from "@/lib/types"

export default function Home() {
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

  if (!isAuthenticated) {
    if (currentView === "signup") {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setCurrentView("login")} />
          </div>
        </div>
      )
    }
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView("signup")} />
        </div>
      </div>
    )
  }

  if (currentView === "profile") {
    return (
      <div className="flex h-screen bg-white">
        <ProfileSidebar onBack={() => setCurrentView("composer")} />

        <div className="flex-1">
          <ComposerHeader onProfileClick={() => setCurrentView("profile")} onBack={() => setCurrentView("composer")} />

          <ProfileContent />
        </div>
      </div>
    )
  }
  

  return (
    <div className="flex h-screen bg-white">
      <ComposerSidebar />

      <div className="flex-1">
        <ComposerHeader onProfileClick={() => setCurrentView("profile")} />

        <div className="p-6">
          <ComposerForm />
        </div>
      </div>
    </div>
  )
}
