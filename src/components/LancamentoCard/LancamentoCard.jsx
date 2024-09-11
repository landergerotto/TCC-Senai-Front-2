/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

import { apiUrl } from "../../Api/apiUrl";

import styles from "./LancamentoCard.module.css";

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

  return (
    <div className={styles.cardBg}>
        <p>Processo: {processName[item.ProcessId]}</p>
        <p>Id Lote: {item.BatchId}</p>
        <p>Quantidade Lote: {item.BatchQnt}</p>
        <p>Quantidade Refugo: {item.ScrapQnt}</p>
        <p>PartNumber: {item.PartNumber}</p>
        <p>Movimentação: {item.Movement}</p>
        <p>EDV Operador: {item.EDV}</p>
        <p>Interditado: {item.Interditated == true ? "Sim" : "Não"}</p>
    </div>
  );
}

export default LancamentoCard;
