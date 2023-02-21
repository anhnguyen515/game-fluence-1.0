import axiosClient from "../utils/axiosConfig";

export function getGamesListAPI(params) {
  return axiosClient.get("games", { params });
}

export function getGameDetailAPI(slug, params) {
  return axiosClient.get(`games/${slug}`, { params });
}
