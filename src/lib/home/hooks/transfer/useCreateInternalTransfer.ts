import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";
import { postInternalTransfer } from "./../../apis/transfers/transfer.api";

type InternalTransferData = {
  to: string;
  amount: string;
  message: string;
  token: string;
  payer: "sender" | "receiver";
  saveInfo: boolean;
};

export const useCreateInternalTransfer = () => {
  const mutationArgs = useMutation({
    mutationFn: (datas: InternalTransferData) => {
      return postInternalTransfer(
        datas.to,
        datas.amount,
        datas.message,
        datas.token,
        datas.payer,
        datas.saveInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customer", "my"]);
    },
  });
  return mutationArgs;
};
