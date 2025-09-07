import { apiFetch } from "./api";
import { CategoryData, DraftData, EmailData } from "./types";

export async function getCategories() {
  return apiFetch("/categories", {
    method: "GET",
  });
}

export async function createCategories(data: CategoryData, token: string) {
  return apiFetch(`/categories`, {
    method: "POST",
    body: data,
    token: token,
  });
}

export async function updateCategory(id: string, body: CategoryData, token: string) {
  return apiFetch(`/categories/${id}`, {
    method: "PUT",
    body: body,
    token: token,
  });
}

export async function deleteCategory(id: string, token: string) {
  return apiFetch(`/categories/${id}`, {
    method: "DELETE",
    token: token,
  });
}