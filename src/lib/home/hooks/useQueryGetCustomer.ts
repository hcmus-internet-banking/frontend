import { useQuery, QueryOptions } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";

export const useQueryGetCustomer = (
  id: string,
  overrideOptions?: QueryOptions
) => {
  const queryArgs = useQuery(
    ["customer", id],
    async () => {
      const res = await client.get(`/api/customer/${id}`);

      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
      ...overrideOptions,
    }
  );

  return { ...queryArgs };
};
