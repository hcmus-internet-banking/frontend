import { createInternalTransferSchema } from "@/lib/home/schema";
import { useFormik } from "formik";
import React from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppSelector } from "@/store/store";
import { selectUser } from "@/store/auth";
import { RiContactsBookFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import RecipientSelector from "./RecipientSelector";
import useToggle from "@/lib/common/hooks/useToggle";
import { useQueryGetCustomerByBankNumber as useQueryCustomerByBankNumber } from "@/lib/home/hooks/useQueryCustomerByBankNumber";
import { useCreateInternalTransfer as UseCreateInternalTransfer } from "@/lib/home/hooks/transfer/useCreateInternalTransfer";
import Select from "@/components/common/Select/Select";
import { useGetOTPTransfer as UseGetOTPTransfer } from "@/lib/home/hooks/transfer/useGetOTPTransfer";
import { useQueryRecipientList } from "@/lib/home/hooks/recipient/useQueryGetRecipients";
import { useUpdateRecipient } from "@/lib/home/hooks/recipient/useUpdateRecipient";

const TIME_OUT_GET_OTP = 60;

function InternalTransfer() {
  const { firstName, lastName } = useAppSelector<any>(selectUser);

  const { data: recipientList } = useQueryRecipientList();

  const {
    value: isHideRecipientSelectorToggle,
    toggle: RecipientSelectorToggle,
  } = useToggle(true);
  const [accountName, setAccountName] = React.useState("");
  const [timeCount, setTimeCount] = React.useState(TIME_OUT_GET_OTP);
  const { mutateAsync: mutateInternalTransfer } = UseCreateInternalTransfer();
  const { mutateAsync: mutateGetOTP } = UseGetOTPTransfer();
  const { mutateAsync: mutateRecipient } = useUpdateRecipient();

  const handleSendOTP = () => {
    mutateGetOTP()
      .then((res) => {
        toast.success(res.message);
        setTimeCount(TIME_OUT_GET_OTP);
        const interval = setInterval(() => {
          setTimeCount((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
          setTimeCount(TIME_OUT_GET_OTP);
          clearInterval(interval);
        }, TIME_OUT_GET_OTP * 1000);
      })
      .catch((e) => {
        console.log("error", e);
        toast.error(e?.message || "Loi khi gui OTP");
      });
  };

  const options = [
    {
      label: "paid for Sender",
      value: "sender",
    },
    {
      label: "paid for Receiver",
      value: "receiver",
    },
  ];

  const formik = useFormik({
    initialValues: {
      to: "",
      amount: "",
      message: `${firstName} ${lastName} chuyển tiền cho bạn`,
      token: "",
      payer: options[0]?.value,
    },
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(createInternalTransferSchema),

    onSubmit: async (values) => {
      console.log(values);
      toast.promise(
        mutateInternalTransfer({
          to: values.to,
          amount: values.amount,
          message: values.message,
          token: values.token,
          payer: values.payer === "receiver" ? "receiver" : "sender",
        }),
        {
          loading: "dang thuc hien giao dich...",
          success: () => {
            if (
              recipientList?.data.find(
                (item) => item?.accountNumber !== values.to
              )
            ) {
              confirm("Do you want to add this recipient to your list?") &&
                mutateRecipient({
                  id: values.to,
                  mnemonicName: accountName,
                });
            }
            formik.resetForm();
            setAccountName("");
            return "chuyen tien thanh cong";
          },
          error: (e) => {
            console.log("error", e);
            return "chuyen tien that bai";
          },
        }
      );
    },
  });

  const { isLoading, data } = useQueryCustomerByBankNumber(formik.values.to, {
    onSuccess: (res: any) => {
      setAccountName(`${res.firstName} ${res.lastName}`);
    },
    onError: (e: any) => {
      formik.setFieldError(
        "to",
        e?.error?.message || "Khong tim thay tai khoan"
      );
    },
  });

  const setRecipientSelectorValue = (values: any) => {
    formik.setFieldValue("to", values);
  };

  return (
    <>
      <RecipientSelector
        hide={isHideRecipientSelectorToggle}
        toggle={RecipientSelectorToggle}
        setValues={setRecipientSelectorValue}
      />
      <form onSubmit={formik.handleSubmit}>
        <section className="space-y-2 pr-4">
          <div className="relative inline-block w-full">
            <Input
              className="w-4/5"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              placeholder="Số tài khoản"
              error={formik.errors.to}
              clearable={false}
            />
            <Button
              type="button"
              className="absolute right-1 top-1 flex cursor-pointer items-center  rounded-lg px-4 py-2 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-opacity-80"
              onClick={() => {
                RecipientSelectorToggle();
              }}
            >
              <RiContactsBookFill className=" h-8 w-8" />
            </Button>
          </div>

          {!isLoading && data && (
            <Input
              className="w-full"
              name="accountNumber"
              value={accountName}
              placeholder="Tên người nhận"
              disabled={true}
            />
          )}

          <Input
            className="w-full"
            name="amount"
            // autoComplete="cc-type"
            value={formik.values.amount}
            onChange={formik.handleChange}
            placeholder="Số tiền"
            error={formik.errors.amount}
          />
          <Select
            options={[
              {
                label: "paid for Sender",
                value: "sender",
              },
              {
                label: "paid for Receiver",
                value: "receiver",
              },
            ]}
            title="Transfer Fee"
            name="payer"
            value={formik.values.payer || "sender"}
            onChange={formik.handleChange}
          />

          <Input
            className="w-full"
            name="description"
            // autoComplete="cc-type"
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder="Nội dung chuyển tiền"
            error={formik.errors.message}
          />

          <div className="relative inline-block w-full">
            <Input
              name="token"
              value={formik.values.token}
              onChange={formik.handleChange}
              placeholder="Nhập mã OTP"
              error={formik.errors.token}
              clearable={false}
            />
            <span
              className=" hover: absolute right-0 cursor-pointer hover:text-blue-500 hover:underline"
              onClick={handleSendOTP}
            >
              {timeCount === TIME_OUT_GET_OTP
                ? "Gửi OTP Qua Email"
                : `Gui OTP sau ${timeCount}s`}
            </span>
          </div>

          <Button
            className="focus:ring-indigo "
            type="submit"
            disabled={
              !!formik.errors.to ||
              !!formik.errors.amount ||
              !formik.values.to ||
              !formik.values.amount ||
              !!formik.errors.token ||
              !formik.values.token
            }
          >
            <span>Chuyển tiền</span>
          </Button>
        </section>
      </form>
    </>
  );
}

export default InternalTransfer;
