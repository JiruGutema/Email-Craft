import { apiFetch } from "./api";

export async function getFavorites() {
  return apiFetch("/templates/favourites", {
    method: "GET",
  });
}

export async function addFavorite(id: string) {
  return apiFetch(`/templates/favourites/${id}`, {
    method: "POST",
  });
}

export async function deleteFavorite(id: string) {
  return apiFetch(`/templates/favourites/${id}`, {
    method: "DELETE",
  });
}