import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

interface NotificationsResponse extends BaseResponse {
  data: Data;
}

interface Data {
  data: Notification[];
  metadata: Metadata;
}

interface Metadata {
  total: number;
  totalUnread: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  isRead: boolean;
}

export const useQueryNotifications = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const queryArgs = useInfiniteQuery(
    ["notifications", { limit, offset }],
    async ({ pageParam = 0 }) => {
      const res = await client.get<NotificationsResponse>(
        `/api/notifications?limit=${limit}&offset=${pageParam}`
      );

      return await handleResponse(res);
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.metadata.hasNextPage) {
          return lastPage.metadata.page + limit;
        }
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.metadata.hasPrevPage) {
          return firstPage.metadata.page - limit;
        }
      },
    }
  );

  return queryArgs;
};
