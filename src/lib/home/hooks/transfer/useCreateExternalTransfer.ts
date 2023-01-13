import { postExternalTransfer } from "./../../apis/transfers/transfer.api";
import { queryClient } from "@/core/queryClient";
import { useMutation } from "@tanstack/react-query";

type ExternalTransferData = {
  to: string;
  amount: string;
  message: string;
  token: string;
  payer: "sender" | "receiver";
};

export const useCreateExternalTransfer = () => {
  const mutationArgs = useMutation({
    mutationFn: (datas: ExternalTransferData) => {
      return postExternalTransfer(
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
