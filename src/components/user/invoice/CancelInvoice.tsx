import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import { useCancelInvoice } from "@/lib/home/hooks/invoice/useCancelInvoice";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = {
  id: string;
  hide: boolean;
  toggle: () => void;
};

const cancelInvoiceSchema = z.object({
  reason: z
    .string()
    .max(50, { message: "Description is longer than 50 characters" }),
});

const CancelInvoice = ({ id, hide, toggle }: Props) => {
  const { mutateAsync } = useCancelInvoice();
  const formik = useFormik({
    initialValues: {
      id: id,
      reason: "",
    },
    validationSchema: toFormikValidationSchema(cancelInvoiceSchema),
    onSubmit: async (values) => {
      toast.promise(
        mutateAsync({
          id: values.id,
          reason: values.reason,
        }),
        {
          loading: "Loading cancel invoice...",
          success: () => {
            formik.resetForm();
            toggle();
            return "Cancel successfully";
          },
          error: (e) => {
            return e.message || "Failed to cancel invoice";
          },
        }
      );
    },
  });

  return (
    <Modal title="Cancel invoice" hide={hide} toggle={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="reason"
          placeholder="Reason"
          onChange={formik.handleChange}
          value={formik.values.reason}
          error={formik.errors.reason}
        />
        <Modal.Bottom>
          <Button type="button" onClick={toggle} preset="outlined">
            Cancel
          </Button>
          <Button preset="error" type="submit">
            Confirm
          </Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
};

export default CancelInvoice;
