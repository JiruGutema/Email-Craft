import { apiFetch } from "./api";
import { EmailData } from "./types";

export async function sendEmail(body: EmailData) {
  return apiFetch("/mail/send", {
    method: "POST",
    body: body,
  });
}

