import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { useMutation } from "@tanstack/react-query";

export const useGetOTPInvoice = () => {
  const mutationArgs = useMutation({
    mutationFn: async () => {
      const res = await client.post<BaseResponse>(
        `/api/invoices/pay/request-otp`
      );
      return await handleResponse(res);
    },
  });
  return mutationArgs;
};
