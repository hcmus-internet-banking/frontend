import { BaseResponse } from "../../../core/handleResponse";
import client from "@/src/core/client";
import { handleResponse } from "@/src/core/handleResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

interface RecipientsResponse extends BaseResponse {
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

export const useInfinityQueryGetRecipients = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  // const queryArgs = useQuery(
  //   ["recipients", { limit, offset }], // This is the key for the query
  //   async () => {
  //     const res = await client.get<RecipientsResponse>(
  //       `/api/recipients?limit=${limit}&offset=${offset}`
  //     );

  //     return await handleResponse(res);
  //   }
  // );
  const queryArgs = useInfiniteQuery(
    ["recipients", { limit, offset }], // This is the key for the query
    async ({ pageParam = 0 }) => {
      const res = await client.get<RecipientsResponse>(
        `/api/recipients?limit=${limit}&offset=${pageParam}`
      );

      return await handleResponse(res);
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.metadata.hasNextPage) {
          return lastPage.metadata.page + 1;
        }
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.metadata.hasPrevPage) {
          return firstPage.metadata.page - 1;
        }
      },
    }
  );

  return { ...queryArgs };
};