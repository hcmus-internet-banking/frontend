import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import useToggle from "@/lib/common/hooks/useToggle";
import { useInfinityQueryInvoiceList } from "@/lib/home/hooks/invoice/useInfinityQueryInvoiceList";
import React from "react";
import { RxPlus } from "react-icons/rx";
import Recipient from "../recipient/Recipient";
import CreateInvoice from "./CreateInvoice";

const InvoiceManager = () => {
  const { value, toggle } = useToggle(true);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryInvoiceList({
      limit: 4,
      offset: 0,
    });

  return (
    <>
      <CreateInvoice hide={value} toggle={toggle} />

      <Card className="max-w-lg bg-gray-100" noShadow>
        <div className="flex justify-between">
          <Heading>Invoice List</Heading>
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

export default InvoiceManager;
