import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useQueryInvoice as useQueryTransactionPayment } from "@/lib/home/hooks/invoice/useQueryInvoice";
import { useQueryTransactionTransfer } from "@/lib/home/hooks/transaction/useQueryTransactionTransfer";
import classNames from "classnames";
import moment from "moment";
import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import TransactionCard from "./TransactionCard";
const LITMIT = 5;

function TransactionsManager() {
  const options = [
    {
      label: "Received",
      value: "received",
    },
    {
      label: "Sent",
      value: "sent",
    },
    {
      label: "Payment",
      value: "payment",
    },
  ];
  const [selected, setSelected] = React.useState(options[0]?.value);
  const [pageTrans, setPageTrans] = React.useState(1);
  const [pagePayment, setPagePayment] = React.useState(1);

  const { data: dataTransfer, isLoading: isLoadingTransfer } =
    useQueryTransactionTransfer({
      type: selected === "payment" ? "received" : selected || "",
      limit: LITMIT,
      offset: (pageTrans - 1) * LITMIT,
    });

  const { data: dataPayment, isLoading: isLoadingPayment } =
    useQueryTransactionPayment({
      type: "received",
      limit: LITMIT,
      offset: (pagePayment - 1) * LITMIT,
    });
  const metadata =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    selected === "payment" ? dataPayment?.metadata : dataTransfer?.metadata;
  const totalPage = Math.ceil(metadata?.total / LITMIT) || 1;
  const isLoading =
    selected === "payment" ? isLoadingPayment : isLoadingTransfer;
  const data = selected === "payment" ? dataPayment : dataTransfer;

  const lastMonth = moment().subtract(1, "months").format("MMMM Do YYYY");

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <Heading>Transactions from {lastMonth}</Heading>
          <div className="flex items-center">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelected(option.value);
                  setPageTrans(1);
                  setPagePayment(1);
                }}
                className={`${
                  selected === option.value ? "bg-blue-500" : "bg-gray-300"
                } mr-1 rounded-lg py-2 px-4 font-semibold text-white`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data?.data.map((transaction: any) => {
            return (
              <div key={transaction.id}>
                <TransactionCard
                  transactions={transaction}
                  type={selected || "received"}
                />
              </div>
            );
          })
        )}
      </Card>
      <div className="m-6 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              {pagePayment === 1 && pageTrans === 1 ? (
                <div className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                  <MdNavigateBefore className="h-5 w-5" />
                </div>
              ) : (
                <div
                  className="rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  onClick={() => {
                    selected === "payment"
                      ? setPagePayment(pagePayment - 1)
                      : setPageTrans(pageTrans - 1);
                  }}
                >
                  <MdNavigateBefore className="h-5 w-5" />
                </div>
              )}
            </li>
            {Array(totalPage)
              .fill(0)
              .map((_, index) => {
                const pageNumber = index + 1;
                const page = selected === "payment" ? pagePayment : pageTrans;
                const isActive = page === pageNumber;
                return (
                  <li key={pageNumber}>
                    <div
                      className={classNames(
                        "border border-gray-300 py-2 px-3  leading-tight hover:bg-gray-100 hover:text-gray-700",
                        {
                          "bg-gray-100 text-gray-700": isActive,
                          "bg-white text-gray-500": !isActive,
                        }
                      )}
                      onClick={() => {
                        selected === "payment"
                          ? setPagePayment(pageNumber)
                          : setPageTrans(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </div>
                  </li>
                );
              })}
            <li>
              {pagePayment === totalPage || pageTrans === totalPage ? (
                <div className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                  <MdNavigateNext className="h-5 w-5" />
                </div>
              ) : (
                <div
                  className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  onClick={() => {
                    selected === "payment"
                      ? setPagePayment(pagePayment + 1)
                      : setPageTrans(pageTrans + 1);
                  }}
                >
                  <MdNavigateNext className="h-5 w-5" />
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default TransactionsManager;
