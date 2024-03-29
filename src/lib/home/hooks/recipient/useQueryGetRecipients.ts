import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { Recipient } from "@/store/recipients/types";
import { useQuery } from "@tanstack/react-query";

interface RecipientsResponse extends BaseResponse {
  data: Data;
}

interface Data {
  data: Recipient[];
  metadata: Metadata;
}

interface Metadata {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useQueryRecipientList = (overrideOptions?: any) => {
  const queryArgs = useQuery(
    ["recipients"],
    async () => {
      const res = await client.get<RecipientsResponse>(`/api/recipients`);
      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
      ...overrideOptions,
    }
  );

  return queryArgs;
};
