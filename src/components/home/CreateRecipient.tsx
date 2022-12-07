import useToggle from "@/src/lib/common/hooks/useToggle";
import { useMutateRecipient } from "@/src/lib/home/hooks/useMutateRecipient";
import { useQueryGetCustomerByBankNumber } from "@/src/lib/home/hooks/useQueryGetCustomerByBankNumber";
import { createRecipientSchema } from "@/src/lib/home/schema";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import Heading from "../common/Heading/Heading";
import Input from "../common/Input/Input";

const CreateRecipient = () => {
  const { mutateAsync } = useMutateRecipient();
  const { value: isSubmitted, setValue: setIsSubmitted } = useToggle(false);
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
      console.log(values);

      toast.promise(
        mutateAsync({
          accountNumber: values.accountNumber,
          mnemonicName: values.mnemonicName,
        }),
        {
          loading: "Creating Recipient...",
          success: (data) => {
            toast.success(JSON.stringify(data));

            return "Recipient Created";
          },
          error: (e) => {
            toast.error(JSON.stringify(e));

            return "Failed to create Recipient";
          },
        }
      );
    },
  });
  const { data } = useQueryGetCustomerByBankNumber(
    formik.values.accountNumber,
    {
      onSuccess: (res: any) => {
        toast(JSON.stringify(res));
        formik.setFieldValue(
          "mnemonicName",
          `${res.firstName} ${res.lastName}`
        );
      },
    }
  );

  return (
    <Card className="">
      <Heading size="sm">Create Recipient</Heading>
      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <Input
          name="accountNumber"
          placeholder="Account Number"
          onChange={formik.handleChange}
          value={formik.values.accountNumber}
          error={formik.errors.accountNumber}
        />
        <Input
          name="mnemonicName"
          placeholder="Mnemonic Name"
          onChange={formik.handleChange}
          value={formik.values.mnemonicName}
          error={formik.errors.mnemonicName}
          disabled
        />

        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
};

export default CreateRecipient;
