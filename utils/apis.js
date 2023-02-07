import axiosClient from "./axiosConfig";

export function getGamesListAPI(params) {
  return axiosClient.get("games", { params });
}
