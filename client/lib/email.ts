import { apiFetch } from "./api";
import { EmailData } from "./types";

export async function sendEmail(body: EmailData, token: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: body,
    token: token,
  });
}

