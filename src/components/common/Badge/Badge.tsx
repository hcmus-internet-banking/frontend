import classNames from "classnames";
import React from "react";

type Props = {
  color?: string;
  text: string;
};

const Badge = ({ color, text }: Props) => {
  <span
    className={classNames(
      `mr-2 rounded bg-${color}-100 px-2.5 py-0.5 text-xs font-semibold text-${color}-800 dark:bg-${color}-200 dark:${color}-blue-800`
    )}
  >
    {text}
  </span>;
};

export default Badge;
