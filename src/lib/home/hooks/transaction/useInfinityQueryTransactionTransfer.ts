import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CustomerData } from "../../hooks/useQueryCustomerByBankNumber";

interface Transactions {
  amount: string;
  createdAt: string;
  fromCustomer: CustomerData | null;
  id: string;
  toCustomer: CustomerData | null;
  type: string;
}
interface Metadata {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
interface Data {
  data: Transactions[];
  metadata: Metadata;
}
interface TransactionsResponse extends BaseResponse {
  data: Data;
}

export const useInfinityQueryTransactionTransfer = ({
  type,
  limit,
  offset,
}: {
  type: string;
  limit: number;
  offset: number;
}) => {
  const queryArgs = useInfiniteQuery(
    ["transactionTransfer", { type, limit, offset }],
    async ({ pageParam = 0 }) => {
      const res = await client.get<TransactionsResponse>(
        `/api/transactions?type=${type}&offset=${pageParam}&limit=${limit}`
      );
      return await handleResponse(res);
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.metadata.hasNextPage) {
          return lastPage.metadata.page + limit;
        }
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.metadata.hasPrevPage) {
          return firstPage.metadata.page - limit;
        }
      },
    }
  );

  return queryArgs;
};
