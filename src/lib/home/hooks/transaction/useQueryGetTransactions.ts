import {
  BaseResponse,
  handleResponse,
} from "./../../../../core/handleResponse";
import { getAllTransactions } from "./../../apis/transfers/transactions.api";
import { useQuery } from "@tanstack/react-query";
import client from "@/core/client";

export const useQueryGetTransactions = ({
  limit,
  offset,
  overrideOptions,
}: {
  limit: number;
  offset: number;
  overrideOptions?: any;
}) => {
  const queryArgs = useQuery(["transactions", { limit, offset }], {
    queryFn: () => {
      return getAllTransactions({ limit, offset });
    },
    refetchOnWindowFocus: false,
    ...overrideOptions,
  });

  return queryArgs;
};
