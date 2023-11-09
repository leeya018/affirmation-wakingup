import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Button from "ui/Button";
import { useRouter } from "next/router";
import * as UTIL from "@/util";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Graph({ items, totalAmount, goalName, habitName }) {
  const router = useRouter();
  console.log({ totalAmount });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = items.map((data) => UTIL.getDateStrIsrael(data.date));

  const data = {
    labels,
    datasets: [
      {
        label: "Your Result",
        data: items.map((data) => data.amount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Goal Result",
        data: items.map((_) => totalAmount),
        borderColor: "rgba(25, 207, 62, 0.5)",
        backgroundColor: "rgba(25, 207, 62, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Button position="absolute top-1" onClick={() => router.back()}>
        back to habit
      </Button>
      {/* <Title>{goalName}</Title>
      <Title>{habitName}</Title> */}
      <div className="scale-75">
        <Line options={options} data={data} items={items} />
        {/* <Line options={options} data={dataGoal} items={items} />; */}
      </div>
    </div>
  );
}
