import { BaseResponse } from "./../../../core/handleResponse";
import { useQuery, QueryOptions } from "@tanstack/react-query";
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
  overrideOptions?: QueryOptions
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
      ...overrideOptions,
    }
  );

  return { ...queryArgs };
};
