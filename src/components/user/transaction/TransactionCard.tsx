import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import React from "react";
import AmountTrans from "./AmountTrans";
import InforTrans from "./InforTrans";

type Props = {
  transactions: any;
  type: string;
};

const TransactionCard = ({ transactions, type }: Props) => {
  const dateTimeFormat = (date: string) => {
    // dd/mm/yyyy hh:mm:ss
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const labelTime = type === "payment" ? "Paid at " : "Created at ";

  return (
    <>
      <Card>
        <Heading className="flex flex-row-reverse justify-between rounded-md bg-slate-200 px-2">
          <span className="text-base font-semibold opacity-70">
            {labelTime}
            {dateTimeFormat(
              type === "payment" ? transactions.paidAt : transactions.createdAt
            )}
          </span>
          <span className="flex items-center">
            Message: {transactions.message}
          </span>
        </Heading>
        <div className="flex items-center justify-between">
          <InforTrans
            transType={type}
            fromCustomer={
              type === "payment"
                ? transactions.creator
                : transactions.fromCustomer
            }
            toCustomer={transactions.toCustomer}
          />
          <div className="flex items-center">
            <AmountTrans value={transactions.amount} transType={type} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default TransactionCard;
