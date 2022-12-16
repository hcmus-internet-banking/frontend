import { useState } from "react";
import Card from "../../common/Card/Card";
import Heading from "../../common/Heading/Heading";
import classNames from "classnames";
import InternalTransfer from "./InternalTransfer";
import ExternalTransfer from "./ExternalTransfer";

export const Transfer = () => {
  const [isInternal, setIsInternal] = useState(true);

  return (
    <Card className="bg-gradient-to-tl from-yellow-400 to-yellow-100">
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
                "flex w-full cursor-pointer justify-center rounded-xl font-semibold",
                isInternal ? " bg-red-400" : ""
              )}
              onClick={() => {
                setIsInternal(true);
              }}
            >
              Internal
            </div>
            <div
              className={classNames(
                "flex w-full cursor-pointer justify-center rounded-xl font-semibold",
                !isInternal ? " bg-red-400" : ""
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
      {isInternal ? <InternalTransfer /> : <ExternalTransfer />}
    </Card>
  );
};
