import React from "react"

import StackChart from "./StackChart"
import { UserStore } from "mobx/userStore"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { observer } from "mobx-react-lite"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Graphs = observer(() => {
  const { user } = UserStore

  return (
    <div className=" w-[90vw]   shadow-rl rounded-xl bg-white h-[85vh] shadow-lg flex justify-center items-center ">
      <div className="flex justify-center items-center w-[90%] h-[80vh] ">
        <StackChart practices={user?.practices || []} />;
      </div>
    </div>
  )
})

export default Graphs
