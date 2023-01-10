import { queryClient } from "@/core/queryClient";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import client from "../../../../core/client";
import { BaseResponse, handleResponse } from "../../../../core/handleResponse";

type Params = {
  accountNumber: string;
  amount: string;
  isInternalBank: string;
  message: string;
};

export const useCreateInvoice = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async (payload) => {
      const res = await client.post<BaseResponse>("/api/invoices", payload);

      return await handleResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
      queryClient.invalidateQueries(["notifications"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
