"use client"
import { ArrowLeft, User, Settings } from "lucide-react"
import { NavItem } from "@/components/nav-item"

interface ProfileSidebarProps {
  onBack: () => void
}

export function ProfileSidebar({ onBack }: ProfileSidebarProps) {
  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Profile Settings</h1>
      </div>

      <nav className="space-y-1 px-2 flex-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 w-full text-left"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Composer</span>
        </button>
        <NavItem href="/profile" icon={<User className="h-4 w-4" />} active>
          Profile
        </NavItem>
        <NavItem href="/settings" icon={<Settings className="h-4 w-4" />}>
          Settings
        </NavItem>
      </nav>
    </div>
  )
}
