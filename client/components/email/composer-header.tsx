"use client"

import { Button } from "@/components/ui/button"
import { Bell, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface ComposerHeaderProps {
  onProfileClick: () => void
  onBack?: () => void
}
export function ComposerHeader({ onProfileClick, onBack }: ComposerHeaderProps) {
  const user  = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-lg font-semibold">New Email</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <button
          onClick={onProfileClick}
          className="h-8 w-8 overflow-hidden rounded-full hover:ring-2 hover:ring-gray-200 transition-all"
        >
          <Image
            src={user?.picture || "/default-profile.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </header>
  )
}
