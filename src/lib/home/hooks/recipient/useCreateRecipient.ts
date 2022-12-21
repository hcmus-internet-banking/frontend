import { queryClient } from "@/core/queryClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import client from "../../../../core/client";
import { BaseResponse, handleResponse } from "../../../../core/handleResponse";

type Params = {
  accountNumber: string;
  mnemonicName: string;
};

export const useCreateRecipient = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async ({ accountNumber, mnemonicName }) => {
      const res = await client.post<BaseResponse>("/api/recipients", {
        accountNumber,
        mnemonicName,
      });

      return await handleResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipients"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
