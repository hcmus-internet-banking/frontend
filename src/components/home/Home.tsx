import React from "react";
import Card from "../common/Card/Card";
import Heading from "../common/Heading/Heading";
import StatisticCard from "../common/StatisticCard/StatisticCard";

function Home() {
  return (
    <div className="max-w-xl space-y-2 px-3 py-2">
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

      <Card className="max-w-xl">
        <Heading>Log</Heading>

        <div className="space-y-2">
          <div className="flex items-center justify-between space-x-4">
            <span className="aspect-square h-10 w-10 rounded-full bg-lime-200 p-2 text-center">
              1
            </span>
            <span className="line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              accusamus omnis delectus! Ipsam, nemo. Enim modi nam ullam, illo
              possimus sapiente eius expedita! Ipsum libero nam cumque! Amet,
              maxime nobis.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Home;
