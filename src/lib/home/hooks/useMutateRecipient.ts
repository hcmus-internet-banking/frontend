import { BaseResponse } from "./../../../core/handleResponse";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";
import { queryClient } from "../../../core/queryClient";

export const useMutateRecipient = (overrideOptions?: MutationOptions) => {
  const mutationArgs = useMutation({
    mutationFn: async (payload) => {
      const res = await client.post<BaseResponse>("/api/recipient", payload);

      return await handleResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipients"]);
    },
    ...overrideOptions,
  });

  return { ...mutationArgs };
};
