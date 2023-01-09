import { useQueryNotifications } from "@/lib/common/hooks/useGetNotication";
import Modal from "../common/Modal/Modal";
import Spinner from "../common/Spinner/Spinner";
import Notify from "./Notify";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";

type Props = {
  hide: boolean;
  toggle: () => void;
};

const NotifyManager = ({ hide, toggle }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQueryNotifications({
      limit: 2,
      offset: 0,
    });

  return (
    <>
      <Modal title="Notifications" hide={hide} toggle={toggle}>
        <Card>
          {isLoading ? (
            <Spinner />
          ) : (
            data?.pages.map((page, index) => (
              <div key={index} className="flex flex-col space-y-4 rounded">
                {page.data.map((notification) => {
                  return (
                    <Notify key={notification.id} notification={notification} />
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
              Load More
            </Button>
          ) : (
            !isLoading && (
              <div className="text-center text-gray-500">
                No more notification
              </div>
            )
          )}
        </Card>
      </Modal>
    </>
  );
};

export default NotifyManager;
