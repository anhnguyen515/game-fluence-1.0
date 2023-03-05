import axiosClient from "@/utils/axiosConfig";

export function getTagsListAPI(params) {
  return axiosClient.get("tags", { params });
}

export function getTagDetailAPI(tagSlug, params) {
  return axiosClient.get(`tags/${tagSlug}`, { params });
}
