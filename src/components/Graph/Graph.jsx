import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import styles from "./Graph.module.css";

function Graph({ processList, batchData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const processBatchMap = batchData.reduce((acc, item) => {
      const { ProcessId, BatchQnt } = item;
      if (!acc[ProcessId]) {
        acc[ProcessId] = 0;
      }
      acc[ProcessId] += BatchQnt;
      return acc;
    }, {});

    const labels = processList.map((process) => process.Name);
    const data = processList.map((process) => processBatchMap[process.id] || 0);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Batch Quantities",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: chartData,
      options: {
        devicePixelRatio: 4,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    if (chartInstance.current)
      chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, config);
  }, [processList, batchData]);

  return (
    <div style={{ width: "100%", height: 800, marginBlock: '0.5em' }}>
      <canvas ref={chartRef} className={styles.graph} />
    </div>
  );
}

export default Graph;
