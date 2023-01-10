import { useQueryMyProfile } from "@/lib/home/hooks/useQueryMyCustomer";
import { toastNotify as toastWarning } from "@/lib/common/utils/react-hot-toast";
import classNames from "classnames";
import React from "react";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import Spinner from "../common/Spinner/Spinner";

function Balance() {
  const { data, isLoading } = useQueryMyProfile();
  return (
    <div>
      {isLoading && <Spinner />}
      {data && (
        <Card
          className={classNames(
            "bg-gradient-to-tr from-gray-500 to-gray-800 text-gray-300",
            "flex flex-col"
          )}
        >
          <div className="text-center text-4xl font-extralight tracking-[0.5rem] ">
            {data?.accountNumber}
          </div>

          <div className="flex-1" />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="truncate text-2xl font-light tracking-wide ">
              <div className="text-3xl text-gray-200 transition hover:text-white">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(JSON.parse(JSON.stringify(data.balance || 0)))}
              </div>

              <div className="">{`${data.firstName} ${data.lastName}`}</div>
            </div>

            <div className="">
              <Button
                className="px-4 uppercase"
                size="sm"
                onClick={() => {
                  toastWarning(
                    "Currently, you can deposit by interacting with our employees."
                  );
                }}
              >
                deposit
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Balance;
