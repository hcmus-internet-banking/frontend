import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useDeleteRecipient } from "@/lib/home/hooks/recipient/useDeleteRecipient";
import { toast } from "react-hot-toast";

type Props = {
  id: string;
  hide: boolean;
  toggle: any;
};

const DeleteRecipient = ({ id, hide, toggle }: Props) => {
  const { mutateAsync } = useDeleteRecipient();

  const submitDelete = (e: any) => {
    e.preventDefault();
    toast.promise(mutateAsync(id), {
      loading: "Deleting recipient...",
      success: (data) => {
        return `Deleted recipient ${data.data.data.mnemonicName}`;
      },
      error: "Failed to delete recipient",
    });
  };
  return (
    <Modal title="Confirm delete recipient" hide={hide} toggle={toggle}>
      <form onSubmit={submitDelete}>
        <Modal.Bottom>
          <Button type="button" onClick={toggle} preset="outlined">
            Cancel
          </Button>
          <Button preset="error" type="submit">
            Delete
          </Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
};

export default DeleteRecipient;
