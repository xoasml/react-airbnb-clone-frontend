import axios from "axios";
import Cookie from "js-cookie";

const baseURL: string = "http://127.0.0.1:8000/api/v1/";

const header: Record<string, any> = {
  "X-CSRFToken": Cookie.get("csrftoken") || "",
};

export const instance = () => {
  return axios.create({
    baseURL: baseURL,
    withCredentials: true, // csrf를 보내겠다 라는 설정
  });
};

export const getHeader = (): Record<string, any> => header;
