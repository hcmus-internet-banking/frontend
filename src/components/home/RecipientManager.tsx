import { useInfinityQueryGetRecipients } from "@/src/lib/home/hooks/useInfinityQueryGetRecipients";
import { RxPerson, RxPencil2, RxCross1 } from "react-icons/rx";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import Spinner from "../common/Spinner/Spinner";
import CreateRecipient from "./CreateRecipient";

const RecipientManager = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryGetRecipients({
      limit: 4,
      offset: 0,
    });

  return (
    <>
      <CreateRecipient />

      <div className="h-72 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          data?.pages.map((page, index) => (
            <div key={index}>
              {/* {JSON.stringify(page.data)} */}
              {page.data.map((recipient) => {
                return (
                  <Card
                    className="rounded-none bg-gray-200 transition hover:bg-gray-300"
                    noShadow
                    key={recipient.id}
                  >
                    <div className="flex items-center gap-1">
                      <div className="flex flex-grow items-center gap-2">
                        <RxPerson />{" "}
                        <span className="font-semibold">{`${recipient.mnemonicName}`}</span>{" "}
                        -
                        <div className="text-gray-500">
                          {recipient.accountNumber}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <RxPencil2 className="inline-block h-4 w-4" />
                        <RxCross1
                          className="inline-block h-4 w-4 text-red-400"
                          strokeWidth={0.8}
                        />
                      </div>
                    </div>
                  </Card>
                );
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
