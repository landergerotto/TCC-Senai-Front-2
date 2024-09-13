/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { colors } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Formulario from "../Formulario/formulario";

import { apiUrl } from "../../Api/apiUrl";

import styles from "./LancamentoCard.module.css";
import ModalComponent from "../Modal/ModalComponent";

function LancamentoCard({ item }) {
  const [processName, setProcessName] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();
  const [modalFunc2, setModalFunc2] = useState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fields = [
    { label: "Processo", type: "text", name: "ProcessName", id: "ProcessName" },
    { label: "ID Lote", type: "number", name: "BatchId", id: "BatchId" },
    { label: "Qntd Lote", type: "number", name: "BatchQnt", id: "BatchQnt" },
    {
      label: "Qntd de Refugo",
      type: "number",
      name: "ScrapQnt",
      id: "ScrapQnt",
    },
    { label: "PartNumber", type: "text", name: "PartNumber", id: "PartNumber" },
    { label: "Movimentação", type: "text", name: "Movement", id: "Movement" },
    { label: "EDV", type: "text", name: "EDV", id: "EDV" },
    {
      label: "Interditado",
      type: "text",
      name: "Interditated",
      id: "Interditated",
    },
  ];

  useEffect(() => {
    fields.map((field) => {
      localStorage.removeItem(`${field.id}`);
    });
  }, []);

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

    fields;
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

  function handleEdit() {
    fields.map((field) => {
      if (field.id == "ProcessName") localStorage.setItem(field.id, processName[item.ProcessId]);
      if (item.hasOwnProperty(field.id))
        localStorage.setItem(field.id, item[field.id]);
    });
    setModalData({
      title: "Atualizar",
      text: updateForm(),
      btnConfirm: "Atualizar",
      btnCancel: "Fechar",
    });
    setShowModal(true);
  }

  function updateForm() {
    return (
      <Formulario
        fields={fields}
        labelStyle={{ textAlign: "left", fontSize: "1em", marginTop: "0.5em" }}
      />
    );
  }

  return (
    <>
      <div className={styles.cardBg} id={`poc_${item.id}`}>
        <div className={styles.cardTitle}>
          <div className={styles.btnEdit} onClick={() => handleEdit()}>
            <EditIcon sx={{ color: "white" }} />
          </div>
          <div className={styles.processName}>
            {processName[item.ProcessId]}
          </div>
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
        <div className={styles.cardText}>
          Quantidade Refugo: {item.ScrapQnt}
        </div>
        <div className={styles.cardText}>Movimentação: {item.Movement}</div>
        <div className={styles.cardText}>
          Interditado: {item.Interditated == true ? "Sim" : "Não"}
        </div>
        <div className={styles.cardText}>EDV Operador: {item.EDV}</div>
      </div>
      <ModalComponent
        isOpened={showModal}
        onClose={handleCloseModal}
        data={modalData}
        confirmOnClick={modalFunc}
        confirmOnClick2={modalFunc2}
      />
    </>
  );
}

export default LancamentoCard;
