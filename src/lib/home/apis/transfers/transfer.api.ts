import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";

export const postTransferInternal = async(
    to: string,
    amount: string,
    message: string,
    options?: any
) => {
    const res = await client.post<BaseResponse>(`/api/transfer/internal`, {
        to, amount, message
    }, options);

    return await handleResponse(res);
}
