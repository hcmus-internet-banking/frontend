import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import Select from "@/components/common/Select/Select";
import RecipientSelector from "@/components/home/transfer/RecipientSelector";
import useToggle from "@/lib/common/hooks/useToggle";
import { useCreateInvoice } from "@/lib/home/hooks/invoice/useCreateInvoice";
import { useQueryGetCustomerByBankNumber } from "@/lib/home/hooks/useQueryCustomerByBankNumber";
import { createInvoiceSchema } from "@/lib/home/schema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiContactsBookFill } from "react-icons/ri";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = {
  hide: boolean | undefined;
  toggle: any;
};

const options = [
  { label: "Internal", value: "true" },
  { label: "External", value: "false" },
];

const CreateInvoice = ({ hide, toggle }: Props) => {
  const { mutateAsync } = useCreateInvoice();
  const [isDisable, setIsDisable] = useState(true);
  const { value: isSubmitted, setValue: setIsSubmitted } = useToggle(false);
  const { value: hideRecipientSelector, toggle: toggleRecipientSelector } =
    useToggle(true);
  const [name, setName] = useState<string>("");

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
          message: values.message || " ",
        }),
        {
          loading: "Creating debt...",
          success: () => {
            formik.resetForm();
            toggle();
            return "Debt created";
          },
          error: (e) => {
            return e.message || "Failed to create debt";
          },
        }
      );
    },
  });

  const { isFetching } = useQueryGetCustomerByBankNumber(
    formik.values.accountNumber,
    {
      onSuccess: (res: any) => {
        setName(`${res.firstName} ${res.lastName}`);

        formik.setFieldError("accountNumber", "");
      },
      onError: (e: any) => {
        formik.setFieldError(
          "accountNumber",
          e?.error?.message || "Invalid customer"
        );
        setIsDisable(!isDisable);
      },
    }
  );

  useEffect(() => {
    if (isFetching) {
      formik.setFieldError("accountNumber", "Loading...");
      setName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <>
      <RecipientSelector
        hide={hideRecipientSelector}
        toggle={toggleRecipientSelector}
        setValues={setName}
      />

      <Modal title="Create Invoice" hide={hide} toggle={toggle}>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-3">
            <Select
              name="isInternalBank"
              onChange={formik.handleChange}
              error={formik.errors.isInternalBank}
              value={formik.values.isInternalBank}
              options={options}
            />
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
                  toggle();
                  toggleRecipientSelector();
                }}
              >
                <RiContactsBookFill className=" h-8 w-8" />
              </Button>
            </div>

            <Input
              outerClassNames="flex-grow"
              placeholder="Name"
              value={name}
              disabled
              required={false}
            />
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
          </div>
          <Modal.Bottom>
            <Button type="button" onClick={toggle} preset="outlined">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Modal.Bottom>
        </form>
      </Modal>
    </>
  );
};

export default CreateInvoice;
