import React from "react";
import StatisticCard from "../common/StatisticCard/StatisticCard";

export function Statistics({}) {
  return (
    <div className="grid grid-flow-col gap-4">
      <StatisticCard
        headerText="Total Users"
        bodyText="100"
        className="bg-red-200"
      />
      <StatisticCard
        headerText="Total Users"
        bodyText="100"
        className="bg-yellow-200"
      />
      <StatisticCard
        headerText="Total Users"
        bodyText="100"
        className="bg-blue-200"
      />
    </div>
  );
}
