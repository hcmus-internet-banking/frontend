import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Spinner from "@/components/common/Spinner/Spinner";
import { useQueryGetTransactions } from "@/lib/home/hooks/transaction/useQueryGetTransactions";
import moment from "moment";
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
          <div className="grid gap-2 md:grid-cols-2">
            {(transactionsQuery.data as any)?.data.map((transaction: any) => {
              return (
                <div
                  key={transaction.id}
                  className="flex items-center rounded-md bg-white p-4 shadow"
                >
                  <div>
                    <div className="w-32 text-2xl tracking-wider text-green-500">
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
    </>
  );
}

export default TransactionsManager;

TransactionsManager.title = "Transactions";
