import { RootState } from "./../store/store";
import { logoutAsync } from "../store/auth/index";
import { rootStore } from "../store/store";
import axios, { AxiosInstance } from "axios";
import { env } from "./env/client.mjs";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

let store: ToolkitStore<RootState>;

export const injectStore = (_store: ToolkitStore<RootState>) => {
  store = _store;
};

const client: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
      case 403:
        rootStore.dispatch(logoutAsync());
        break;
      default:
        return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default client;
