"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Safe: only runs in the browser
    function getLocalUser() {
      const match = document.cookie.match(/(?:^|;\s*)user=([^;]*)/);
      if (!match) return null;
      try {
        return JSON.parse(decodeURIComponent(match[1]));
      } catch {
        return null;
      }
    }

    function getLoggedIn() {
      const match = document.cookie.match(/(?:^|;\s*)logged_in=([^;]*)/);
      return !!match;
    }

    const user = getLocalUser();
    const logged_in = getLoggedIn();
    const idx_cache = localStorage.getItem("idx_cache");

    if (user && String(idx_cache) !== String(user.id)) {
      localStorage.removeItem("composerFormCache");
    }

    if (user) {
      localStorage.setItem("idx_cache", user.id);
    }

    if (logged_in) {
      localStorage.setItem("logged_in", "true");
    }

    router.replace("/composer");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
      <h1 className="text-2xl font-bold mb-4 animate-pulse">
        Logging you in...
      </h1>
      <p className="text-center text-blue-700">
        If you are not redirected, <a href="/">click here</a>.
      </p>
    </div>
  );
}
