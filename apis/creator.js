import { axiosClient } from "@/utils/axiosConfig";

export function getCreatorsListAPI(params) {
  return axiosClient.get("creators", { params });
}

export function getCreatorDetailAPI(creatorSlug, params) {
  return axiosClient.get(`creators/${creatorSlug}`, { params });
}
