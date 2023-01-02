import classNames from "classnames";
import React from "react";

type Props = {
  color?: string;
  text: string;
};

const Badge = ({ color, text }: Props) => {
  return (
    <span
      className={classNames(
        "text-md mr-2 rounded px-2.5 py-0.5 font-semibold uppercase tracking-wide",
        {
          "bg-green-100 text-green-600": color === "green",
          "bg-red-100 text-red-600": color === "red",
          "bg-orange-100 text-orange-600": color === "orange",
        }
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
