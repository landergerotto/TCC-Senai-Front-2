/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { apiUrl } from "../../Api/apiUrl";

import styles from "./LancamentoCard.module.css";
import { colors } from "@mui/material";

function LancamentoCard({ item }) {
  const [processName, setProcessName] = useState({});

  useEffect(() => {
    const fetchProcessName = async () => {
      const name = {};
      try {
        const response = await apiUrl.get(`/process/get/${item.ProcessId}`);
        name[item.ProcessId] = response.data.Name;
      } catch (error) {
        console.error("Erro ao buscar processo: ", error);
        name[item.ProcessId] = "Desconhecido";
      }
      setProcessName(name);
    };

    fetchProcessName();
  }, [item]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const date = formatDateTime(item.created_at);

  return (
    <div className={styles.cardBg}>
      <div className={styles.cardTitle}>
        <div className={styles.btnEdit}>
          <EditIcon sx={{ color: "white" }} />
        </div>
        <div className={styles.processName}>{processName[item.ProcessId]}</div>
        <div className={styles.btnDelete}>
          <DeleteIcon sx={{ color: "white" }} />
        </div>
      </div>
      <hr />
      <div className={styles.data}>
        <div className={styles.cardText}>{date}</div>
      </div>
      <div className={styles.cardText}>PartNumber: {item.PartNumber}</div>
      <div className={styles.cardText}>Id Lote: {item.BatchId}</div>
      <div className={styles.cardText}>Quantidade Lote: {item.BatchQnt}</div>
      <div className={styles.cardText}>Quantidade Refugo: {item.ScrapQnt}</div>
      <div className={styles.cardText}>Movimentação: {item.Movement}</div>
      <div className={styles.cardText}>
        Interditado: {item.Interditated == true ? "Sim" : "Não"}
      </div>
      <div className={styles.cardText}>EDV Operador: {item.EDV}</div>
    </div>
  );
}

export default LancamentoCard;
