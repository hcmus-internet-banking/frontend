import { Invoice } from "@/lib/home/hooks/invoice/types";

type Props = {
  invoice: Invoice;
};

const Invoice = ({ invoice }: Props) => {
  return (
    <>
      <div className="hover:bg-gray-20 flex p-2 duration-300 ease-linear hover:cursor-pointer hover:rounded-md">
        <span className="w-1/4 text-sm font-semibold">
          {`${invoice.creator.firstName} ${invoice.creator.lastName}`}
        </span>
        <span className="w-1/4 text-sm font-medium text-gray-500">
          {invoice.creator.accountNumber}
        </span>
        <span className="w-1/4 text-sm font-medium text-gray-500">
          {invoice.amount} $
        </span>
        <span className="w-1/4 text-center text-sm font-medium text-gray-500">
          {invoice.message}
        </span>
      </div>
    </>
  );
};

export default Invoice;
