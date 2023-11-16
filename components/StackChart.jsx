import React from "react"
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
import { getDayArr } from "@/util"
import moment from "moment"
import faker from "faker"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const today = new Date()
const month = today.getMonth() + 1
const year = today.getFullYear()
const days = getDayArr(month, year).map((day) => day.getDate())

function StackChart({ practices }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Affirmations Chart",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  const first = practices[0]
  const end = practices[practices.length - 1]
  const dayStart = moment(first.date).getDate()
  const dayEnd = moment(first.end).getDate()
  const typeArr1 = Array(dayStart - 1).fill(0)
  const typeArr2 = practices.map((p) => {
    return p.type
  })

  const typeArr3 = Array(days.length - dayEnd).fill(0)

  const typeArr = [...typeArr1, ...typeArr2, ...typeArr3]

  const data = {
    labels: days,
    datasets: [
      {
        label: "Type",
        data: typeArr,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Sound",
        data: days.map(() => faker.datatype.number({ min: 0, max: 1 })),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  }
  return <Bar options={options} data={data} width={200} height={200} />
}
export default StackChart
