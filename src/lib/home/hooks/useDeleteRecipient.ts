import { BaseResponse } from "./../../../core/handleResponse";
import client from "@/src/core/client";
import { queryClient } from "@/src/core/queryClient";
import { useMutation } from "@tanstack/react-query";

interface Data {
  id: string;
  accountNumber: string;
  mnemonicName: string;
}

export const useDeleteRecipient = () => {
  const mutationArgs = useMutation({
    mutationFn: async (id: string) => {
      const res = await client.delete<BaseResponse<Data>>(
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
