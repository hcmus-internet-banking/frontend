import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Heading({ children, className }: Props) {
  return (
    <h1 className={classNames("text-3xl font-bold", className)}>{children}</h1>
  );
}

export default Heading;
