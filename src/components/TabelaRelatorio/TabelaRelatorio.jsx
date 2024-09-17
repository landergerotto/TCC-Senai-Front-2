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
  const [process, setProcess] = useState([]);
  const [wipCount, setWipCount] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading();

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
    let count = 0;

    const checkPOCs = (pocs = []) => {
      const processBatchGroups = {};

      pocs.forEach((poc) => {
        const key = `${poc.ProcessId}-${poc.BatchId}`;
        if (!processBatchGroups[key]) {
          processBatchGroups[key] = [];
        }
        processBatchGroups[key].push(poc);
      });

      Object.values(processBatchGroups).forEach((group) => {
        if (group.length > 1) {
          const mostRecentPoc = group.reduce((latest, currentPoc) => {
            return new Date(latest.created_at) > new Date(currentPoc.created_at)
              ? latest
              : currentPoc;
          });

          console.log('ultima poc ', mostRecentPoc);

          if (mostRecentPoc.Movement !== "Saída") {
            count += mostRecentPoc.BatchId;
          }
        }
      });
    };

    checkPOCs(data);
    setWipCount(count);
  }, [data]);

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
              {process.map((process, index) => (
                <tr key={index}>
                  <td className={styles.firstTd}>
                    <div className={styles.tdText}>{process.Name} {process.id}</div>
                  </td>
                  <td>WIPcount: {wipCount}</td>
                </tr>
              ))}
              <tr>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default TabelaRelatorio;
