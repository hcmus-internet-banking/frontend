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
        "text-base": size === "sm",
        "text-lg": size === "md",
        "text-xl": size === "lg",
      })}
    >
      {children}
    </h1>
  );
}

export default Heading;
