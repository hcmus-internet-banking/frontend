import Image from "next/image";
import avatar from "../../../public/assets/avatar.svg";
import { Recipient } from "../../store/recipients/types";
import Card from "../common/Card/Card";

type Props = {
  recipient: Recipient;
};

function Recipient({ recipient }: Props) {
  return (
    <Card className="flex max-w-2xl transition-[transform,box-shadow] hover:-translate-y-0.5 hover:cursor-pointer">
      <div className="rounded-full p-2">
        <Image className="h-20 w-20" alt="avatar" src={avatar} />
      </div>
      <div className="flex flex-col p-2">
        <span className="text-lg font-bold line-clamp-2">
          {recipient.mnemonicName}
        </span>
        <span className="font-semibold line-clamp-2">{recipient.id}</span>
      </div>
    </Card>
  );
}

export default Recipient;
