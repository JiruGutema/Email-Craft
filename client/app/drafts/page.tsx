'use client'
import { ComposerHeader } from "@/components/email/composer-header"
import { ComposerSidebar } from "@/components/email/composer-sidebar"
import { AuthGuard } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function DraftPage() {
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
    return <div className="mb-6 flex items-center justify-center">
			<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
		</div>
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
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Draft Title</h2>
            <p className="text-gray-600">This is the content of your draft email.</p>
          </div>
        </div>
      </div>
    </div>
  )
}