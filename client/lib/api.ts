// lib/api.ts
// Centralized API utility for client-side fetch requests in Next.js

import { ApiBaseUrl } from "./utils";

export interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export async function apiFetch(
  endpoint: string,
  options: ApiOptions = {}
): Promise<Response> {
  const baseUrl = ApiBaseUrl() || process.env.NEXT_PUBLIC_API_URL || "";
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers,
  };
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOptions);
  return res;

}

// Example usage:
//
// import { apiFetch } from "@/lib/api";
//
// async function getUserProfile() {
//   const token = localStorage.getItem("token");
//   const data = await apiFetch("/auth/me", {
//     method: "GET",
//     token,
//   });
//   return data;
// }
//
// async function sendEmail(emailData) {
//   const token = localStorage.getItem("token");
//   const data = await apiFetch("/mail/send", {
//     method: "POST",
//     token,
//     body: emailData,
//   });
//   return data;
// }
//
// async function getWithCustomHeaders() {
//   const data = await apiFetch("/some-endpoint", {
//     method: "GET",
//     headers: {
//       "X-Custom-Header": "value",
//     },
//   });
//   return data;
// }
