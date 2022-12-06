import { AxiosResponse } from "axios";

const isOk = (status: number) => status >= 200 && status < 300;

export interface BaseResponse {
  error: { message: string; issues: any } | null;
  data: any;
}

export const handleResponse = async <T extends BaseResponse>(
  response: AxiosResponse<T>
) => {
  if (!isOk(response.status)) {
    const {
      data: { error },
    } = response;

    throw error;
  }

  return response.data;
};
