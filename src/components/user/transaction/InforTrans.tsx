import { useQueryMyProfile } from "@/lib/home/hooks/useQueryMyCustomer";
import React from "react";
import LogoTrans from "./LogoTrans";
import classNames from "classnames";
import { useQueryKarmaAccount } from "@/lib/home/hooks/karma/useQueryKarmaAccount";

type Props = {
  transType: string;
  fromCustomer: any;
  toCustomer: any;
  type?: "INTERNAL" | "EXTERNAL" | "PAYMENT";
};

const InforTrans = ({ transType, fromCustomer, toCustomer, type }: Props) => {
  const customer = transType !== "sent" ? fromCustomer : toCustomer;
  const label =
    transType === "sent"
      ? "Transfer to"
      : transType === "received"
      ? "Recived from"
      : "Payment for";
  const { isLoading: profileLoading, data: profile } = useQueryMyProfile();

  const bankNumber = type === "EXTERNAL" ? customer?.accountNumber : "";
  const { isLoading: customerLoading, data: customerProfile } =
    useQueryKarmaAccount(bankNumber);

  return (
    <>
      <div className="flex flex-row items-center space-x-4">
        <LogoTrans transType={transType} />
        <div
          className={classNames(
            "text-md mr-2 rounded px-2.5 py-0.5 font-semibold uppercase tracking-wide",
            {
              "bg-blue-100 text-blue-600": type === "EXTERNAL",
              "bg-yellow-100 text-yellow-600": type === "INTERNAL",
              "bg-violet-100 text-violet-600":
                type !== "EXTERNAL" && type !== "INTERNAL",
            }
          )}
        >
          {type || "PAYMENT"}
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col">
            <div>
              {type === "EXTERNAL"
                ? customerLoading
                  ? "..."
                  : label + " " + customerProfile?.hoTen
                : label + " " + customer?.fristName + " " + customer?.lastName}
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
