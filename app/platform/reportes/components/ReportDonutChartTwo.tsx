"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

import { FinancesModel } from "@/models/finances";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  data: FinancesModel[];
}

const ReportDonutChartTwo = ({ data }: Props) => {
  const options: any = {
    plugins: {
      datalabels: {
        formatter: function (value: any) {
          let val = Math.round(value);

          return new Intl.NumberFormat("tr-TR").format(val); //for number format
        },
        color: "white",
        font: {
          weight: "bold",
          size: 14,
          family: "poppins",
        },
      },
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return <Doughnut data={finalData} options={options} />;
};

export default ReportDonutChartTwo;
