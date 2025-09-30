'use client'
import DraftsPage from "@/components/draft/drafts"
import { ComposerForm } from "@/components/email/composer-form"
import { ComposerHeader } from "@/components/header/composer-header"
import { ComposerSidebar } from "@/components/sidebar/composer-sidebar"
import Spinner from "@/components/spinner"
import TemplatesPage from "@/components/templates/templates-content"
import { AuthGuard } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Draft() {
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
    return <Spinner />
  }

    return (
    <div className="flex h-screen bg-background text-foreground">
      <ComposerSidebar />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            window.location.href = "/profile"
          }}
        />
        <div className="p-6 overflow-scroll h-[calc(100vh-4rem)]">
          <TemplatesPage />
        </div>
      </div>
    </div>
  )
}