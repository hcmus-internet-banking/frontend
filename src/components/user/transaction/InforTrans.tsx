import { useQueryMyProfile } from "@/lib/home/hooks/useQueryMyCustomer";
import React from "react";
import LogoTrans from "./LogoTrans";

type Props = {
  transType: string;
  fromCustomer: any;
  toCustomer: any;
};

const InforTrans = ({ transType, fromCustomer, toCustomer }: Props) => {
  const customer = transType === "receive" ? toCustomer : fromCustomer;
  const label =
    transType === "sent"
      ? "Transfer to"
      : transType === "receive"
      ? "Transfer from"
      : "Payment for";
  const { isLoading: profileLoading, data: profile } = useQueryMyProfile();

  return (
    <>
      <div className="flex items-center space-x-4">
        <LogoTrans transType={transType} />
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col">
            <div>
              {label + " " + customer.firstName + " " + customer.lastName}
            </div>
            <div className="text-gray-600">STK: {customer.accountNumber}</div>
            <div className="text-gray-600">
              Balance:{" "}
              {profileLoading
                ? "..."
                : Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(JSON.parse(JSON.stringify(profile?.balance || 0)))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InforTrans;
