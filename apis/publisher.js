import { axiosClient } from "@/utils/axiosConfig";

export function getPublishersListAPI(params) {
  return axiosClient.get("publishers", { params });
}

export function getPublisherDetailAPI(publisherSlug, params) {
  return axiosClient.get(`publishers/${publisherSlug}`, { params });
}
