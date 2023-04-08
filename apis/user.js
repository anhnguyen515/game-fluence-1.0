import { axiosNodeBe } from "@/utils/axiosConfig";

export function loginAPI(body) {
  return axiosNodeBe.post("user/login", body);
}

export function signupAPI(body) {
  return axiosNodeBe.post("user/signup", body);
}
