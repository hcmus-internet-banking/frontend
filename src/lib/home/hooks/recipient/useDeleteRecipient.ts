import { BaseResponse } from "@/core/handleResponse";
import client from "@/core/client";
import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Recipient } from "@/store/recipients/types";

export const useDeleteRecipient = () => {
  const mutationArgs = useMutation({
    mutationFn: async (id: string) => {
      const res = await client.delete<BaseResponse<Recipient>>(
        `/api/recipients/${id}`
      );
      return res;
    },
    // get id
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries(["recipient", id]);
      queryClient.invalidateQueries(["recipients"]);
    },
  });

  return mutationArgs;
};
