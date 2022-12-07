import Image from "next/image";
import avatar from "../../../public/assets/avatar.svg";
import { Recipient } from "../../store/recipients/types";
import Card from "../common/Card/Card";
import { IoPencilSharp, IoTrash } from "react-icons/io5";

type Props = {
  recipient: Recipient;
};

function Recipient({ recipient }: Props) {
  const handleRemoveRecipient = () => {
    const id = recipient.id;
    console.log("Remove: ", id);
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
      <div className="flex content-end gap-x-2">
        <IoTrash
          className="m-2 hover:-translate-y-0.5 hover:cursor-pointer"
          onClick={handleRemoveRecipient}
        />
        <IoPencilSharp
          onClick={handleEditRecipient}
          className="m-2 hover:-translate-y-0.5 hover:cursor-pointer"
        />
      </div>
    </Card>
  );
}

export default Recipient;
