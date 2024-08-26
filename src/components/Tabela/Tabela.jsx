/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./Tabela.module.css";
import { useEffect, useState } from "react";
import { apiUrl } from "../../Api/apiUrl";

function Tabela({ title, fields, data }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [processMap, setProcessMap] = useState(new Map());
  const [loading, setLoading] = useState(true); // Novo estado para controlar o carregamento

  useEffect(() => {
    apiUrl
      .get("process/get")
      .then((response) => {
        const listOptions = response.data;
        const map = new Map();
        listOptions.forEach((process) => {
          if (process.id && process.Name) map.set(process.id, process.Name);
        });
        setProcessMap(map);
        setLoading(false); // Atualize o estado de carregamento
        console.log("Process Map Updated: ", map);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
        setLoading(false); // Atualize o estado de carregamento em caso de erro
      });

    const savedSelectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(savedSelectedItems);
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedSelectedItems = selectedItems.includes(index)
      ? selectedItems.filter((item) => item !== index)
      : [...selectedItems, index];

    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
  };

  const formatInterditated = (value) => (value ? "Sim" : "Não");

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <div className={styles.tabela}>
        <Table striped bordered hover>
          <thead>
            <tr className={styles.header}>
              {fields.map((field, index) => (
                <th key={index}>{field.label}</th>
              ))}
              <th>
                {" "}
                <i className="bi bi-trash-fill"></i>{" "}
              </th>
            </tr>
          </thead>
          <tbody className={styles.tabela} id="tableBody">
            {data.map((info, index) => (
              <tr key={index}>
                <td className={styles.firstTd}>
                  <div className={styles.tdText}>
                    {processMap.get(info.ProcessId) || "Desconhecido"}
                  </div>
                </td>
                <td>{info.BatchId}</td>
                <td>{info.BatchQnt}</td>
                <td>{info.ScrapQnt}</td>
                <td>{info.PartNumber}</td>
                <td>{info.Movement}</td>
                <td>{info.OperatorEDV}</td>
                <td>{formatInterditated(info.Interditated)}</td>
                <td>
                  <input
                    type="checkbox"
                    className={styles.input}
                    onChange={() => handleCheckboxChange(info)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Tabela;