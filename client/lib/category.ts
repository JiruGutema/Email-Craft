import { apiFetch } from "./api";
import { CategoryData} from "./types";

export async function getCategories() {
  return apiFetch("/categories", {
    method: "GET",
  });
}

export async function createCategories(data: CategoryData) {
  return apiFetch(`/categories`, {
    method: "POST",
    body: data,
  });
}

export async function updateCategory(id: string, body: CategoryData) {
  return apiFetch(`/categories/${id}`, {
    method: "PUT",
    body: body,
  });
}

export async function deleteCategory(id: string) {
  return apiFetch(`/categories/${id}`, {
    method: "DELETE",
  });
}