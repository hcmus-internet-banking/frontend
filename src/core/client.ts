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

  client.interceptors.response.use(
    (config) => config,
    async (error) => {
      const status = error.response?.status;

      switch (status) {
        case 401:
          try {
            const refreshToken =
              store.getState().auth.user?.tokens.refreshToken;

            if (!refreshToken) {
              throw new Error("Refresh token not found");
            }

            const {
              data: { accessToken },
            } = await refreshTokenAsync(refreshToken);

            if (!accessToken) {
              throw new Error("Fetching new access token failed");
            }

            store.dispatch(
              updateAccessToken({
                accessToken: accessToken,
              })
            );
          } catch (error) {
            store.dispatch(logout());
          }
          break;
        default:
          return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};

export default client;
