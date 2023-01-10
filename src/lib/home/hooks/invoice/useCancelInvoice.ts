import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { queryClient } from "@/core/queryClient";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type Params = {
  id: string;
  reason: string;
};

export const useCancelInvoice = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async ({ id, reason }) => {
      const res = await client.delete<BaseResponse>(`/api/invoices/${id}`, {
        data: { reason },
      });

      return await handleResponse(res);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries(["invoice", id]);
      queryClient.invalidateQueries(["invoices"]);
      queryClient.invalidateQueries(["notifications"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
