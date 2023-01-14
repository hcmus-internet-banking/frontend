import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "./../../apis/transfers/transactions.api";

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
