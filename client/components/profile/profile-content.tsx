"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, LogOut, Trash2 } from "lucide-react"
import Image from "next/image"
import type { ProfileData } from "@/lib/types"

export function ProfileContent() {

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name,
    email:user.email, 
    username: user?.username,
    profile: user?.picture,
    id: user?.id
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
    console.log("Profile saved:", profileData)
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Handle account deletion
      console.log("Deleting account...")
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={profileData?.profile || '/default-profile.png'}
                alt="Profile Picture"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
              <p className="text-gray-600">{profileData.email}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.username}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
              <Edit className="h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <Input
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                />
              </div>
    
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* <p className="text-gray-700">{profileData.profile}</p> */}
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Email Statistics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">127</div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Account Actions</h4>
          <div className="flex flex-row justify-between">
            <Button variant="outline" onClick={handleLogout} className="min-w-60  border-black justify-start gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="w-60 justify-start mt-0 text-red-600 border-red-500 hover:bg-red-500 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
