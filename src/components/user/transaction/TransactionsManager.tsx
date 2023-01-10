import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useQueryGetTransactions } from "@/lib/home/hooks/transaction/useQueryGetTransactions";
import moment from "moment";
import React from "react";
import classNames from "classnames";
import { useQueryTransactionTransfer } from "@/lib/home/hooks/transaction/useQueryTransactionTransfer";
import { MdNavigateBefore } from "react-icons/md";
const LIMIT = 5;

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
  const [page, setPage] = React.useState(1);

  const { data: dataTransfer, isLoading: isLoadingTransfer } =
    useQueryTransactionTransfer({
      type: selected || "",
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
    });

  const transactionsQuery = useQueryGetTransactions({
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <Heading>Transactions</Heading>
          <div className="flex items-center">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelected(option.value);
                  setPage(1);
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
        {isLoadingTransfer ? (
          <Spinner />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <div className="grid gap-2 md:grid-cols-2">
            {(transactionsQuery.data as any)?.data.map((transaction: any) => {
              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 rounded-md bg-white p-4 shadow"
                >
                  <div>
                    <div className="w-32 font-mono text-2xl tracking-wider text-green-500">
                      +{Intl.NumberFormat("en-US").format(transaction.amount)}$
                    </div>
                  </div>
                  <div className="grow">
                    <div className="text-xs text-gray-700">
                      <div className="text-lg font-light">
                        {transaction.fromCustomer.firstName}{" "}
                        {transaction.fromCustomer.lastName}
                        {" - "}
                        {transaction.fromCustomer.accountNumber}
                      </div>
                      <div>
                        <b>Message:</b>
                        <p>{transaction.message}</p>
                      </div>
                      <div className="my-2"></div>
                      <div className="text-gray-500">
                        {transaction.type === "INTERNAL"
                          ? "Cùng ngân hàng"
                          : "Liên ngân hàng"}{" "}
                        -{" "}
                        {moment(transaction.createdAt).format(
                          "HH:mm:ss DD/MM/YYYY"
                        )}
                        <div>#{transaction.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
      <div className="m-6 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              {page === 1 ? (
                <div className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                  <MdNavigateBefore className="h-5 w-5" />
                </div>
              ) : (
                <div
                  className="rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  onClick={() => {
                    setPage(page - 1);
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
                        setPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </div>
                  </li>
                );
              })}
            <li>
              {page === totalPage ? (
                <div className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                  <MdNavigateNext className="h-5 w-5" />
                </div>
              ) : (
                <div
                  className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  onClick={() => {
                    setPage(page + 1);
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

TransactionsManager.title = "Transactions";
