"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";



export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");
    const idx_cache = localStorage.getItem("idx_cache");

    if (
      user &&
      String(idx_cache) !== String(JSON.parse(user).id)
    ) {
      localStorage.removeItem("composerFormCache");
    }
    
    if (user) {
      localStorage.setItem("user", user);
      localStorage.setItem("idx_cache", JSON.parse(user).id);
    }
    if (token) {
      localStorage.setItem("token", token);
      router.replace("/composer");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
      <h1 className="text-2xl font-bold mb-4 animate-pulse">
        Logging you in...
      </h1>
      <p>
        If you are not redirected, <a href="/">click here</a>.
      </p>
    </div>
  );
}
