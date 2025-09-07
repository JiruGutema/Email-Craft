import { apiFetch } from "./api";
import { DraftData, EmailData, TemplateData } from "./types";

export async function getTemplates() {
  return apiFetch("/templates", {
    method: "GET",
  });
}

export async function createTemplate(data: TemplateData, token: string) {
  return apiFetch(`/templates`, {
    method: "POST",
    body: data,
    token: token,
  });
}

export async function updateTemplate(id: string, body: TemplateData, token: string) {
  return apiFetch(`/templates/${id}`, {
    method: "PUT",
    body: body,
    token: token,
  });
}

export async function deleteTemplate(id: string, token: string) {
  return apiFetch(`/templates/${id}`, {
    method: "DELETE",
    token: token,
  });
}