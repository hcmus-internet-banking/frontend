import client from "@/core/client";
import { useQuery } from "@tanstack/react-query";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
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

export const useQueryInvoice = ({
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
  const queryArgs = useQuery(["invoices", { type, limit, offset }], {
    queryFn: async () => {
      const res = await client.get<InvoicesResponse>(
        `/api/invoices?type=${type}&isPaid=true&limit=${limit}&offset=${offset}`
      );

      return await handleResponse(res);
    },

    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...overrideOptions,
  });

  return queryArgs;
};
