import React from "react"

import StackChart from "./StackChart"
import PieChart from "./PieChart"
import { UserStore } from "mobx/userStore"
import faker from "faker"
import { getDayArr } from "/util"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Graphs() {
  const { user } = UserStore

  return (
    <div className=" w-[45vw] shadow-rl h-[80vh] ">
      <div className="w-full flex flex-col gap-4 ">
        <div
          className="flex-1/4 bg-white rounded-xl flex 
        flex-col gap-4 p-6"
        >
          <StackChart practices={user?.practices} />;
        </div>
        {/* <PieChart /> */}
      </div>
    </div>
  )
}
