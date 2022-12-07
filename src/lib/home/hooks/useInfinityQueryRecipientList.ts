<<<<<<<< HEAD:src/lib/home/hooks/useInfinityQueryRecipientList.ts
import { BaseResponse } from "../../../core/handleResponse";
import client from "@/core/client";
import { handleResponse } from "@/core/handleResponse";
========
import { BaseResponse } from "../../../../core/handleResponse";
import client from "@/src/core/client";
import { handleResponse } from "@/src/core/handleResponse";
>>>>>>>> 0f87d23f51bce3d7b75cd6e92891c95d6056d464:src/lib/home/hooks/recipients/useInfinityQueryGetRecipients.ts
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

export const useInfinityQueryRecipientList = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
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