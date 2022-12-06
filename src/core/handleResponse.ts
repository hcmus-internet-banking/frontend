import { AxiosResponse } from "axios";
import { store } from "../store";
import { logout, refreshTokenAsync, updateAccessToken } from "../store/auth";

const isOk = (status: number) => status >= 200 && status < 300;

export interface BaseResponse {
  error: { message: string; issues: any } | null;
  data: any;
}

export const handleResponse = async <T extends BaseResponse>(
  response: AxiosResponse<T>
) => {
  const status = response.status;
  if (!isOk(status)) {
    switch (status) {
      case 401:
        try {
          //  if not login, then skip to the next case
          if (!store.getState().auth.user) {
            break;
          }

          const refreshToken = store.getState().auth.user?.tokens.refreshToken;

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
        break;
    }

    const {
      data: { error },
    } = response;

    throw error;
  }

  return response.data;
};
