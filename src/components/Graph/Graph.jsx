import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import styles from "./Graph.module.css";

function Graph({ processList, batchData }) {
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  console.log("processList: ", processList);
  console.log("batchData: ", batchData);

  useEffect(() => {
    const processBatchMap = batchData.reduce((acc, item) => {
      const { ProcessId, BatchQnt } = item;
      if (!acc[ProcessId]) {
        acc[ProcessId] = 0;
      }
      acc[ProcessId] += BatchQnt;
      return acc;
    }, {});

    const colors = [
      "rgba(255, 99, 132, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(255, 206, 86, 0.5)",
      "rgba(75, 192, 192, 0.5)",
      "rgba(153, 102, 255, 0.5)",
      "rgba(255, 159, 64, 0.5)",
      "rgba(199, 199, 199, 0.5)",
      "rgba(255, 99, 71, 0.5)",
      "rgba(135, 206, 235, 0.5)",
      "rgba(50, 205, 50, 0.5)",
      "rgba(255, 140, 0, 0.5)",
      "rgba(220, 20, 60, 0.5)",
      "rgba(34, 139, 34, 0.5)",
      "rgba(147, 112, 219, 0.5)",
      "rgba(244, 164, 96, 0.5)",
      "rgba(46, 139, 87, 0.5)",
      "rgba(123, 104, 238, 0.5)",
      "rgba(255, 228, 181, 0.5)",
      "rgba(60, 179, 113, 0.5)",
      "rgba(255, 20, 147, 0.5)",
    ];

    const labels = processList.map((process) => process.Name);
    const data = processList.map((process) => processBatchMap[process.id] || 0);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Batch Quantities",
          data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.5", "1")),
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: chartType,
      data: chartData,
      options: {
        devicePixelRatio: 3,
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, config);
  }, [processList, batchData]);

  return (
    <div style={{ width: "100%", height: "600px", marginBlock: "0.5em" }}>
      <canvas ref={chartRef} className={styles.graph} />
    </div>
  );
}

export default Graph;
