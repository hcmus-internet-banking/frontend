import { BaseResponse } from "../../../core/handleResponse";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";

interface CustomerData {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
}

export const useQueryGetCustomerByBankNumber = (
  bankNumber: string,
  overrideOptions?: UseQueryOptions<unknown, unknown, unknown, string[]>
) => {
  const queryArgs = useQuery(
    ["customer", bankNumber],
    async () => {
      if (bankNumber.length != 10) return;

      const res = await client.get<BaseResponse<CustomerData>>(
        `/api/customer/${bankNumber}`
      );

      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
      ...overrideOptions,
    }
  );

  return queryArgs;
};
