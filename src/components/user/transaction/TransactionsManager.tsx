import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useQueryGetTransactions } from "@/lib/home/hooks/transaction/useQueryGetTransactions";
import React from "react";

function TransactionsManager() {
  const options = [
    {
      label: "Received",
      value: "receive",
    },
    {
      label: "Transfer",
      value: "transfer",
    },
    {
      label: "Payment",
      value: "payment",
    },
  ];
  const [selected, setSelected] = React.useState([options[0]?.value]);

  const handleOnSelected = (value: string) => {
    selected.includes(value)
      ? setSelected(selected.filter((item) => item !== value))
      : setSelected([...selected, value]);
  };

  const transactionsQuery = useQueryGetTransactions({
    limit: 10,
    offset: 0,
  });

  console.log(transactionsQuery.data);

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
                  handleOnSelected(option.value);
                }}
                className={`${
                  selected.includes(option.value)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                } mr-2 rounded-lg px-4 py-2`}
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
                <div>{transaction.id}</div>
                <div>{transaction.amount}</div>
                <div>{transaction.message}</div>
                <div>{transaction.type}</div>
                <div>{transaction.fromCustomer.accountNumber}</div>
                <div>{transaction.createdAt}</div>
              </div>
            );
          })
        )}
      </Card>
    </>
  );
}

export default TransactionsManager;
