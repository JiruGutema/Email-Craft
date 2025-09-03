import { apiFetch } from "./api";

export async function subscribe(email: string ) {
  return apiFetch("/subscription/subscribe", {
    method: "POST",
    body: {email}
  });
}
    