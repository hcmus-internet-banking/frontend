import useToggle from "@/lib/common/hooks/useToggle";
import { useInfinityQueryRecipientList } from "@/lib/home/hooks/useInfinityQueryRecipientList";
import { RxPlus } from "react-icons/rx";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import Heading from "../common/Heading/Heading";
import Spinner from "../common/Spinner/Spinner";
import CreateRecipient from "./CreateRecipient";
import Recipient from "./Recipient";

const RecipientManager = () => {
  const { value, toggle } = useToggle(true);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryRecipientList({
      limit: 4,
      offset: 0,
    });

  return (
    <>
      <CreateRecipient hide={value} toggle={toggle} />

      <Card className="max-w-lg bg-gray-100" noShadow>
        <div className="flex justify-between">
          <Heading>Recipient List</Heading>
          <Button className="w-fit" onClick={toggle} size="sm">
            <RxPlus strokeWidth={1} />
          </Button>
        </div>
        <div className="py-4">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.pages.map((page, index) => (
              <div key={index}>
                {page.data.map((recipient) => {
                  return <Recipient key={recipient.id} recipient={recipient} />;
                })}
              </div>
            ))
          )}
        </div>
        {hasNextPage ? (
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Load More
          </Button>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500">No more recipients</div>
          )
        )}
      </Card>
    </>
  );
};

export default RecipientManager;
