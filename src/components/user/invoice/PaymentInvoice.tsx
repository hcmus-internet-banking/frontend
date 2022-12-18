import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import { usePaymentInvoice } from "@/lib/home/hooks/invoice/usePaymentInvoice";
import { paymentInvoiceSchema } from "@/lib/home/schema";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = {
  invoiceId: string;
  hide: boolean;
  toggle: () => void;
};

const PaymentInvoice = ({ invoiceId, hide, toggle }: Props) => {
  const { mutateAsync } = usePaymentInvoice();
  const formik = useFormik({
    initialValues: {
      invoiceId,
      token: "",
    },
    validationSchema: toFormikValidationSchema(paymentInvoiceSchema),
    onSubmit: async (values) => {
      toast.promise(
        mutateAsync({
          invoiceId: values.invoiceId,
          token: values.token,
        }),
        {
          loading: "Loading payment invoice...",
          success: () => {
            formik.resetForm();
            return "Payment successfully";
          },
          error: (e) => {
            return e.message || "Failed to payment invoice";
          },
        }
      );
    },
  });

  return (
    <Modal title="Confirm pay invoice" hide={hide} toggle={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="token"
          placeholder="OTP"
          onChange={formik.handleChange}
          value={formik.values.token}
          error={formik.errors.token}
        />
        <Modal.Bottom>
          <Button type="button" onClick={toggle} preset="outlined">
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
};

export default PaymentInvoice;
