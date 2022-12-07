import { useMutateRecipient } from "@/src/lib/home/hooks/useMutateRecipient";
import { createRecipientSchema } from "@/src/lib/home/schema";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import Modal from "../common/Modal/Modal";

type Props = {
  hide: boolean | undefined;
  toggle: any;
};

const CreateRecipient = ({ hide, toggle }: Props) => {
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
            toggle();
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
    <Modal title="Create Recipient" hide={hide} toggle={toggle}>
      {formik.errors && JSON.stringify(formik.errors)}
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
