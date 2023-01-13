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
  const today = new Date();
  const lastMonth = new Date(
    today.setMonth(today.getMonth() - 1)
  ).toISOString();
  console.log(lastMonth);

  const res = await client.get<TransactionsResponse>(
    `/api/transactions?type=${params.type}&offset=${params.offset}&limit=${params.limit}&startDate=${lastMonth}`
  );
  return await handleResponse(res);
};
