/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./TabelaRelatorio.module.css";
import { useEffect, useState } from "react";
import { apiUrl } from "../../Api/apiUrl";
import { useLoading } from "../../contexts/LoadingContext";
import Loading from "../Loading/Loading";

function TabelaRelatorio({ title, fields, data }) {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [process, setProcess] = useState([]);
  const [wipCount, setWipCount] = useState(0);
  const [scrapCount, setScrapCount] = useState(0);
  const [processInterditated, setProcessInterditated] = useState({});
  const [latestDates, setLatestDates] = useState({});

  useEffect(() => {
    if (localStorage.getItem("tab") != "dados") {
      stopLoading();
      return;
    }
  }, []);

  useEffect(() => {
    startLoading();

    const fetchProcessNames = async () => {
      const uniqueProcess = [];

      for (const item of data) {
        try {
          const response = await apiUrl.get(`/process/get/${item.ProcessId}`);

          const exists = uniqueProcess.find(
            (process) => process.id === response.data.id
          );

          if (!exists) {
            uniqueProcess.push(response.data);
          }
        } catch (error) {
          console.error("Erro ao buscar processo: ", error);
        }
      }
      setProcess(uniqueProcess);
      stopLoading();
    };

    fetchProcessNames();
  }, [data]);

  useEffect(() => {
    const checkPOCs = (pocs = []) => {
      const processWipCounts = {};
      const processInterditatedCounts = {};
      const processScrapCounts = {};
      const processBatchGroups = {};
      const latestDatePerProcess = {};

      pocs.forEach((poc) => {
        const key = `${poc.ProcessId}-${poc.BatchId}`;
        if (!processBatchGroups[key]) {
          processBatchGroups[key] = [];
        }
        processBatchGroups[key].push(poc);
      });

      Object.values(processBatchGroups).forEach((group) => {
        const entradas = group.filter((item) => item.Movement === "Entrada");
        const saidas = group.filter((item) => item.Movement === "Saída");

        entradas.forEach((entrada) => {
          const saida = saidas.find(
            (saida) =>
              saida.BatchId === entrada.BatchId &&
              saida.ProcessId === entrada.ProcessId
          );

          const latestEntryDate = group.reduce((latest, item) => {
            const currentDate = new Date(item.created_at);
            return currentDate > latest ? currentDate : latest;
          }, new Date(group[0].created_at));

          if (!latestDatePerProcess[entrada.ProcessId]) {
            latestDatePerProcess[entrada.ProcessId] = latestEntryDate;
          } else {
            const existingDate = latestDatePerProcess[entrada.ProcessId];
            if (latestEntryDate > existingDate) {
              latestDatePerProcess[entrada.ProcessId] = latestEntryDate;
            }
          }

          if (!saida) {
            if (!processWipCounts[entrada.ProcessId]) {
              processWipCounts[entrada.ProcessId] = 0;
            }
            processWipCounts[entrada.ProcessId] += Number(entrada.BatchQnt);

            if (!processScrapCounts[entrada.ProcessId]) {
              processScrapCounts[entrada.ProcessId] = 0;
            }
            processScrapCounts[entrada.ProcessId] += Number(
              entrada.ScrapQnt || 0
            );
          }

          if (!saida && entrada.Interditated) {
            if (!processInterditatedCounts[entrada.ProcessId]) {
              processInterditatedCounts[entrada.ProcessId] = 0;
            }
            processInterditatedCounts[entrada.ProcessId] += Number(
              entrada.BatchQnt
            );
          }
        });
      });

      setWipCount(processWipCounts);
      setProcessInterditated(processInterditatedCounts);
      setLatestDates(latestDatePerProcess);
      setScrapCount(processScrapCounts);
    };

    checkPOCs(data);
  }, [data]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.tabela}>
          <Table striped bordered hover>
            <thead>
              <tr className={styles.header}>
                {fields.map((field, index) => (
                  <th key={index}>{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tabela} id="tableBody">
              {process
                .filter((process) => wipCount[process.id] > 0)
                .map((process, index) => (
                  <tr key={index}>
                    <td className={styles.firstTd}>
                      <div className={styles.tdText}>
                        {process.Name} {process.id}
                      </div>
                    </td>
                    <td>{wipCount[process.id] || 0}</td>
                    <td>{processInterditated[process.id] || 0}</td>
                    <td>{scrapCount[process.id] || 0}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default TabelaRelatorio;
