import client from "@/core/client";
import { queryClient } from "@/core/queryClient";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { BaseResponse, handleResponse } from "../../../../core/handleResponse";

type Params = {
  id: number;
};

export const useMarkReadNotification = (
  overrideOptions?: UseMutationOptions<BaseResponse, any, Params, unknown>
) => {
  const mutationArgs = useMutation({
    mutationFn: async (id) => {
      const res = await client.put<BaseResponse>(`/api/notifications/${id}`);

      return await handleResponse(res);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["notifications", id]);
      queryClient.invalidateQueries(["notifications"]);
    },
    ...overrideOptions,
  });

  return mutationArgs;
};
