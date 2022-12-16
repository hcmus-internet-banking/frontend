import { useMutation } from "@tanstack/react-query";
import { getOTPTransfer } from "../../apis/transfers/transfer.api";

export const useGetOTPTransfer = () => {
  const mutationArgs = useMutation({
    mutationFn: () => {
      return getOTPTransfer();
    },
  });
  return mutationArgs;
};
