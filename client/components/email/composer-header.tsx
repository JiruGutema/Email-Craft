"use client";

import { Button } from "@/components/ui/button";
import { HandleLogout } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { Bell, ArrowLeft, MoonStar, LogOut, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { useState } from "react";

interface ComposerHeaderProps {
  onProfileClick: () => void;
  onBack?: () => void;
}
export function ComposerHeader({
  onProfileClick,
  onBack,
}: ComposerHeaderProps) {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  return (
    <header className="flex items-center justify-between border-b w-full px-4 sm:px-6 py-4">
      <div></div>
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
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-30 justify-start mt-0 text-foreground hover:text-background border-red-500 hover:bg-foreground bg-transparent"
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </Button>
          </DialogTrigger>

          <DialogOverlay className="fixed z-20 inset-0 bg-black/50" />

          <DialogContent className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-foreground p-6 shadow-lg text-background">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="text-foreground" disabled={isLoggingOut}>
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
      </div>
    </header>
  );
}
