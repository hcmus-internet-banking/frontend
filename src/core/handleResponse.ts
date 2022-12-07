import { RootState } from "./../store/store";
import { AxiosResponse } from "axios";
import { store } from "../store";
import { logout, refreshTokenAsync, updateAccessToken } from "../store/auth";
import { queryClient } from "./queryClient";

const isOk = (status: number) => status >= 200 && status < 300;

export interface BaseResponse<T = any> {
  error: { message: string; issues: any } | null;
  data: T;
}

export const handleResponse = async <T>(
  response: AxiosResponse<BaseResponse<T>>
) => {
  const status = response.status;
  const authState = store.getState().auth as RootState["auth"];

  if (!isOk(status)) {
    switch (status) {
      case 401:
        try {
          //  if not login, then skip to the next case
          if (!authState.user) {
            break;
          }

          const refreshToken = authState.user?.tokens.refreshToken;

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

          queryClient.clear();
        } catch (error) {
          store.dispatch(logout());
        }
        break;
      default:
        break;
    }

    const {
      data: { error },
    } = response;

    throw error;
  }

  return response.data.data;
};

export const handleRefreshTokenResponse = async <T>(
  response: AxiosResponse<BaseResponse<T>>
) => {
  const status = response.status;

  if (!isOk(status)) {
    const {
      data: { error },
    } = response;

    throw error;
  }

  return response.data;
};
