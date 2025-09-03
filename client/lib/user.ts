import { apiFetch } from "./api";

export async function loginUser(email: string, password: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function getUserProfile(token: string): Promise<Response> {
  return apiFetch("/auth/me", {
    method: "GET",
    token: token,
  });
}

export async function deleteMe(token:string): Promise<Response> {
   return apiFetch("/auth/delete", {
     method: "DELETE",
     token: token,
   });
}

// Usage example elsewhere:
// const response = await loginUser("user@example.com", "password123");
// if (response.token) { localStorage.setItem("token", response.token); }
