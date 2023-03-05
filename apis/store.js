import axiosClient from "@/utils/axiosConfig";

export function getStoresListAPI(params) {
  return axiosClient.get("stores", { params });
}

export function getStoreDetailAPI(storeSlug, params) {
  return axiosClient.get(`stores/${storeSlug}`, { params });
}
