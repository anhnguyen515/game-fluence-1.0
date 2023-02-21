import axiosClient from "@/utils/axiosConfig";

export function getGenresListAPI(params) {
  return axiosClient.get("genres", { params });
}

export function getGenreDetailAPI(genreSlug, params) {
  return axiosClient.get(`genres/${genreSlug}`, { params });
}
