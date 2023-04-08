import axios from "axios";
import { API_KEY, API_URL, BACKEND_URL } from "./constants";

export const axiosClient = axios.create({
  baseURL: API_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: API_KEY,
  },
});

export const axiosNodeBe = axios.create({
  baseURL: BACKEND_URL + "api/",
  header: {
    "Content-Type": "application/json",
  },
});
