import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import Select from "@/components/common/Select/Select";
import useToggle from "@/lib/common/hooks/useToggle";
import { useQueryGetCustomerByBankNumber as useQueryCustomerByBankNumber } from "@/lib/home/hooks/useQueryCustomerByBankNumber";
import { useUpdateRecipient } from "@/lib/home/hooks/useUpdateRecipient";
import { createRecipientSchema } from "@/lib/home/schema";
import classNames from "classnames";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "react-use";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = {
  hide: boolean | undefined;
  toggle: any;
};

const CreateRecipient = ({ hide, toggle }: Props) => {
  const { mutateAsync } = useUpdateRecipient();
  const { value: isSubmitted, setValue: setIsSubmitted } = useToggle(false);
  const [isDisable, setIsDisable] = useState(true);
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      mnemonicName: "",
    },
    validateOnBlur: isSubmitted,
    validateOnChange: isSubmitted,
    validationSchema: toFormikValidationSchema(createRecipientSchema),
    onSubmit: async (values) => {
      setIsSubmitted(true);

      toast.promise(
        mutateAsync({
          accountNumber: values.accountNumber,
          mnemonicName: values.mnemonicName,
        }),
        {
          loading: "Creating Recipient...",
          success: () => {
            toggle();
            return "Recipient Created";
          },
          error: (e) => {
            return e.message || "Failed to create recipient";
          },
        }
      );
    },
  });
  const { isFetching } = useQueryCustomerByBankNumber(
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
  const [name, setName] = useState<string>("");
  const [, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (isFetching) {
      formik.setFieldError("accountNumber", "Loading...");
      setName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <Modal title="Create Recipient" hide={hide} toggle={toggle}>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <Select options={[{ label: "Internal", value: "internal" }]} />

        <Input
          name="accountNumber"
          placeholder="Account Number"
          onChange={formik.handleChange}
          value={formik.values.accountNumber}
          error={formik.errors.accountNumber}
          isLoading={isFetching}
        />
        <div className="flex items-center gap-1">
          <Input
            outerClassNames="flex-grow"
            placeholder="Name"
            value={name}
            disabled
          />

          <Button
            size="lg"
            type="button"
            onClick={() => {
              copyToClipboard(name);
              toast.success(`Copied ${name} to clipboard`);
            }}
          >
            Copy
          </Button>
        </div>
        <Input
          name="mnemonicName"
          placeholder="Mnemonic Name"
          onChange={formik.handleChange}
          value={formik.values.mnemonicName}
          error={formik.errors.mnemonicName}
          outerClassNames={classNames({
            hidden: !name,
          })}
        />
        <div className="mt-0 grid grid-cols-1 gap-2 p-4 sm:mt-5 sm:grid-cols-2">
          <Button type="button" onClick={toggle}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRecipient;