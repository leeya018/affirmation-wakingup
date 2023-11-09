import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { getDayArr } from "/util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
};

const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const days = getDayArr(month, year).map((day) => day.getDate());

export const data = {
  labels: days,
  datasets: [
    {
      label: "Type",
      data: days.map(() => faker.datatype.number({ min: 0, max: 2 })),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Sound",
      data: days.map(() => faker.datatype.number({ min: 0, max: 1 })),
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

function StackChart() {
  return <Bar options={options} data={data} width={200} height={200} />;
}
export default StackChart;
