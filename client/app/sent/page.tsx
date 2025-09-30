'use client'
import { ComposerHeader } from "@/components/header/composer-header"
import { ComposerSidebar } from "@/components/sidebar/composer-sidebar"
import Spinner from "@/components/spinner"
import { AuthGuard } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Sent() {
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
    return <Spinner />;
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
            <h2 className="text-lg font-bold mb-2">Sent Emails</h2>
            <p className="text-gray-600">This is the list of your sent emails.</p>
          </div>
        </div>
      </div>
    </div>
  )
}