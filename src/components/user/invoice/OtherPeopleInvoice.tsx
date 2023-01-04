import useToggle from "@/lib/common/hooks/useToggle";
import { RxCross1, RxPaperPlane } from "react-icons/rx";
import CancelInvoice from "./CancelInvoice";
import PayInvoice from "./PayInvoice";
import { useState } from "react";

type Props = {
  data: any;
};

const OtherPeopleInvoice = ({ data }: Props) => {
  const { value: hideCancelModal, toggle: toggleCancel } = useToggle(true);
  const { value: hidePaymentModal, toggle: togglePayment } = useToggle(true);
  const [invoiceId, setInvoiceId] = useState("");

  const handleCancelInvoice = () => {
    toggleCancel();
  };

  const handlePaymentInvoice = () => {
    togglePayment();
  };

  return (
    <>
      <div className="flex rounded bg-gray-300 p-4">
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
        <CancelInvoice
          id={invoiceId}
          hide={hideCancelModal}
          toggle={toggleCancel}
        />
        <PayInvoice
          invoiceId={invoiceId}
          hide={hidePaymentModal}
          toggle={togglePayment}
        />
        {data?.pages.map((page: any) =>
          page?.data?.map((invoice: any, index: any) => (
            <div key={index}>
              <div className="flex w-full space-y-4 p-2 duration-300 ease-linear hover:cursor-pointer hover:rounded-md hover:bg-gray-200">
                <span className="mt-4 w-1/6 text-center text-sm font-semibold">
                  #{invoice.id}
                </span>
                <span className="w-1/6 text-center text-sm font-semibold">
                  {`${invoice.creator.firstName} ${invoice.creator.lastName}`}
                </span>
                <span className="w-1/6 text-center text-sm font-medium text-gray-500">
                  {invoice.creator.accountNumber}
                </span>
                <span className="w-1/6 text-center text-sm font-medium text-gray-500">
                  {invoice.amount} $
                </span>
                <span className="w-1/6 text-center text-sm font-medium text-gray-500">
                  {invoice.message}
                </span>

                <div className="m-auto flex justify-around gap-x-4">
                  <RxCross1
                    className="h-6 w-6 text-red-400 hover:cursor-pointer hover:opacity-25"
                    strokeWidth={0.8}
                    onClick={() => {
                      setInvoiceId(invoice.id);
                      toggleCancel();
                    }}
                  />
                  <RxPaperPlane
                    className="h-6 w-6 hover:cursor-pointer hover:opacity-25"
                    onClick={() => {
                      setInvoiceId(invoice.id);
                      togglePayment();
                    }}
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

export default OtherPeopleInvoice;
