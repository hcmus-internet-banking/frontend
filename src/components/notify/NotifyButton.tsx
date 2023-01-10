import { useQueryNotifications } from "@/lib/common/hooks/notification/useGetNotication";
import React from "react";
import { IoNotificationsCircle } from "react-icons/io5";

type Props = {
  handleOnClick: () => void;
};

const NotifyButton = ({ handleOnClick }: Props) => {
  const { data } = useQueryNotifications({
    limit: 4,
    offset: 0,
  });

  const totalUnread = data?.pages[0]?.metadata?.totalUnread;

  return (
    <>
      <button
        type="button"
        onClick={handleOnClick}
        className="relative inline-flex items-center rounded-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <IoNotificationsCircle className="h-10 w-10" />
        <span className="absolute -right-1 -top-1 mb-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
          {totalUnread}
        </span>
      </button>
    </>
  );
};

export default NotifyButton;
