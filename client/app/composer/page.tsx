'use client'
import { ComposerSidebar } from "@/components/email/composer-sidebar"
import { ComposerHeader } from "@/components/email/composer-header"
import { ComposerForm } from "@/components/email/composer-form"
import { useEffect, useState } from "react"
import { AuthGuard } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Spinner from "@/components/spinner"

export default function ComposerPage() {
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
      <ComposerSidebar />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            window.location.href = "/profile"
          }}
        />

        <div className="p-6">
          <ComposerForm />
        </div>
      </div>
    </div>
  )
}
