import { axiosClient } from "@/utils/axiosConfig";

export function getDevelopersListAPI(params) {
  return axiosClient.get("developers", { params });
}

export function getDeveloperDetailAPI(developerSlug, params) {
  return axiosClient.get(`developers/${developerSlug}`, { params });
}
