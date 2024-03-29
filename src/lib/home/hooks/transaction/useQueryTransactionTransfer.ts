import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../apis/transfers/transactions.api";

export const useQueryTransactionTransfer = ({
  type,
  limit,
  offset,
  overrideOptions,
}: {
  type: string;
  limit: number;
  offset: number;
  overrideOptions?: any;
}) => {
  const queryArgs = useQuery(["transactions", { limit, offset, type }], {
    queryFn: () => {
      return getAllTransactions({ limit, offset, type });
    },

    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...overrideOptions,
  });

  return queryArgs;
};
