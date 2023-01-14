import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";

export const postInternalTransfer = async (
  to: string,
  amount: string,
  message: string,
  token: string,
  payer: string,
  saveInfo: boolean,
  options?: any
) => {
  const res = await client.post<BaseResponse>(
    `/api/transfer/internal`,
    {
      to,
      amount,
      message,
      token,
      payer,
      saveInfo,
    },
    options
  );

  return await handleResponse(res);
};

export const postExternalTransfer = async (
  to: string,
  amount: string,
  message: string,
  token: string,
  payer: string,
  options?: any
) => {
  const res = await client.post<BaseResponse>(
    `/api/interbanks/karma/transfer`,
    {
      to,
      amount,
      message,
      token,
      payer,
    },
    options
  );

  return await handleResponse(res);
};

export const getOTPTransfer = async () => {
  const res = await client.post<BaseResponse>(`/api/transfer/request-token`);
  return await handleResponse(res);
};
