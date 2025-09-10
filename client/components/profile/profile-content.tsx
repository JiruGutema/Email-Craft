"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, LogOut, LogOutIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import type { ProfileData } from "@/lib/types"
import { useEffect } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import {getToken, HandleLogout, Logger } from "@/lib/utils"
import { deleteMe, getUserProfile } from "@/lib/user"
import { set } from "react-hook-form"
import { toast } from "../ui/use-toast"
import { Description } from "@radix-ui/react-toast"
import { getDrafts } from "@/lib/drafts"

export function ProfileContent() {


  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    username: "",
    profile: "",
    id: ""
  })
  const [draftsCount, setDraftsCount] = useState(0);
  const [templatesCount, setTemplatesCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile(getToken() || "");

        if(res.status === 401){
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          toast({ description: "Session expired. Please log in again.", variant: "destructive" });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
        if (!res.ok) {
          Logger.error("Failed to fetch user:", res.status, res.statusText);
          toast({ description: "Failed to fetch user data. Please try again later.", variant: "destructive" });
          return;
        }
        const user = await res.json();
        setProfileData({
          name: user?.name ?? user?.username ?? "",
          email: user?.email || "",
          username: user?.username || "",
          profile: user?.picture || "",
          id: user?.id || ""
        });
      } catch (error) {
        Logger.error("Error fetching user:", error);
      }
    };
    const fetchDraftsCount = async () => {
      const drafts = await getDrafts(getToken() || "");
      const draftsData = await drafts.json();
      setDraftsCount(draftsData.length);
    };
    fetchUser();
    fetchDraftsCount();
  }, []);

  const handleSave = () => {
    setIsEditing(false)
    Logger.log("Profile saved:", profileData)
  }


  // Delete Account Dialog State
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const res = await deleteMe(getToken() || '');
      Logger.log(await res.json());
      if(res.ok){
            localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast({ description: "User account deleted successfully.", variant: "default" });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000); 
      }
      if(res.status === 401){
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast({ description: "Session expired. Please log in again.", variant: "destructive" });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      if(res.status === 403){
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast({ description: "Session expired. Please log in again.", variant: "destructive" });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      if (res.status === 404) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast({ description: "Session expired. Please log in again.", variant: "destructive" });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      
      if (!res.ok) {
        Logger.error("Failed to delete account:", res.status, res.statusText)
        toast({ description: "Failed to delete account. Please try again.", variant: "destructive" })
        setIsDeleting(false)
        return
      }


      // Success: log out and redirect
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      toast({ description: "Account deleted successfully.", variant: "default" })
      setTimeout(() => {
        window.location.href = "/"
      }, 3000);
    } catch (error) {
      Logger.error("Error deleting account:", error)
      toast({ description: "An error occurred. Please try again.", variant: "destructive" })
      setIsDeleting(false)
    }
    setShowDeleteDialog(false)
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-background border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={profileData?.profile || '/default-profile.png'}
                alt={profileData.name[0]}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground-900">{profileData.name}</h3>
              <p className="text-foreground-600">{profileData.email}</p>
              <p className="text-sm text-foreground-500 mt-1">{profileData.username}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
              <Edit className="h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">Company</label>
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
        <div className="bg-background border rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-foreground-900 mb-4">Email Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div onClick={()=>{window.location.href = "/drafts"}
              } className="text-center">
              <div className="text-2xl font-bold hover:cursor-pointer text-green-600">{draftsCount}</div>
              <div  className="text-sm text-gray-600">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-background border rounded-lg p-6">
          <h4 className="font-semibold text-foreground-900 mb-4">Account Actions</h4>
          <div className="flex flex-row justify-between">
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-60 justify-start mt-0 text-foreground hover:text-background border-red-500 hover:bg-foreground bg-transparent"
                >
                  <LogOutIcon className="h-4 w-4" />
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to log out?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isLoggingOut}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={HandleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Logging out..." : "Yes, log me out"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-60 justify-start mt-0 text-red-600 border-red-500 hover:bg-red-500 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and all associated data.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isDeleting}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Yes, delete my account"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
