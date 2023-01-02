import React from "react";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";

type Props = {
  transType: string;
};

const LogoTrans = ({ transType }: Props) => {
  switch (transType) {
    case "receive":
      return (
        <GiReceiveMoney className="h-10 w-10 rounded-full border-2 border-green-300 p-1 text-green-500" />
      );
    case "sent":
      return (
        <GiPayMoney className="h-10 w-10 rounded-full border-2 border-red-300 p-1 text-red-500" />
      );
    case "payment":
      return (
        <GiTakeMyMoney className="h-10 w-10 rounded-full border-2 border-orange-300 p-1 text-orange-500" />
      );
    default:
      return (
        <GiTakeMyMoney className="h-10 w-10 rounded-full border-2 border-orange-300  p-1 text-orange-500" />
      );
  }
};

export default LogoTrans;
