import axiosClient from "../utils/axiosConfig";

export function getGamesListAPI(params) {
  return axiosClient.get("games", { params });
}

export function getGameDetailAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}`, { params });
}
