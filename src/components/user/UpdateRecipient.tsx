import useToggle from "@/lib/common/hooks/useToggle";
import { useUpdateRecipient } from "@/lib/home/hooks/recipient/useUpdateRecipient";
import { createRecipientSchema } from "@/lib/home/schema";
import { Recipient } from "@/store/recipients/types";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import Modal from "../common/Modal/Modal";

type Props = {
  recipient: Recipient;
  hide: boolean;
  toggle: any;
};

const UpdateRecipient = ({ recipient, hide, toggle }: Props) => {
  const { mutateAsync } = useUpdateRecipient();
  const { value: isSubmitted, setValue: setIsSubmitted } = useToggle(false);

  const formik = useFormik({
    initialValues: {
      id: recipient.id,
      accountNumber: recipient.accountNumber,
      mnemonicName: recipient.mnemonicName,
    },
    validateOnBlur: isSubmitted,
    validateOnChange: isSubmitted,
    validationSchema: toFormikValidationSchema(createRecipientSchema),
    onSubmit: async (values) => {
      setIsSubmitted(true);
      console.log(values);

      toast.promise(
        mutateAsync({
          id: values.id,
          mnemonicName: values.mnemonicName,
        }),
        {
          loading: "Update recipient...",
          success: (data) => {
            toast.success(JSON.stringify(data));
            toggle();
            return "Recipient updated";
          },
          error: (e) => {
            toast.error(JSON.stringify(e));

            return "Failed to edit recipient";
          },
        }
      );
    },
  });

  return (
    <>
      <Modal title="Update recipient" hide={hide} toggle={toggle}>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Input
              name="accountNumber"
              placeholder="Account Number"
              onChange={formik.handleChange}
              value={formik.values.accountNumber}
              error={formik.errors.accountNumber}
              disabled
            />
            <Input
              name="mnemonicName"
              placeholder="Mnemonic Name"
              onChange={formik.handleChange}
              value={formik.values.mnemonicName}
              error={formik.errors.mnemonicName}
            />
          </div>
          <Modal.Bottom>
            <Button type="button" onClick={toggle} preset="outlined">
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </Modal.Bottom>
        </form>
      </Modal>
    </>
  );
};

export default UpdateRecipient;
