import classNames from "classnames";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  noShadow?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

function Card({ children, className, noShadow = false, ...props }: Props) {
  return (
    <div
      className={classNames("space-y-2 bg-gray-100 p-4", className, {
        "shadow-xl": !noShadow,
        "rounded-xl": !className?.includes("rounded"),
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
