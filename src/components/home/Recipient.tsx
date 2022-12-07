import { useDeleteRecipient } from "@/src/lib/home/hooks/recipients/useDeleteRecipient";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { RxCross1, RxPencil2 } from "react-icons/rx";
import avatar from "../../../public/assets/avatar.svg";
import { Recipient } from "../../store/recipients/types";
import Card from "../common/Card/Card";

type Props = {
  recipient: Recipient;
};

function Recipient({ recipient }: Props) {
  const { mutateAsync } = useDeleteRecipient();

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
    const id = recipient.id;
    console.log("Edit: ", id);
  };

  return (
    <Card className="mt-0 flex max-w-2xl content-around items-center transition-[transform,box-shadow] hover:-translate-y-0.5 hover:cursor-pointer">
      <div className="rounded-full">
        <Image className="h-20 w-20" alt="avatar" src={avatar} />
      </div>
      <div className="flex grow flex-col content-center pl-5">
        <span className="text-lg font-bold text-gray-800">
          {recipient.mnemonicName}
        </span>
        <span className="font-semibold text-gray-600">
          {recipient.accountNumber}
        </span>
      </div>
      <div className="flex gap-2">
        <RxPencil2
          className="inline-block h-4 w-4"
          onClick={handleEditRecipient}
        />
        <RxCross1
          className="inline-block h-4 w-4 text-red-400"
          strokeWidth={0.8}
          onClick={handleDeleteRecipient}
        />
      </div>
    </Card>
  );
}

export default Recipient;
