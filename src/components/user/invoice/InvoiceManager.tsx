import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useInfinityQueryInvoiceList } from "@/lib/home/hooks/invoice/useInfinityQueryInvoiceList";
import CreateInvoice from "./CreateInvoice";
import Invoice from "./Invoice";

const InvoiceManager = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityQueryInvoiceList({
      limit: 4,
      offset: 0,
    });

  return (
    <>
      <div className="m-4 flex w-full flex-col content-around space-x-4 md:flex-row">
        <Card
          className="flex max-w-lg grow flex-col content-between bg-gray-100"
          noShadow
        >
          <div className="grow">
            <Heading>Debt List</Heading>
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
                <div className="text-center text-gray-500">
                  No more invoices
                </div>
              )
            )}
          </div>
        </Card>
        <CreateInvoice />
      </div>
    </>
  );
};

export default InvoiceManager;
