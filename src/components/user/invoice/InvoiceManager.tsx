import CreateInvoice from "./CreateInvoice";
import InvoiceList from "./InvoiceList";

const InvoiceManager = () => {
  return (
    <>
      <div className="flex w-full flex-col space-y-4">
        <CreateInvoice />
        <InvoiceList />
      </div>
    </>
  );
};

export default InvoiceManager;
