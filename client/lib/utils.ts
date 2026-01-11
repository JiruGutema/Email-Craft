import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { logout } from "./user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AuthGuard() {
  // Check localStorage first (faster)
  const localStorageAuth =
    typeof window !== "undefined" ? localStorage.getItem("logged_in") : null;

  if (localStorageAuth) {
    return true;
  }

  // Fallback to cookies if localStorage is missing
  const cookieAuth = getLoggedIn();

  if (cookieAuth && typeof window !== "undefined") {
    // Sync localStorage with cookie state
    localStorage.setItem("logged_in", "true");
    return true;
  }

  return false;
}

export async function HandleLogout() {
  Logger.log("Logging out the user!");
  try {
    await logout();
  } catch (err) {
    console.error("Logout API failed:");
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("logged_in");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  }
}

export function ApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.toString() || "";
}

export function getLocalUser() {
  if (typeof document === "undefined") return null; // SSR / non-browser guard

  function getUserFromCookie() {
    const match = document.cookie.match(/(?:^|;\s*)user=([^;]*)/);
    if (!match) return null;
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch {
      return null;
    }
  }

  return getUserFromCookie();
}

export function getLoggedIn() {
  if (typeof document === "undefined") return false; // SSR / non-browser guard

  function getLoggedInFromCookie() {
    const match = document.cookie.match(/(?:^|;\s*)logged_in=([^;]*)/);

    if (!match) return null;
    try {
      const decoded = decodeURIComponent(match[1]);
      return decoded;
    } catch {
      return null;
    }
  }

  const result = getLoggedInFromCookie();
  return result ? true : false;
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
