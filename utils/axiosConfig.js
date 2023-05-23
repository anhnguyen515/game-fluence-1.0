import axios from "axios";
import {
  API_KEY,
  API_URL,
  BACKEND_URL,
  TELEGRAM_API_KEY,
  TELEGRAM_CHAT_ID,
} from "./constants";

export const axiosClient = axios.create({
  baseURL: API_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: API_KEY,
  },
});

axiosClient.interceptors.request.use(async (request) => {
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  return response;
});

export const axiosNodeBe = axios.create({
  baseURL: BACKEND_URL + "api/",
  header: {
    "Content-Type": "application/json",
  },
});

// send log to telegram bot
async function sendMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_API_KEY}/sendMessage`;
  const params = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  };

  await axios.get(url, { params });
}
