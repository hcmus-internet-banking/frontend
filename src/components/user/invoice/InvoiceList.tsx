import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useInfinityQueryInvoiceList } from "@/lib/home/hooks/invoice/useInfinityQueryInvoiceList";
import Invoice from "./Invoice";
import Button from "@/components/common/Button/Button";
import Select from "@/components/common/Select/Select";
import { useState } from "react";

const options = [
  { label: "Bản thân tạo", value: "created" },
  { label: "Người khác nhắc nợ", value: "received" },
];

const InvoiceList = () => {
  const [type, setType] = useState("created");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryInvoiceList({
      type,
      limit: 4,
      offset: 0,
    });

  const handleSelectType = (e: any) => {
    setType(e.target?.value);
  };

  return (
    <Card className="flex w-1/2 flex-col content-between bg-gray-100" noShadow>
      <div className="grow">
        <div className="flex justify-between">
          <Heading>Invoice List</Heading>
          <div className="w-2/5">
            <Select
              title="Select receiver or sender"
              name="type"
              onChange={handleSelectType}
              value={type}
              options={options}
            />
          </div>
        </div>
        <div className="hover:bg-gray-20 flex justify-around pt-6 duration-300 ease-linear hover:cursor-pointer hover:rounded-md">
          <span className="text-sm font-semibold">Name</span>
          <span className="text-sm font-medium">Account Number</span>
          <span className="text-sm font-medium">Amount</span>
          <span className="text-sm font-medium">Message</span>
        </div>
        <div className="py-4">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.pages.map((page, index) => (
              <div key={index}>
                {page.data.map((invoice) => {
                  return <Invoice key={invoice.id} invoice={invoice} />;
                })}
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        {hasNextPage ? (
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Load More
          </Button>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500">No more invoices</div>
          )
        )}
      </div>
    </Card>
  );
};

export default InvoiceList;
