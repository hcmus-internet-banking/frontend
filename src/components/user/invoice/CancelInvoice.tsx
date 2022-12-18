import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import { useFormik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useCancelInvoice } from "@/lib/home/hooks/invoice/useCancelInvoice";

type Props = {
  id: string;
  hide: boolean;
  toggle: () => void;
};

const cancelInvoiceSchema = z.object({
  message: z
    .string()
    .max(50, { message: "Description is longer than 50 characters" }),
});

const CancelInvoice = ({ id, hide, toggle }: Props) => {
  const { mutateAsync } = useCancelInvoice();
  const formik = useFormik({
    initialValues: {
      id: id,
      message: "",
    },
    validationSchema: toFormikValidationSchema(cancelInvoiceSchema),
    onSubmit: async (values) => {
      toast.promise(
        mutateAsync({
          id: values.id,
          message: values.message,
        }),
        {
          loading: "Loading cancel invoice...",
          success: () => {
            formik.resetForm();
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
    <Modal title="Confirm cancel invoice" hide={hide} toggle={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="message"
          placeholder="Message"
          onChange={formik.handleChange}
          value={formik.values.message}
          error={formik.errors.message}
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
