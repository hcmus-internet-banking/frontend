import { logoutAsync } from "../store/auth/index";
import { rootStore } from "../store/store";
import axios, { AxiosInstance } from "axios";
import { env } from "./env/client.mjs";

const client: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: rootStore.getState().auth.token
      ? `Bearer ${rootStore.getState().auth.token}`
      : undefined,
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
      case 403:
        rootStore.dispatch(logoutAsync);
        break;
      default:
        return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default client;
