import { BaseResponse } from "@/core/handleResponse";
import client from "@/core/client";
import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";
// import { Recipient } from "@/store/recipients/types";

export const useDeleteInvoice = () => {
  const mutationArgs = useMutation({
    mutationFn: async (id: string) => {
      const res = await client.delete<BaseResponse<any>>(`/api/invoices/${id}`);

      return res;
    },
    // get id
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries(["invoice", id]);
      queryClient.invalidateQueries(["invoices"]);
    },
  });

  return mutationArgs;
};
