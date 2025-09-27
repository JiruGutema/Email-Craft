// lib/api.ts
// Centralized API utility for client-side fetch requests in Next.js

import { ApiBaseUrl } from "./utils";

export interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

// export async function apiFetch(
//   endpoint: string,
//   options: ApiOptions = {}
// ): Promise<Response> {
//   const baseUrl = ApiBaseUrl() || process.env.NEXT_PUBLIC_API_URL || "";
//   const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };
//   if (options.token) {
//     headers['Authorization'] = `Bearer ${options.token}`;
//   }

//   const fetchOptions: RequestInit = {
//     method: options.method || 'GET',
//     headers,
//   };
//   if (options.body) {
//     fetchOptions.body = JSON.stringify(options.body);
//   }

//   const res = await fetch(url, fetchOptions);

//   return res;

// }

export async function apiFetch(
  endpoint: string,
  options: ApiOptions = {}
): Promise<any> {
  const baseUrl = ApiBaseUrl() || process.env.NEXT_PUBLIC_API_URL || "";
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
  };
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      // e.g. 401 Unauthorized, 404 Not Found, etc.
      const errorText = await res.text().catch(() => "");
      throw new Error(
        `API error: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    // parse JSON automatically if API always returns JSON
    return res.json();
  } catch (err) {
    console.error("apiFetch error:", err);
    throw err; // rethrow so caller can decide what to do
  }
}


