import client from "@/core/client";
import { handleResponse } from "@/core/handleResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BaseResponse } from "../../../../core/handleResponse";

interface InvoicesResponse extends BaseResponse {
  data: Data;
}

interface Data {
  data: Datum[];
  metadata: Metadata;
}

interface Metadata {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Datum {
  id: string;
  accountNumber: string;
  mnemonicName: string;
}

export const useInfinityQueryInvoiceList = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const queryArgs = useInfiniteQuery(
    ["recipients", { limit, offset }], // This is the key for the query
    async ({ pageParam = 0 }) => {
      const res = await client.get<InvoicesResponse>(
        `/api/invoices?limit=${limit}&offset=${pageParam}`
      );

      console.log("🚀 ~ file: useInfinityQueryInvoiceList.ts:42 ~ res", res);

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
