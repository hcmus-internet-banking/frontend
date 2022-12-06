import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

function Heading({ children, className, size = "md" }: Props) {
  return (
    <h1
      className={classNames("font-semibold", className, {
        "text-1xl": size === "sm",
        "text-2xl": size === "md",
        "text-3xl": size === "lg",
      })}
    >
      {children}
    </h1>
  );
}

export default Heading;
