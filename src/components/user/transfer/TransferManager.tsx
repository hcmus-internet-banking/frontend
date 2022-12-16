import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import useToggle from "@/lib/common/hooks/useToggle";
import { useInfinityQueryTransferList } from "@/lib/home/hooks/transfer/useInfinityQueryTransferList";
import React from "react";
import { RxPlus } from "react-icons/rx";

const TransferManager = () => {
  const { value, toggle } = useToggle(true);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryTransferList({
      limit: 4,
      offset: 0,
    });

  return (
    <>
      <Card className="max-w-lg bg-gray-100" noShadow>
        <div className="flex justify-between">
          <Heading>Transfer List</Heading>
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
                {page.data.map((transfer) => {
                  console.log(transfer);

                  return <></>;
                  //   return <Trasfaer key={recipient.id} recipient={recipient} />;
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

export default TransferManager;
