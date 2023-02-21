import axiosClient from "../utils/axiosConfig";

export function getGamesListAPI(params) {
  return axiosClient.get("games", { params });
}
