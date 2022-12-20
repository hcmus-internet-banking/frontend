import useToggle from "@/lib/common/hooks/useToggle";
import { RxCross1 } from "react-icons/rx";
import CancelInvoice from "./CancelInvoice";
import PayInvoice from "./PayInvoice";

type Props = {
  data: any;
};

const MyInvoice = ({ data }: Props) => {
  const { value: hideCancelModal, toggle: toggleCancel } = useToggle(true);
  const { value: hidePaymentModal, toggle: togglePayment } = useToggle(true);

  const handleCancelInvoice = () => {
    toggleCancel();
  };

  return (
    <>
      <div className="flex rounded bg-gray-300 p-4 ">
        <span className="w-1/6 text-center text-base font-semibold">ID</span>
        <span className="w-1/6 text-center text-base font-medium">Name</span>
        <span className="w-1/6 text-center text-base font-medium">
          Account Number
        </span>
        <span className="w-1/6 text-center text-base font-medium">Amount</span>
        <span className="w-1/6 text-center text-base font-medium">Message</span>
        <span className="w-1/6 text-center text-base font-medium">Action</span>
      </div>
      <div className="flex flex-col content-evenly">
        {data?.pages.map((page: any) =>
          page?.data?.map((invoice: any, index: any) => (
            <div key={index}>
              <CancelInvoice
                id={invoice.id}
                hide={hideCancelModal}
                toggle={toggleCancel}
              />
              <PayInvoice
                invoiceId={invoice.id}
                hide={hidePaymentModal}
                toggle={togglePayment}
              />

              <div className="flex w-full space-y-2 p-2 duration-300 ease-linear hover:cursor-pointer hover:rounded-md hover:bg-gray-200">
                <span className="w-1/6 pt-2 text-center text-sm font-semibold">
                  #{invoice.id}
                </span>
                <span className="w-1/6 text-center text-sm font-semibold">
                  {`${invoice.customer.firstName} ${invoice.customer.lastName}`}
                </span>
                <span className="w-1/6 text-center text-sm font-medium text-gray-500">
                  {invoice.customer.accountNumber}
                </span>
                <span className="w-1/6 text-center text-sm font-medium text-gray-500">
                  {invoice.amount}$
                </span>
                <span className="w-1/6 text-center text-sm font-medium text-gray-500">
                  {invoice.message}
                </span>

                <div className="m-auto flex justify-around gap-x-4 p-2">
                  <RxCross1
                    className="h-5 w-5 text-red-400 hover:cursor-pointer hover:opacity-25"
                    strokeWidth={0.8}
                    onClick={handleCancelInvoice}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyInvoice;
