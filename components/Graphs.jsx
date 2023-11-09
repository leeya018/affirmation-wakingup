import React from "react";

import StackChart from "./StackChart";
import PieChart from "./PieChart";

export default function Graphs() {
  return (
    <div className=" w-[45vw] shadow-rl h-[80vh] flex flex-col justify-center items-center ">
      <StackChart />
      <PieChart />
    </div>
  );
}
