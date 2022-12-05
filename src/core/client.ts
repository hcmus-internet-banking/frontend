import { RootState } from "./../store/store";
import { logoutAsync } from "../store/auth/index";
import { rootStore } from "../store/store";
import axios, { AxiosInstance } from "axios";
import { env } from "./env/client.mjs";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

const client: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const initInterceptors = (store: ToolkitStore<RootState>) => {
  client.interceptors.request.use((config) => {
    const token = store.getState().auth.user?.tokens.accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (config) => config,
    (error) => {
      const status = error.response?.status;

      switch (status) {
        case 401:
        case 403:
          break;
        default:
          return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};

export default client;
