import useToggle from "@/lib/common/hooks/useToggle";
import { Invoice } from "@/lib/home/hooks/invoice/types";
import { RxCross1, RxPencil2 } from "react-icons/rx";
import CancelInvoice from "./CancelInvoice";
import PaymentInvoice from "./PaymentInvoice";

type Props = {
  invoice: Invoice;
};

const Invoice = ({ invoice }: Props) => {
  const { value: hideCancelModal, toggle: toggleCancel } = useToggle(true);
  const { value: hidePaymentModal, toggle: togglePayment } = useToggle(true);

  const handleCancelInvoice = () => {
    toggleCancel();
  };

  const handlePaymentInvoice = () => {
    togglePayment();
  };

  return (
    <>
      <CancelInvoice
        id={invoice.id}
        hide={hideCancelModal}
        toggle={toggleCancel}
      />
      <PaymentInvoice
        invoiceId={invoice.id}
        hide={hidePaymentModal}
        toggle={togglePayment}
      />

      <div className="hover:bg-gray-20 flex w-full p-2 duration-300 ease-linear hover:cursor-pointer hover:rounded-md">
        <span className="w-1/6 text-center text-sm font-semibold">
          {invoice.id}
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

        <div className="m-auto flex justify-around gap-x-4 p-2">
          <RxPencil2
            className="h-5 w-5 hover:cursor-pointer hover:opacity-25"
            onClick={handlePaymentInvoice}
          />
          <RxCross1
            className="h-5 w-5 text-red-400 hover:cursor-pointer hover:opacity-25"
            strokeWidth={0.8}
            onClick={handleCancelInvoice}
          />
        </div>
      </div>
    </>
  );
};

export default Invoice;
