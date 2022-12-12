import useToggle from "@/lib/common/hooks/useToggle";
import { RxCross1, RxPencil2 } from "react-icons/rx";
import { Recipient } from "../../store/recipients/types";
import DeleteRecipient from "./DeleteRecipient";
import UpdateRecipient from "./UpdateRecipient";

type Props = {
  recipient: Recipient;
};

function Recipient({ recipient }: Props) {
  const { value: hideEditModal, toggle: toggleEdit } = useToggle(true);
  const { value: hideDeleteModal, toggle: toggleDelete } = useToggle(true);

  const handleDeleteRecipient = async () => {
    toggleDelete();
  };

  const handleEditRecipient = () => {
    toggleEdit();
  };

  return (
    <>
      <UpdateRecipient
        hide={hideEditModal}
        toggle={toggleEdit}
        recipient={recipient}
      />
      <DeleteRecipient
        hide={hideDeleteModal}
        toggle={toggleDelete}
        id={recipient.id}
      />
      <div className="flex content-around items-center duration-300 ease-linear hover:cursor-pointer hover:rounded-md hover:bg-gray-200">
        <div className="flex grow justify-between p-2">
          <span className="font-semibold">{recipient.mnemonicName}</span>
          <span className="pr-8 text-sm font-medium text-gray-500">
            {recipient.accountNumber}
          </span>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <RxPencil2
            className="inline-block h-5 w-5 hover:cursor-pointer hover:opacity-25"
            onClick={handleEditRecipient}
          />
          <RxCross1
            className="inline-block h-5 w-5 text-red-400 hover:cursor-pointer hover:opacity-25"
            strokeWidth={0.8}
            onClick={handleDeleteRecipient}
          />
        </div>
      </div>
    </>
  );
}

export default Recipient;
