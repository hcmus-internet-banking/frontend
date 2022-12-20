import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Select from "@/components/common/Select/Select";
import Spinner from "@/components/common/Spinner/Spinner";
import { useInfinityQueryInvoiceList } from "@/lib/home/hooks/invoice/useInfinityQueryInvoiceList";
import { useState } from "react";
import MyInvoice from "./MyInvoice";
import OtherPeopleInvoice from "./OtherPeopleInvoice";

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
    <Card className="flex flex-col content-between bg-gray-100" noShadow>
      <div className="grow">
        <div className="flex justify-between">
          <Heading>Invoice List</Heading>
          <div className="h-fit w-1/5">
            <Select
              title="Select receiver or sender"
              name="type"
              onChange={handleSelectType}
              value={type}
              options={options}
            />
          </div>
        </div>
        <div className="py-4">
          {type === "created" ? (
            isLoading ? (
              <Spinner />
            ) : (
              <MyInvoice data={data} />
            )
          ) : isLoading ? (
            <Spinner />
          ) : (
            <OtherPeopleInvoice data={data} />
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
