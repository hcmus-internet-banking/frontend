import { useQueryNotifications } from "@/lib/common/hooks/notification/useGetNotication";
import { BiX } from "react-icons/bi";
import Button from "../common/Button/Button";
import Spinner from "../common/Spinner/Spinner";
import Notify from "./Notify";

type Props = {
  hide: boolean;
  toggle: () => void;
};

const NotifyManager = ({ hide, toggle }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQueryNotifications({
      limit: 4,
      offset: 0,
    });

  const handleCloseNotify = () => {
    toggle();
  };

  return (
    <>
      <div
        hidden={hide}
        className="fixed top-0 z-10 h-full w-full overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-90 transition delay-300 duration-300 ease-in-out"
      >
        <div className="absolute right-0 flex h-screen w-96 flex-col overflow-y-auto bg-gray-50 p-8 lg:w-1/3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <BiX
              onClick={handleCloseNotify}
              className="h-10 w-10 p-2 hover:cursor-pointer hover:opacity-70"
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            data?.pages.map((page, index) => (
              <div key={index} className="flex flex-col rounded pt-2">
                {page.data.map((notification) => {
                  return (
                    <Notify
                      toggle={toggle}
                      key={notification.id}
                      notification={notification}
                    />
                  );
                })}
              </div>
            ))
          )}
          {hasNextPage ? (
            <Button
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
            >
              More
            </Button>
          ) : (
            !isLoading && (
              <div className="text-center text-gray-500">
                No more notification
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default NotifyManager;
