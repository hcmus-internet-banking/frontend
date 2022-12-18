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
    mutationFn: (datas: InternalTransferData) => {
      return postInternalTransfer(
        datas.to,
        datas.amount,
        datas.message,
        datas.token,
        datas.payer
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customer", "my"]);
    },
  });
  return mutationArgs;
};
