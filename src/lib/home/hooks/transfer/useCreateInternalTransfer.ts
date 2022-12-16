import { postInternalTransfer } from "./../../apis/transfers/transfer.api";
import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";

type InternalTransferData = {
  to: string;
  amount: string;
  message: string;
  token: string;
  payer: "sender" | "receiver";
};

export const useCreateInternalTransfer = () => {
  const mutationArgs = useMutation({
    mutationFn: (data: InternalTransferData) => {
      return postInternalTransfer(
        data.to,
        data.amount,
        data.message,
        data.token,
        data.payer
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customer", "my"]);
    },
  });
  return mutationArgs;
};
