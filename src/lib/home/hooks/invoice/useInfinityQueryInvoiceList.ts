import client from "@/core/client";
import { handleResponse } from "@/core/handleResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BaseResponse } from "../../../../core/handleResponse";
import { Invoice } from "./types";

interface InvoicesResponse extends BaseResponse {
  data: Data;
}

interface Data {
  data: Invoice[];
  metadata: Metadata;
}

interface Metadata {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useInfinityQueryInvoiceList = ({
  type,
  limit,
  offset,
}: {
  type: string;
  limit: number;
  offset: number;
}) => {
  const queryArgs = useInfiniteQuery(
    ["invoices", { type, limit, offset }],
    async ({ pageParam = 0 }) => {
      const res = await client.get<InvoicesResponse>(
        `/api/invoices?type=${type}&limit=${limit}&offset=${pageParam}`
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
