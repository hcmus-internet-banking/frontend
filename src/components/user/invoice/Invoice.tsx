import React from "react";

export interface Invoice {
  id: string;
  accountNumber: string;
  mnemonicName: string;
  amount: number;
  creator: any;
}

type Props = {
  invoice: Invoice;
};

const Invoice = ({ invoice }: Props) => {
  return (
    <>
      <div className="flex content-around items-center duration-300 ease-linear hover:cursor-pointer hover:rounded-md hover:bg-gray-200">
        <div className="flex grow justify-between p-2">
          <span className="font-semibold">
            {invoice.creator.firstName + " " + invoice.creator.lastName}
          </span>
          <span className="pr-8 text-sm font-medium text-gray-500">
            {invoice.accountNumber}
          </span>
          <span className="pr-8 text-sm font-medium text-gray-500">
            {invoice.amount}
          </span>
        </div>
      </div>
    </>
  );
};

export default Invoice;
