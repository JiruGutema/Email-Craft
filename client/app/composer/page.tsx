"use client";
import { ComposerSidebar } from "@/components/sidebar/composer-sidebar";
import { ComposerHeader } from "@/components/header/composer-header";
import { ComposerForm } from "@/components/email/composer-form";
import { useEffect, useState } from "react";
import { AuthGuard } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function ComposerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = AuthGuard();
    setIsAuthenticated(auth);
    if (!auth) {
      router.replace("/login");
    } else {
    }
  }, [router]);

  if (!isAuthenticated) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <ComposerSidebar />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            router.push("/profile");
          }}
        />

        <div className="p-6">
          <ComposerForm />
        </div>
      </div>
    </div>
  );
}
