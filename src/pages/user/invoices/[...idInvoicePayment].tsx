import Spinner from "@/components/common/Spinner/Spinner";
import { useGetPaymentInvoice } from "@/lib/home/hooks/invoice/useGetPaymentInvoice";
import { useRouter } from "next/router";
import React from "react";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { useGetOTPInvoice } from "@/lib/home/hooks/invoice/useGetOTPInvoice";
import { usePaymentInvoice } from "@/lib/home/hooks/invoice/usePaymentInvoice";
import { paymentInvoiceSchema } from "@/lib/home/schema";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Card from "@/components/common/Card/Card";
import { Invoice } from "@/lib/home/hooks/invoice/types";
import Link from "next/link";
import classNames from "classnames";

const TIME_OUT_GET_OTP = 60;

const PaymentInvoice = () => {
  const router = useRouter();
  const idInvoicePayment = router.query.idInvoicePayment as string;
  const { data, isLoading } = useGetPaymentInvoice({
    idInvoice: idInvoicePayment,
  });

  const invoice = data as Invoice;

  const [timeCount, setTimeCount] = useState(TIME_OUT_GET_OTP);
  const { mutateAsync: mutateAsyncPaymentInvoice } = usePaymentInvoice();
  const { mutateAsync: mutateAsyncGetOTPInvoice } = useGetOTPInvoice();

  const formik = useFormik({
    initialValues: {
      invoiceId: "",
      token: "",
    },
    validationSchema: toFormikValidationSchema(paymentInvoiceSchema),
    onSubmit: async (values) => {
      toast.promise(
        mutateAsyncPaymentInvoice({
          invoiceId: idInvoicePayment,
          token: values.token,
        }),
        {
          loading: "Loading payment invoice...",
          success: () => {
            formik.resetForm();
            router.push("/user/invoices");
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
    if (timeCount === TIME_OUT_GET_OTP) {
      toast.promise(mutateAsyncGetOTPInvoice(), {
        loading: "Loading send otp...",
        success: () => {
          setTimeCount(TIME_OUT_GET_OTP);
          const interval = setInterval(() => {
            setTimeCount((prev) => --prev);
          }, 1000);
          setTimeout(() => {
            setTimeCount(TIME_OUT_GET_OTP);
            clearInterval(interval);
          }, TIME_OUT_GET_OTP * 1000);
          return "Send otp successfully";
        },
        error: (e) => {
          return e.message || "Failed to send otp";
        },
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Card className="center flex w-1/2 flex-col justify-center space-y-4">
            <h1 className="text-lg font-bold">Payment Invoice</h1>
            <span className="font-semibold">
              ID:
              <span className="font-normal"> #{invoice.id}</span>
            </span>
            <span className="font-semibold">
              Creator:
              <span className="font-normal">
                <span> </span>
                {invoice?.creator?.firstName} {invoice?.creator?.lastName}
              </span>
            </span>
            <span className="font-semibold">
              Message:
              <span className="font-normal"> {invoice?.message}</span>
            </span>
            <span className="font-semibold">
              Amount:
              <span className="font-normal"> ${invoice?.amount}</span>
            </span>
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
                className={classNames(
                  "text-blue-500 hover:cursor-pointer hover:opacity-50",
                  {
                    "opacity-50": timeCount !== TIME_OUT_GET_OTP,
                    "hover:cursor-default": timeCount !== TIME_OUT_GET_OTP,
                  }
                )}
              >
                {timeCount === TIME_OUT_GET_OTP
                  ? "Send OTP to mail"
                  : `Wating ${timeCount} second`}
              </span>
              <div className="flex justify-end space-x-4">
                <Link href="/user/invoices">
                  <Button type="button" preset="outlined">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">Confirm</Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

PaymentInvoice.title = "Payment Invoice";

export default PaymentInvoice;
