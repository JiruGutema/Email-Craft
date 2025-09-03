import { apiFetch } from "./api";
import { DraftData, EmailData } from "./types";

export async function saveDraft(body: DraftData, token: string) {
  return apiFetch("/drafts", {
    method: "POST",
    body: body,
    token: token,
  });
}

export async function getDrafts(token: string) {
  return apiFetch("/drafts", {
    method: "GET",
    token: token,
  });
}

export async function deleteDraft(id: string, token: string) {
  return apiFetch(`/drafts/${id}`, {
    method: "DELETE",
    token: token,
  });
}

export async function updateDraft(id: string, body: DraftData, token: string) {
  return apiFetch(`/drafts/${id}`, {
    method: "PUT",
    body: body,
    token: token,
  });
}