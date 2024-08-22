/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./Tabela.module.css";
import { useEffect, useState } from "react";

function Tabela({ title, fields, data }) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedSelectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(savedSelectedItems);
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedSelectedItems = selectedItems.includes(index)
      ? selectedItems.filter((item) => item !== index)
      : [...selectedItems, index];

    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <div className={styles.tabela}>
        <Table striped bordered hover>
          <thead>
            <tr className={styles.header}>
              {fields.map((field, index) => {
                return <th key={index}>{field.label}</th>;
              })}
              <th>
                {" "}
                <i className="bi bi-trash-fill"></i>{" "}
              </th>
            </tr>
          </thead>
          <tbody className={styles.tabela} id="tableBody">
            {data.map((info, index) => {
              return (
                <tr key={index}>
                  <td className={styles.firstTd}>
                    <div className={styles.tdText}>{info.processo}</div>
                  </td>
                  <td>{info.idLote}</td>
                  <td>{info.qntdLote}</td>
                  <td>{info.qntdRefugo}</td>
                  <td>{info.partnumber}</td>
                  <td>{info.movimentacao}</td>
                  <td>{info.edv}</td>
                  <td>{info.interditado}</td>
                  <td>
                    <input
                      type="checkbox"
                      className={styles.input}
                      onChange={() => handleCheckboxChange(info)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Tabela;
