import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
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

export const getAllTransactions = async (params?: any) => {
  const res = await client.get<TransactionsResponse>(
    `/api/transactions?offset${params.offset}&limit=${params.limit}`
  );
  return await handleResponse(res);
};
