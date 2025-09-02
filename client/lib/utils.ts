import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function AuthGuard(){
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return !!token;
}
export function HandleLogout(){
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
}