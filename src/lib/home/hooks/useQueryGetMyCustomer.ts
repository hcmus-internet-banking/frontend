import { BaseResponse } from "./../../../core/handleResponse";
import { useQuery } from "@tanstack/react-query";
import client from "../../../core/client";
import { handleResponse } from "../../../core/handleResponse";

interface MyProfileInfo extends BaseResponse {
  data: Data;
}

interface Data {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
  balance: string;
}

export const useQueryGetMyProfile = () => {
  const queryArgs = useQuery(["customer", "my"], async () => {
    const res = await client.get<BaseResponse<MyProfileInfo>>(
      "/api/customer/my"
    );

    return await handleResponse(res);
  });

  return { ...queryArgs };
};
