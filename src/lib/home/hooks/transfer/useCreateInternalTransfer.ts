import { postTransferInternal } from './../../apis/transfers/transfer.api';
// import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";

type InternalTransferData = {
    to: string;
    amount: string;
    message: string;
};

export const useCreateInternalTransfer = (
) => {
  const mutationArgs = useMutation({
    mutationFn: (data: InternalTransferData) => {
      return postTransferInternal(data.to, data.amount, data.message);
    },
    });
  return mutationArgs;
};
