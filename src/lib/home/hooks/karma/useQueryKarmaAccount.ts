import client from "@/core/client";
import { handleResponse, BaseResponse } from "@/core/handleResponse";
import { useQuery } from "@tanstack/react-query";

interface KarmaAccountRespone extends BaseResponse {
  data: Data;
}

interface Data {
  ngayTao: string;
  chuKy: string;
  soTK: string;
  hoTen: string;
}

export const useQueryKarmaAccount = (
  bankNumber: string,
  overrideOptions?: any
) => {
  const queryArgs = useQuery(
    ["karma", "account", bankNumber],
    async () => {
      const res = await client.get<KarmaAccountRespone>(
        `/api/interbanks/karma/account?accountNumber=${bankNumber}`
      );
      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
      enabled: bankNumber.length === 10,
      ...overrideOptions,
    }
  );

  return queryArgs;
};
