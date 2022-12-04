import classNames from "classnames";
import React from "react";

type Props = {
  headerText: string;
  bodyText: string;
  className?: string;
  children?: React.ReactNode;
};

function StatisticCard({ bodyText, headerText, className, children }: Props) {
  return (
    <div
      className={classNames(
        "h-24 transform space-y-2 rounded-xl bg-gray-100 p-4 shadow-md transition hover:-translate-y-1",
        className
      )}
    >
      <span className="text-sm font-light uppercase text-gray-700">
        {headerText}
      </span>

      <div className="text-xl">{bodyText}</div>

      {children}
    </div>
  );
}

export default StatisticCard;
