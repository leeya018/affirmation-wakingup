import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart({ items }) {
  const data = {
    labels: [
      `type (${items[0]})`,
      `voice (${items[1]})`,
      `Not done (${items[2]})`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: items,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={data} style={{ width: "30%" }} />
}
