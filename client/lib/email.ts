import { apiFetch } from "./api";
import { EmailData } from "./types";

export async function sendEmail(body: EmailData, token: string) {
  return apiFetch("/mail/send", {
    method: "POST",
    body: body,
    token: token,
  });
}

