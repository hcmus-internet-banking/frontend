import client from "@/core/client";
// import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";
import { BaseResponse, handleResponse } from "../../../../core/handleResponse";

type InternalTransferData = {
    to: string;
    amount: string;
    message: string;
};

export const useCreateInternalTransfer = (
) => {

  const mutationArgs = useMutation({
    mutationFn: async ({ to, amount, message }:InternalTransferData) => {
      const res = await client.post<BaseResponse>(`/api/transfer/internal`, {
        to, amount, message
      });

      return await handleResponse(res);
    },
  });

  return mutationArgs;
};
