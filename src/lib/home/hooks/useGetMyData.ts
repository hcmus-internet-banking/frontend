import { useQuery } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";

export const useGetMyData = () => {
  const queryArgs = useQuery(
    ["customer", "me"],
    async () => {
      const res = await client.get("/api/customer/my");

      return handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { ...queryArgs };
};
