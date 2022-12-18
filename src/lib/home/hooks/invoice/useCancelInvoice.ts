import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { queryClient } from "@/core/queryClient";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type Params = {
  id: string;
  message: string;
};

export const useCancelInvoice = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async ({ id, message }) => {
      const res = await client.delete<BaseResponse<any>>(`/api/invoices/${id}`);

      return await handleResponse(res);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries(["invoice", id]);
      queryClient.invalidateQueries(["invoices"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
