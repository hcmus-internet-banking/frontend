import CreateInvoice from "./CreateInvoice";
import InvoiceList from "./InvoiceList";

const InvoiceManager = () => {
  return (
    <>
      <div className="flex w-full space-x-2 space-y-2">
        <InvoiceList />
        <CreateInvoice />
      </div>
    </>
  );
};

export default InvoiceManager;
