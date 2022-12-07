import { BaseResponse } from "../../../core/handleResponse";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";
import { queryClient } from "@/core/queryClient";

type Params = {
  accountNumber: string;
  mnemonicName: string;
};

export const useUpdateRecipient = (
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
