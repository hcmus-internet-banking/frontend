import classNames from "classnames";
import { GoPrimitiveDot } from "react-icons/go";

type Props = {
  notification: any;
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
  notification: { type, title, isRead, text, createdAt },
}: Props) => {
  return (
    <>
      <div className={classNames("flex rounded p-2")}>
        <div className="my-auto p-1">
          {title}
          <div
            className={classNames(
              "mr-2 flex h-8 w-8 items-center justify-center rounded-full",
              {
                "bg-green-100": type === "DEBT_PAID",
                "bg-yellow-100": type === "DEBT_CREATED",
                "bg-red-100": type === "DEBT_DELETED",
              }
            )}
          >
            <GoPrimitiveDot
              className={classNames(
                "flex h-8 w-8 items-center justify-center rounded-full",
                {
                  "text-green-600": type === "DEBT_PAID",
                  "text-yellow-600": type === "DEBT_CREATED",
                  "text-red-600": type === "DEBT_DELETED",
                }
              )}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className={classNames("text-base", {
              "text-gray-600": isRead,
              "text-gray-900": !isRead,
              "font-semibold": !isRead,
            })}
          >
            {text}
          </div>
          <div className="font-medium text-blue-900">
            {parseDate(createdAt)}
          </div>
        </div>
        <div className="my-auto p-1">
          {!isRead ? <GoPrimitiveDot className="text-blue-600" /> : null}
        </div>
      </div>
    </>
  );
};

export default Notify;
