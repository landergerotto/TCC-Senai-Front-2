/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./Tabela.module.css";

function Tabela({ title, fields, data }) {
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
              <th>Status</th>
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
                    {info.status == "waiting" ? (
                      <button
                        className={styles.btnDelete}
                        onClick={() => console.log(info.status)}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    ) : (
                      <button
                        className={styles.btnConfirm}
                        onClick={() => console.log(info.status)}
                      >
                        <i className="bi bi-check"></i>
                      </button>
                    )}
                  </td>
                  <td>
                    <input type="checkbox" className={styles.input} />
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
