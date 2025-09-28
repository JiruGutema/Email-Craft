import { apiFetch } from "./api";

export async function getFavorites(token: string) {
  return apiFetch("/templates/favourites", {
    method: "GET",
    token: token,
  });
}

export async function addFavorite(id: string, token: string) {
  return apiFetch(`/templates/favourites/${id}`, {
    method: "POST",
    token: token,
  });
}

export async function deleteFavorite(id: string, token: string) {
  return apiFetch(`/templates/favourites/${id}`, {
    method: "DELETE",
    token: token,
  });
}