import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import Input from "@/components/common/Input/Input";
import RecipientSelector from "@/components/home/transfer/RecipientSelector";
import useToggle from "@/lib/common/hooks/useToggle";
import { useCreateInvoice } from "@/lib/home/hooks/invoice/useCreateInvoice";
import { useQueryGetCustomerByBankNumber } from "@/lib/home/hooks/useQueryCustomerByBankNumber";
import { createInvoiceSchema } from "@/lib/home/schema";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RiContactsBookFill } from "react-icons/ri";
import { toFormikValidationSchema } from "zod-formik-adapter";

const CreateInvoice = () => {
  const { mutateAsync } = useCreateInvoice();
  const [accountName, setAccountName] = useState<string>("");
  const [isDisable, setIsDisable] = useState(true);
  const { value: isSubmitted, setValue: setIsSubmitted } = useToggle(false);
  const { value: hideRecipientSelector, toggle: toggleRecipientSelector } =
    useToggle(true);

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      amount: "",
      isInternalBank: "true",
      message: "",
    },
    validateOnBlur: isSubmitted,
    validateOnChange: isSubmitted,
    validationSchema: toFormikValidationSchema(createInvoiceSchema),
    onSubmit: async (values) => {
      setIsSubmitted(true);

      toast.promise(
        mutateAsync({
          accountNumber: values.accountNumber,
          amount: values.amount,
          isInternalBank: values.isInternalBank,
          message: values.message || "Pay my invoice",
        }),
        {
          loading: "Creating invoice...",
          success: () => {
            formik.resetForm();
            return "Invoice created";
          },
          error: (e) => {
            return e.message || "Failed to create invoice";
          },
        }
      );
    },
  });

  const { isLoading, data } = useQueryGetCustomerByBankNumber(
    formik.values.accountNumber,
    {
      onSuccess: (res: any) => {
        setAccountName(`${res.firstName} ${res.lastName}`);

        formik.setFieldError("accountNumber", "");
      },
      onError: (e: any) => {
        formik.setFieldError(
          "accountNumber",
          e?.error?.message || "Not found customer"
        );
        setIsDisable(!isDisable);
      },
    }
  );

  const setRecipientSelectorValue = (values: any) => {
    formik.setFieldValue("accountNumber", values);
  };

  return (
    <>
      <Card className="grow bg-gray-100 " noShadow>
        <div className="flex justify-between pb-4">
          <Heading>Create invoice</Heading>
        </div>
        <RecipientSelector
          hide={hideRecipientSelector}
          toggle={toggleRecipientSelector}
          setValues={setRecipientSelectorValue}
        />
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-3">
            <div className="flex w-full content-around">
              <Input
                name="accountNumber"
                placeholder="Account Number"
                onChange={formik.handleChange}
                value={formik.values.accountNumber}
                error={formik.errors.accountNumber}
                outerClassNames="grow"
              />
              <Button
                type="button"
                className="my-auto ml-2 cursor-pointer items-center rounded-lg transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-opacity-80"
                onClick={() => {
                  toggleRecipientSelector();
                }}
              >
                <RiContactsBookFill className=" h-8 w-8" />
              </Button>
            </div>
            {!isLoading && data && (
              <Input
                outerClassNames="flex-grow"
                className="w-full"
                name="accountName"
                value={accountName}
                placeholder="Account name"
                disabled={true}
              />
            )}
            <Input
              name="amount"
              placeholder="Amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
              error={formik.errors.amount}
            />
            <Input
              name="message"
              placeholder="Message"
              onChange={formik.handleChange}
              value={formik.values.message}
              error={formik.errors.message}
            />
            <Button
              className="p-4"
              type="submit"
              disabled={
                !!formik.errors.accountNumber ||
                !!formik.errors.amount ||
                !!formik.errors.message ||
                !formik.values.accountNumber ||
                !formik.values.amount ||
                !formik.values.message
              }
            >
              Send
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreateInvoice;
