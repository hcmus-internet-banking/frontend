import { useMutateRecipient } from "@/src/lib/home/hooks/useMutateRecipient";
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
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      mnemonicName: "",
    },
    validationSchema: toFormikValidationSchema(createRecipientSchema),
    onSubmit: async (values) => {
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

  return (
    <Card className="max-w-md">
      <Heading size="sm">Create Recipient</Heading>
      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <Input
          name="accountNumber"
          placeholder="Account Number"
          onChange={formik.handleChange}
          value={formik.values.accountNumber}
        />
        <Input
          name="mnemonicName"
          placeholder="Mnemonic Name"
          onChange={formik.handleChange}
          value={formik.values.mnemonicName}
        />

        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
};

export default CreateRecipient;
