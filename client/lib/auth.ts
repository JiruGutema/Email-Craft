import { apiFetch } from "@/lib/api";

export async function isAdmin(token: string): Promise<Response> {
  return apiFetch("/auth/is-admin", {
    method: "GET",
  });
}
export async function isSuperAdmin(token: string): Promise<Response> {
  return apiFetch("/auth/is-super-admin", {
    method: "GET",
  });
}


