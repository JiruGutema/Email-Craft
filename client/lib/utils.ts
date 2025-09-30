import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { logout } from "./user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AuthGuard() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return !!token;
}

export async function HandleLogout() {
 Logger.log('Logging out the user!') 
  try {
    const token = getToken();
      await logout(token || '');
  } catch (err) {
    console.error("Logout API failed:", err);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  }
}

export function getToken() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  return token;
}

export function ApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.toString() || "";
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
