import { useQuery } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";

export const useGetMyData = () => {
  const queryArgs = useQuery(
    ["customer", "my"],
    async () => {
      const res = await client.get("/api/customer/my");

      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return { ...queryArgs };
};
