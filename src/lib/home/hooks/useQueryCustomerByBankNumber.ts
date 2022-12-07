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

export const BANK_NUMBER_LENGTH = 10;

export const useQueryGetCustomerByBankNumber = (
  bankNumber: string,
  overrideOptions?: UseQueryOptions<
    unknown,
    unknown,
    BaseResponse<CustomerData>,
    string[]
  >
) => {
  const queryArgs = useQuery(
    ["customer", bankNumber],
    async () => {
      const res = await client.get<BaseResponse<CustomerData>>(
        `/api/customer/${bankNumber}`
      );

      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
      enabled: bankNumber.length === BANK_NUMBER_LENGTH,
      retry: false,
      ...overrideOptions,
    }
  );

  return queryArgs;
};
