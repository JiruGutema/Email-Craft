'use client'
import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ComposerHeader } from "@/components/email/composer-header"
import { ProfileContent } from "@/components/profile/profile-content"
import { AuthGuard } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/spinner"

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
    <div className="flex h-screen bg-white">
      <ProfileSidebar
        onBack={() => {
          window.location.href = "/composer"
        }}
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
