import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { useQuery } from "@tanstack/react-query";
import { Invoice } from "./types";

interface InvoicesResponse extends BaseResponse {
  data: Invoice;
}

export const useGetPaymentInvoice = ({
  idInvoice,
  overrideOptions,
}: {
  idInvoice: string;
  overrideOptions?: any;
}) => {
  const queryArgs = useQuery(["getPaymentInvoice", { idInvoice }], {
    queryFn: async () => {
      const res = await client.get<InvoicesResponse>(
        `/api/invoices/${idInvoice}`
      );
      return await handleResponse(res);
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...overrideOptions,
  });

  return queryArgs;
};
