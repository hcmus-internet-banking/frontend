import { BaseResponse } from "./../../../core/handleResponse";
import client from "@/src/core/client";
import { handleResponse } from "@/src/core/handleResponse";
import { useQuery } from "@tanstack/react-query";

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

export const useQueryGetRecipients = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const queryArgs = useQuery(
    ["recipients", { limit, offset }], // This is the key for the query
    async () => {
      const res = await client.get<RecipientsResponse>(
        `/api/recipients?limit=${limit}&offset=${offset}`
      );

      return await handleResponse(res);
    }
  );

  return { ...queryArgs };
};
