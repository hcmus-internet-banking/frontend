import classNames from "classnames";
import React from "react";

type Props = { children?: React.ReactNode; className?: string };

function Card({ children, className }: Props) {
  return (
    <div
      className={classNames(
        "space-y-2 rounded-xl bg-gray-100 p-4 shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
