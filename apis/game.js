import { axiosClient } from "@/utils/axiosConfig";

export function getGamesListAPI(params) {
  return axiosClient.get("games", { params });
}

export function getGameDetailAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}`, { params });
}

export function getGameAdditionsAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}/additions`, { params });
}

export function getGamesSeriesAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}/game-series`, { params });
}

export function getGameScreenshotsAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}/screenshots`, { params });
}

export function getGameStoresAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}/stores`, { params });
}

export function getGameTrailersAPI(gameSlug, params) {
  return axiosClient.get(`games/${gameSlug}/movies`, { params });
}

export function getGameCreatorsListAPI(gameSlug, params) {
  return axiosClient.get(`/games/${gameSlug}/development-team`, { params });
}
