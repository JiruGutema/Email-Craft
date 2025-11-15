import { apiFetch } from "./api";

export async function loginUser(email: string, password: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function getUserProfile(): Promise<Response> {
  return apiFetch("/auth/me", {
    method: "GET",
  });
}

export async function deleteMe(): Promise<Response> {
   return apiFetch("/auth/delete", {
     method: "DELETE",
   });
}

export async function logout(): Promise<Response> {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}

// Usage example elsewhere:
// const response = await loginUser("user@example.com", "password123");
// if (response.token) { localStorage.setItem("token", response.token); }
