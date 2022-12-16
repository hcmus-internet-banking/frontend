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

function InternalTransfer() {
  const { firstName, lastName } = useAppSelector<any>(selectUser);
  const { value, toggle } = useToggle(true);
  const [accountName, setAccountName] = React.useState("");
  const { mutateAsync } = UseCreateInternalTransfer();

  const formik = useFormik({
    initialValues: {
      to: "",
      amount: "",
      message: `${firstName} ${lastName} chuyển tiền cho bạn`,
    },
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(createInternalTransferSchema),

    onSubmit: async (values) => {
      toast.promise(
        mutateAsync({
          to: values.to,
          amount: values.amount,
          message: values.message,
        }),
        {
          loading: "Update recipient...",
          success: () => {
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

  const setValues = (values: any) => {
    formik.setFieldValue("to", values);
  };

  return (
    <>
      <RecipientSelector hide={value} toggle={toggle} setValues={setValues} />
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
                toggle();
              }}
            >
              <RiContactsBookFill className="h-8 w-8" />
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
                label: "Nguoi nhan tra phi",
                value: "sender",
              },
              {
                label: "Nguoi gui tra phi",
                value: "receiver",
              },
            ]}
            title="Phí chuyển tiền"
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

          <Button
            className="focus:ring-indigo "
            type="submit"
            disabled={
              !!formik.errors.to ||
              !!formik.errors.amount ||
              !formik.values.to ||
              !formik.values.amount
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
