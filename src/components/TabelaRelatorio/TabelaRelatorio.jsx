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
  const { isLoading, startLoading, stopLoading } = useLoading();

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
      return uniqueProcess;
    };

    const fetchPOCs = async () => {
      try {
        const response = await apiUrl.get('/poc/get');
        console.log(response);
        return response;
      } catch (error) {
        console.error('Deu errado ai: ', error);
      }
    };
    Promise.all([fetchProcessNames(), fetchPOCs()])
      .then(([processNamesResult, pocsResult]) => {
        setProcess(processNamesResult);
        console.log(pocsResult);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados: ", error);
      })
      .finally(() => {
        stopLoading();
      });

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
                    <div className={styles.tdText}>{process.Name}</div>
                  </td>
                  <td>{process.id}</td>
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
