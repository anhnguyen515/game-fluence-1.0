import { axiosClient } from "@/utils/axiosConfig";

export function getPlatformsListAPI(params) {
  return axiosClient.get("platforms", { params });
}

export function getPlatformDetailAPI(platformSlug, params) {
  return axiosClient.get(`platforms/${platformSlug}`, { params });
}
