import client from "@/src/core/client";
import { queryClient } from "@/src/core/queryClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BaseResponse, handleResponse } from "../../../../core/handleResponse";

type Params = {
  id: string;
  mnemonicName: string;
};

export const useUpdateRecipient = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async ({ id, mnemonicName }) => {
      const res = await client.put<BaseResponse>(`/api/recipients/${id}`, {
        mnemonicName,
      });

      return await handleResponse(res);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["recipient", id]);
      queryClient.invalidateQueries(["recipients"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
