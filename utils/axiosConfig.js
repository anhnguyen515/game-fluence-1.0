import axios from "axios";
import { API_KEY, API_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: API_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: API_KEY,
  },
});

export default axiosClient;
