import { apiFetch } from "./api";
import { DraftData, EmailData, TemplateData } from "./types";
import { Logger } from "./utils";

export async function getTemplates() {
  return await apiFetch("/templates", {
    method: "GET",
  });
}

export async function createTemplate(data: TemplateData) {
  return apiFetch(`/templates`, {
    method: "POST",
    body: data,
  });
}

export async function updateTemplate(
  id: string,
  body: TemplateData,
  token: string
) {
  return apiFetch(`/templates/${id}`, {
    method: "PUT",
    body: body,
  });
}

export async function deleteTemplate(id: string) {
  return apiFetch(`/templates/${id}`, {
    method: "DELETE",
  });
}
