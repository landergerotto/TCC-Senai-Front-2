import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Row } from "react-bootstrap";
import { useEffect, useRef } from "react";

import styles from "./Graph.module.css";

function Graph({
  processList = [],
  batchData = [],
  averageTimes = [],
  labels = [],
  totalPieces = [],
  title,
  chartType = "bar",
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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

  useEffect(() => {
    const isTotalPiecesData = labels.length > 0 && totalPieces.length > 0;
    let chartData;

    if (isTotalPiecesData) {
      const formattedLabels = labels.map((dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });
      });
      chartData = {
        labels: formattedLabels,
        datasets: [
          {
            label: "Total de Peças por Dia",
            data: totalPieces,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
            tension: 0.1,
          },
        ],
      };
    } else {
      const processBatchMap = batchData.reduce((acc, item) => {
        const { ProcessId, BatchQnt } = item;
        if (!acc[ProcessId]) {
          acc[ProcessId] = 0;
        }
        acc[ProcessId] += BatchQnt;
        return acc;
      }, {});

      const processIdToNameMap = processList.reduce((acc, process) => {
        acc[process.id] = process.Name;
        return acc;
      }, {});

      const filteredProcesses =
        batchData.length > 0
          ? processList.filter((process) =>
              batchData.some(
                (item) => item.ProcessId === process.id && item.BatchQnt > 0
              )
            )
          : processList;

      if (filteredProcesses.length === 0) return;

      const isUsingAverageTimes = averageTimes && averageTimes.length > 0;
      chartData = isUsingAverageTimes
        ? {
            labels: averageTimes.map(
              (item) => processIdToNameMap[item.processId] || item.processId
            ),
            datasets: [
              {
                label: "Average Time",
                data: averageTimes.map((item) => {
                  return item.averageTime;
                }),
                backgroundColor: colors.slice(0, averageTimes.length),
                borderColor: colors
                  .slice(0, filteredProcesses.length)
                  .map((color) => color.replace("0.5", "1")),
                borderWidth: 1,
              },
            ],
          }
        : {
            labels: filteredProcesses.map((process) => process.Name),
            datasets: [
              {
                label: "Batch Quantities",
                data: filteredProcesses.map(
                  (process) => processBatchMap[process.id]
                ),
                backgroundColor: colors.slice(0, filteredProcesses.length),
                borderColor: colors
                  .slice(0, filteredProcesses.length)
                  .map((color) => color.replace("0.5", "1")),
                borderWidth: 1,
              },
            ],
          };
    }

    const maxValue =
      Math.ceil((Math.max(...chartData.datasets[0].data) * 1.1) / 100) * 100;

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
          datalabels: {
            display: true,
            color: "black",
            anchor: "end",
            align: "top",
            formatter: (value) => value.toFixed(2),
          },
        },
        scales: !noGridTypes.includes(chartType)
          ? {
              y: {
                beginAtZero: true,
                max: maxValue,
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
      plugins: [ChartDataLabels],
    };

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, config);
  }, [processList, batchData, averageTimes, labels, totalPieces, chartType]);

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
