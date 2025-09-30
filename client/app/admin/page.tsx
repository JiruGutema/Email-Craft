"use client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ComposerHeader } from "@/components/email/composer-header";
import Spinner from "@/components/spinner";
import { toast } from "@/hooks/use-toast";
import { isAdmin } from "@/lib/auth";
import { AuthGuard, getToken, HandleLogout, Logger } from "@/lib/utils";
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
  const checkAdmin = async () => {
    try {
      const response = await isAdmin(getToken() || "");
      const data = await response.json().catch(() => null);

      if (response.status === 200) {
        // data expected to be true/false
        if (!data) {
          toast({
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
          window.location.href = "/";
          return;
        }
        setIsAdminUser(true);
      } else if ([401, 403].includes(response.status)) {
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
      } else {
        Logger.error("Unexpected admin check response:", response.status, response.statusText, data);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      Logger.error("Error checking admin:", error);
        window.location.href = "/";
    } finally {
      setAdminChecked(true);
    }
  };

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