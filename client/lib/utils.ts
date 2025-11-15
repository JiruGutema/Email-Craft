import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { logout } from "./user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AuthGuard() {
  const logged_in =
    typeof window !== "undefined" ? localStorage.getItem("logged_in") : null;
  return !!logged_in;
}

export async function HandleLogout() {
 Logger.log('Logging out the user!') 
  try {
    const logged_in = getLoggedIn();
      await logout();
  } catch (err) {
    console.error("Logout API failed:", err);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("logged_in");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  }
}

export function getLoggedIn() {
  const logged_in =
    typeof window !== "undefined" ? localStorage.getItem("logged_in") : "";
  return logged_in;
}

export function ApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.toString() || "";
}

export function getLocalUser(){
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  return  user
}

const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";

export const Logger = {
  log: (...inputs: any[]) => {
    if (isDevelopment) {
      console.log(...inputs);
    }
  },
  error: (...inputs: any[]) => {
    if (isDevelopment) {
      console.error(...inputs);
    }
  },
  warn: (...inputs: any[]) => {
    if (isDevelopment) {
      console.warn(...inputs);
    }
  },
};
