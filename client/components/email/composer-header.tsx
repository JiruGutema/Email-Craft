"use client"

import { Button } from "@/components/ui/button"
import { Bell, ArrowLeft, MoonStar } from "lucide-react"
import Image from "next/image"

interface ComposerHeaderProps {
  onProfileClick: () => void
  onBack?: () => void
}
export function ComposerHeader({ onProfileClick, onBack }: ComposerHeaderProps) {
  const user  = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  return (
    <header className="flex items-center justify-between border-b w-full px-4 sm:px-6 py-4">
      <div className="flex items-center gap-4 min-w-[40px]">
       {/*  {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />

          </Button>

        )} */}
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> Mail Craft
        </div>
        {/* Theme toggle button */}
     
      </div>
      <div className="flex items-center gap-4">
   <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => {
            if (typeof window !== "undefined") {
              document.documentElement.classList.toggle("dark");
            }
          }}
        >
          <MoonStar className="h-4 w-4" />
        </Button>
     
        <button
          onClick={onProfileClick}
          className="h-8 w-8 overflow-hidden ring rounded-full hover:ring-2 hover:ring-gray-200 transition-all relative bg-gray-100"
        >
          {user?.picture ? (
            <Image
              src={user.picture}
              alt={user.name[0]}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="absolute bg-red-500 inset-0 flex items-center justify-center text-lg font-semibold text-foreground-50">
              {user?.name ? user.name[0] : "?"}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
