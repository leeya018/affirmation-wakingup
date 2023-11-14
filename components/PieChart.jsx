import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { formatDate } from "@/util";
import { UserStore } from "mobx/userStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({}) {
  const maxPoints = 3;
  const dateStr = formatDate(UserStore.chosenDate);
  if (!UserStore.user?.practices[dateStr]) return <></>;
  const practice = UserStore.user?.practices[dateStr];
  const voice = practice.voice;
  const type = practice.type;
  let notDone = maxPoints - voice - type;
  notDone = notDone > 0 ? notDone : 0;

  const data = {
    labels: ["type", "voice", "Not done"],
    datasets: [
      {
        label: "# of Votes",
        data: [type, voice, notDone],
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
  };
  return <Pie data={data} style={{ width: "30%" }} />;
}
