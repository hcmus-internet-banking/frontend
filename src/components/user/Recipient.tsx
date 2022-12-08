import useToggle from "@/lib/common/hooks/useToggle";
import { useDeleteRecipient } from "@/lib/home/hooks/recipient/useDeleteRecipient";
import { toast } from "react-hot-toast";
import { RxCross1, RxPencil2 } from "react-icons/rx";
import { Recipient } from "../../store/recipients/types";
import UpdateRecipient from "./UpdateRecipient";

type Props = {
  recipient: Recipient;
};

function Recipient({ recipient }: Props) {
  const { mutateAsync } = useDeleteRecipient();
  const { value, toggle } = useToggle(true);

  const handleDeleteRecipient = async () => {
    toast.promise(mutateAsync(recipient.id), {
      loading: "Deleting recipient...",
      success: (data) => {
        return `Deleted recipient ${data.data.data.mnemonicName} / ${data.data.data.accountNumber}`;
      },
      error: "Failed to delete recipient",
    });
  };

  const handleEditRecipient = () => {
    toggle();
  };

  return (
    <>
      <UpdateRecipient hide={value} toggle={toggle} recipient={recipient} />
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
