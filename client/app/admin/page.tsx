"use client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import DraftsPage from "@/components/draft/drafts";
import { ComposerForm } from "@/components/email/composer-form";
import { ComposerHeader } from "@/components/email/composer-header";
import { ComposerSidebar } from "@/components/email/composer-sidebar";
import Spinner from "@/components/spinner";
import { toast } from "@/hooks/use-toast";
import { isAdmin } from "@/lib/auth";
import { AuthGuard, getToken, HandleLogout } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Draft() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = AuthGuard();
    setIsAuthenticated(auth);
    if (!auth) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    async function checkAdmin() {
      const response = await isAdmin(getToken() || "");
      if (response.status === 200) {
        const isAdminResult = await response.json();
        if (isAdminResult === false) {
          window.location.href = "/";
        }
        if (isAdminResult) {
          setIsAdminUser(true);
        }
      }
      if (response.status === 401 || response.status === 403) {
        toast({
          description: "Session expired. Please login again.",
          variant: "destructive",
        });
        if (response.status === 403) {
          toast({
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
        }
        setTimeout(() => {
          HandleLogout();
        }, 3000);
      }
      setAdminChecked(true);
    }
    checkAdmin();
  }, []);

  if (!isAuthenticated || !adminChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            window.location.href = "/profile";
          }}
        />

        <div className="p-6">{/* Add admin page content here */}</div>
      </div>
    </div>
  );
}