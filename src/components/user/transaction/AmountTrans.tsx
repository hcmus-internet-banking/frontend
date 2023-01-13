import Badge from "@/components/common/Badge/Badge";
import React from "react";

type Props = {
  value: string;
  transType: string;
};

const AmountTrans = ({ value, transType }: Props) => {
  switch (transType) {
    case "received":
      return (
        <div className="flex items-center">
          <Badge color="green" text={"+" + value + "$"} />
        </div>
      );
    case "sent":
      return (
        <div className="flex items-center">
          <Badge color="red" text={"-" + value + "$"} />
        </div>
      );
    case "payment":
      return (
        <div className="flex items-center">
          <Badge color="orange" text={"-" + value + "$"} />
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge color="orange" text="Payment" />
        </div>
      );
  }
};

export default AmountTrans;
