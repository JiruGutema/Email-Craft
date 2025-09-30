'use client'
import { ComposerHeader } from "@/components/header/composer-header"
import { ProfileContent } from "@/components/profile/profile-content"
import { AuthGuard } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/spinner"
import { ComposerSidebar } from "@/components/sidebar/composer-sidebar"

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = AuthGuard()
    setIsAuthenticated(auth)
    if (!auth) {
      router.replace("/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return (
    <Spinner /> 
    )
  }
  return (
    <div className="flex h-screen bg-background text-foreground">
      <ComposerSidebar
      />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            // Already on profile page
          }}
          onBack={() => {
            window.location.href = "/composer"
          }}
        />

        <ProfileContent />
      </div>
    </div>
  )
}
