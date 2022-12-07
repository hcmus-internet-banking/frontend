import useToggle from "@/src/lib/common/hooks/useToggle";
import { useInfinityQueryGetRecipients } from "@/src/lib/home/hooks/recipients/useInfinityQueryGetRecipients";
import Button from "../common/Button/Button";
import Heading from "../common/Heading/Heading";
import Spinner from "../common/Spinner/Spinner";
import CreateRecipient from "./CreateRecipient";
import Recipient from "./Recipient";

const RecipientManager = () => {
  const { value, toggle } = useToggle(true);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryGetRecipients({
      limit: 4,
      offset: 0,
    });

  return (
    <>
      <CreateRecipient hide={value} toggle={toggle} />
      <Heading size="sm">Recipient List</Heading>
      <Button className="my-4" onClick={toggle}>
        + Add new recipient
      </Button>

      <div className="h-72 overflow-y-auto">
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
        <Button onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
          Load More
        </Button>
      ) : (
        !isLoading && (
          <div className="text-center text-gray-500">No more recipients</div>
        )
      )}
    </>
  );
};

export default RecipientManager;
