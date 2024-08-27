/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./Tabela.module.css";
import { useState } from "react";

function Tabela({ title, fields, data }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (index) => {
    const updatedSelectedItems = selectedItems.includes(index)
      ? selectedItems.filter((item) => item !== index)
      : [...selectedItems, index];

    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
  };

  const formatInterditated = (value) => (value ? "Sim" : "Não");

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
                  <div className={styles.tdText}>{info.ProcessName}</div>
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
