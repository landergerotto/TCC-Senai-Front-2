import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import styles from "./Graph.module.css";
import { Row } from "react-bootstrap";

function Graph({
  processList,
  batchData,
  averageTimes,
  title,
  chartType = "bar",
}) {
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

    const noGridTypes = ["doughnut", "pie", "polarArea"];

    const filteredProcesses = processList.filter((process) =>
      batchData.some(
        (item) => item.ProcessId === process.id && item.BatchQnt > 0
      )
    );

    if (filteredProcesses.length === 0) return;

    const labels = filteredProcesses.map((process) => process.Name);
    const data = filteredProcesses.map(
      (process) => processBatchMap[process.id]
    );

    const isUsingAverageTimes = averageTimes && averageTimes.length > 0;
    const chartData = isUsingAverageTimes
      ? {
          labels: averageTimes.map((item) => item.processId), // Nomes dos processos
          datasets: [
            {
              label: "Average Time (Minutes)",
              data: averageTimes.map((item) => item.averageTime), // Médias de tempo
              backgroundColor: colors,
              borderColor: colors.map((color) => color.replace("0.5", "1")),
              borderWidth: 1,
            },
          ],
        }
      : {
          labels: processList.map((process) => process.Name), // Nomes dos processos
          datasets: [
            {
              label: "Batch Quantities",
              data: processList.map((process) => {
                const totalBatchQnt = batchData
                  .filter((item) => item.ProcessId === process.id)
                  .reduce((acc, item) => acc + item.BatchQnt, 0);
                return totalBatchQnt;
              }),
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
        devicePixelRatio: 4,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: noGridTypes.includes(chartType) ? true : false,
            labels: {
              padding: 20,
            },
          },
        },
        scales: !noGridTypes.includes(chartType)
          ? {
              y: {
                beginAtZero: true,
                grid: {
                  display: true,
                },
              },
              x: {
                grid: {
                  display: true,
                },
              },
            }
          : {},
        cutout: chartType === "doughnut" ? "50%" : undefined,
      },
    };

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, config);
  }, [processList, batchData, averageTimes]);

  const filteredProcesses = processList.filter((process) =>
    batchData.some((item) => item.ProcessId === process.id && item.BatchQnt > 0)
  );

  return (
    <div className={styles.block}>
      <Row>
        <h3>{title}</h3>
      </Row>
      <Row>
        <div className={styles.canva}>
          <canvas ref={chartRef} />
        </div>
      </Row>
    </div>
  );
}

export default Graph;
