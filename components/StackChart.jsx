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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function StackChart({ practices }) {
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const days = getDayArr(month, year).map((day) => day.getDate())
  console.log("days", days)

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

  const getDay = (formatDate) => {
    return formatDate.split("-")[0]
  }

  const getData = () => {
    const currMonth = new Date().getMonth() + 1
    const currYear = new Date().getFullYear()
    const currMonthPractices = practices
      .filter(
        (p) =>
          p.date.split("-")[1] == currMonth && p.date.split("-")[2] == currYear
      )
      .map((p) => ({ ...p, day: getDay(p.date) }))
    let arr = new Array(days.length).fill({ type: 0, voice: 0 })
    for (const p of currMonthPractices) {
      arr[getDay(p.date) - 1] = p
      arr.push(p)
    }
    return arr
  }
  const items = getData()
  const data = {
    labels: days,
    datasets: [
      {
        label: "Type",
        data: items.map((p) => p.type),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "voice",
        data: items.map((p) => p.voice),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  }
  return <Bar options={options} data={data} width={200} height={200} />
}
export default StackChart
