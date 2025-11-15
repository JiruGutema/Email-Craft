import { apiFetch } from "./api";
import { DraftData, EmailData } from "./types";

export async function saveDraft(body: DraftData) {
  return apiFetch("/drafts", {
    method: "POST",
    body: body,
  });
}

export async function getDrafts() {
  return apiFetch("/drafts", {
    method: "GET",
  });
}

export async function deleteDraft(id: string) {
  return apiFetch(`/drafts/${id}`, {
    method: "DELETE",
  });
}

export async function updateDraft(id: string, body: DraftData) {
  return apiFetch(`/drafts/${id}`, {
    method: "PUT",
    body: body,
  });
}

export async function getDraft(id: string) {
  return apiFetch(`/drafts/${id}`, {
    method: "GET",
  });
}