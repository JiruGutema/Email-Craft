// lib/api.ts
// Centralized API utility for client-side fetch requests in Next.js

import { ApiBaseUrl, Logger } from "./utils";

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
