import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import { useGetOTPInvoice } from "@/lib/home/hooks/invoice/useGetOTPInvoice";
import { usePaymentInvoice } from "@/lib/home/hooks/invoice/usePaymentInvoice";
import { paymentInvoiceSchema } from "@/lib/home/schema";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = {
  invoiceId: string;
  hide: boolean;
  toggle: () => void;
};

const TIME_OUT_GET_OTP = 60;

const PayInvoice = ({ invoiceId, hide, toggle }: Props) => {
  const [timeCount, setTimeCount] = useState(TIME_OUT_GET_OTP);
  const { mutateAsync: mutateAsyncPaymentInvoice } = usePaymentInvoice();
  const { mutateAsync: mutateAsyncGetOTPInvoice } = useGetOTPInvoice();
  const formik = useFormik({
    initialValues: {
      invoiceId,
      token: "",
    },
    validationSchema: toFormikValidationSchema(paymentInvoiceSchema),
    onSubmit: async (values) => {
      toast.promise(
        mutateAsyncPaymentInvoice({
          invoiceId: values.invoiceId,
          token: values.token,
        }),
        {
          loading: "Loading payment invoice...",
          success: () => {
            formik.resetForm();
            toggle();
            return "Payment successfully";
          },
          error: (e) => {
            return e.message || "Failed to payment invoice";
          },
        }
      );
    },
  });

  const handleSendOTP = async () => {
    const res = await mutateAsyncGetOTPInvoice();

    try {
      toast.success(res.message);
      setTimeCount(TIME_OUT_GET_OTP);
      const interval = setInterval(() => {
        setTimeCount((prev) => --prev);
      }, 1000);
      setTimeout(() => {
        setTimeCount(TIME_OUT_GET_OTP);
        clearInterval(interval);
      }, TIME_OUT_GET_OTP * 1000);
    } catch (e) {
      toast.error("Error when send otp");
      console.log(e);
    }
  };

  return (
    <Modal title="Pay Invoice" hide={hide} toggle={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="token"
          placeholder="OTP"
          onChange={formik.handleChange}
          value={formik.values.token}
          error={formik.errors.token}
        />
        <span
          onClick={handleSendOTP}
          className="p-2 text-blue-500 hover:cursor-pointer hover:opacity-50"
        >
          {timeCount === TIME_OUT_GET_OTP
            ? "Get OTP"
            : `Wating ${timeCount} second`}
        </span>
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

export default PayInvoice;
