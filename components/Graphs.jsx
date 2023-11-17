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
    <div className=" w-[90vw] shadow-rl rounded-xl bg-white h-[85vh] shadow-lg flex justify-center items-center ">
      <div className="flex justify-center items-center w-[90%] h-[80vh]">
        <StackChart practices={user?.practices} />;
      </div>
    </div>
  )
}
