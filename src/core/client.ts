import {
  logout,
  refreshTokenAsync,
  updateAccessToken,
} from "../store/auth/index";
import axios, { AxiosInstance } from "axios";
import { env } from "./env/client.mjs";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

const client: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 500,
});

export const initInterceptors = (store: ToolkitStore) => {
  client.interceptors.request.use((config) => {
    const token = store.getState().auth.user?.tokens.accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export default client;
