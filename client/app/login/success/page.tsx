"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Spinner() {
  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
}

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");
    if (user) {
      localStorage.setItem("user", user);
      console.log(user);
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
