import classNames from "classnames";
import { useState } from "react";
import Card from "../../common/Card/Card";
import Heading from "../../common/Heading/Heading";
import ExternalTransfer from "./ExternalTransfer";
import InternalTransfer from "./InternalTransfer";

export const Transfer = () => {
  const [isInternal, setIsInternal] = useState(true);

  return (
    <Card className="border bg-white md:row-span-3" noShadow>
      <Heading>
        <div className=" text-xl font-light uppercase tracking-wide">
          Transfer
        </div>
      </Heading>
      <div className="m-auto flex h-auto w-full flex-col">
        <div className="relative w-full rounded-xl bg-gray-200">
          <div className="relative flex h-full w-full items-center ">
            <div
              className={classNames(
                "flex w-full cursor-pointer justify-center rounded-xl p-2 font-semibold",
                isInternal ? " bg-slate-700 text-white" : ""
              )}
              onClick={() => {
                setIsInternal(true);
              }}
            >
              Internal
            </div>
            <div
              className={classNames(
                "flex w-full cursor-pointer justify-center rounded-xl p-2 font-semibold",
                !isInternal ? " bg-slate-700 text-white" : ""
              )}
              onClick={() => {
                setIsInternal(false);
              }}
            >
              External
            </div>
          </div>
        </div>
      </div>
      <div>{isInternal ? <InternalTransfer /> : <ExternalTransfer />}</div>
    </Card>
  );
};
