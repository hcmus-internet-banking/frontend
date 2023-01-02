import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useQueryGetTransactions } from "@/lib/home/hooks/transaction/useQueryGetTransactions";

import React from "react";
import TransactionCard from "./TransactionCard";

function TransactionsManager() {
  const options = [
    {
      label: "Received",
      value: "receive",
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
        {transactionsQuery.isLoading ? (
          <Spinner />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          transactionsQuery.data?.data.map((transaction: any) => {
            return (
              <div key={transaction.id}>
                <TransactionCard
                  transactions={transaction}
                  type={selected || "receive"}
                />
              </div>
            );
          })
        )}
        {/* pagination */}
      </Card>
    </>
  );
}

export default TransactionsManager;
