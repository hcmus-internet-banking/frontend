import { useMarkReadNotification } from "@/lib/common/hooks/notification/useMarkReadNotification";
import { selectUser } from "@/store/auth";
import { useAppSelector } from "@/store/store";
import classNames from "classnames";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { GoPrimitiveDot } from "react-icons/go";

type Props = {
  notification: any;
  toggle: () => void;
};

const parseDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleTimeString("en-US");
  return `${month} ${day}, ${year} ${time}`;
};

const Notify = ({
  notification: { id, type, title, isRead, text, createdAt },
  toggle,
}: Props) => {
  const { mutateAsync } = useMarkReadNotification();

  const data = JSON.parse(text);
  const user = useAppSelector(selectUser);

  const idInvoicePayment =
    data?.payload?.to?.id === user?.id && type === "DEBT_CREATED"
      ? data?.payload?.invoiceId
      : null;

  const handleMarkRead = () => {
    if (!isRead) {
      toast.promise(mutateAsync(id), {
        loading: "Marking as read...",
        success: "Marked as read",
        error: "Error marking as read",
      });
    }
  };

  return (
    <>
      {idInvoicePayment ? (
        <Link
          href="/user/invoices/[...idInvoicePayment]"
          as={`/user/invoices/${idInvoicePayment}`}
        >
          <a onClick={() => toggle()}>
            <div
              className={classNames(
                "m-2 flex content-around items-center rounded p-2",
                {
                  "hover:cursor-pointer": !isRead,
                  "bg-gray-100": isRead,
                  "bg-blue-100": !isRead,
                }
              )}
              onClick={handleMarkRead}
            >
              {!isRead ? (
                <GoPrimitiveDot className="m-1 w-5 text-blue-600" />
              ) : (
                <div className="m-1 w-5"></div>
              )}
              <div className="w-16 p-2 font-semibold">{title}</div>
              <div className="flex grow flex-col pl-2">
                <div
                  className={classNames("text-base", {
                    "text-gray-600": isRead,
                    "text-gray-900": !isRead,
                    "font-semibold": !isRead,
                  })}
                >
                  {data?.message}
                </div>
                <div className="font-medium text-blue-900">
                  {parseDate(createdAt)}
                </div>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <div
          className={classNames(
            "m-2 flex content-around items-center rounded p-2",
            {
              "hover:cursor-pointer": !isRead,
              "bg-gray-100": isRead,
              "bg-blue-100": !isRead,
            }
          )}
          onClick={handleMarkRead}
        >
          {!isRead ? (
            <GoPrimitiveDot className="m-1 w-5 text-blue-600" />
          ) : (
            <div className="m-1 w-5"></div>
          )}
          <div className="w-16 p-2 font-semibold">{title}</div>
          <div className="flex grow flex-col pl-2">
            <div
              className={classNames("text-base", {
                "text-gray-600": isRead,
                "text-gray-900": !isRead,
                "font-semibold": !isRead,
              })}
            >
              {data?.message}
            </div>
            <div className="font-medium text-blue-900">
              {parseDate(createdAt)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notify;
