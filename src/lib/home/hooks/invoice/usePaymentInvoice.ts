import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { queryClient } from "@/core/queryClient";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type Params = {
  invoiceId: string;
  token: string;
};

export const usePaymentInvoice = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async ({ invoiceId }) => {
      const res = await client.put<BaseResponse<any>>(
        `/api/invoices/pay/${invoiceId}`
      );

      return await handleResponse(res);
    },
    onSuccess: (invoiceId) => {
      queryClient.invalidateQueries(["invoice", invoiceId]);
      queryClient.invalidateQueries(["invoices"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
