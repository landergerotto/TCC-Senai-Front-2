/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, CardTitle } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";
import ModalComponent from "../Modal/ModalComponent";

import styles from "./EditProcessForm.module.css";
import { apiUrl } from "../../Api/apiUrl";

import cryptoService from "../../service/cryptoService";

function EditProcessForm({
  titleEdit,
  fieldsEdit,
  actionsEdit = [],
  labelStyleEdit,
  urlEdit,
  bgStyleEdit,
  targetEdit,
  btnStyle,
  inputFieldStyle,
  cardStyle
}) {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [optionsProcesso, setOptionsProcesso] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const optionsInterditado = ["Sim", "Não"];

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    apiUrl
      .get(`${urlEdit}/get`)
      .then((response) => {
        const listOptions = [];
        response.data.map((resp) => {
          listOptions.push(resp);
        });
        setOptionsProcesso(listOptions);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  function sendForm() {
    let informations = {};

    informations["id"] = localStorage.getItem("id");
    const ProcessId = localStorage.getItem("ProcessId");

    if (ProcessId) informations["ProcessId"] = ProcessId;

    for (let i = 0; i < fieldsEdit.length; i++) {
      const field = fieldsEdit[i];
      let info = localStorage.getItem(`${field.name}`);

      if (!info || info.trim().length < 1) {
        setModalData({
          title: "Erro",
          text: `É necessário preencher o campo ${field.label}`,
          btnCancel: "Fechar",
        });
        setShowModal(true);
        return;
      }
      if ((field.id == "Interditated")) {
        info = info === "Sim" ? true : false;
        informations[field.name] = info;
      }
      else informations[field.name] = info;
    }
    const EncryptedBody = cryptoService.encryptData(informations);

    apiUrl
      .put(`${urlEdit}/put`, { EncryptedBody: EncryptedBody })
      .then((response) => {
        setModalData({
          title: "Confirmação",
          text: "Processo atualizado com sucesso.",
          btnConfirm: "Fechar",
        });
        setShowModal(true);
        setModalFunc(() => () => {
          setShowModal(false);
        });
      })
      .catch((error) => {
        console.error("Houve um erro na requisição:", error);
        setModalData({
          title: "Erro",
          text: "Ouve um erro com a requisição, tente novamente",
          btnCancel: "Fechar",
        });
        setShowModal(true);
      });
  }

  async function getProcessById(id) {
    try {
      const response = await apiUrl.get(`/process/get/${id}`);
      let informations = response.data;
      for (const key in informations) {
        if (informations.hasOwnProperty(key)) {
          const value = informations[key];
          localStorage.setItem(`${key}`, value);
        }
      }
    } catch (error) {
      console.error("Algo deu errado na sua requisição: ", error);
    }
  }

  const renderInput = (field) => {
    const storedValue = localStorage.getItem(field.name) || "";
    const commonProps = {
      label: field.label,
      type: field.type,
      name: field.name,
      id: field.name,
      onChange: (event) => handleProcessChange(event),
      labelStyle: labelStyleEdit,
      style: inputFieldStyle,
      value: inputValue,
    };

    if (field.label === "Nome") {
      return (
        <Input
          {...commonProps}
          select={true}
          options={optionsProcesso.map((item) => item.Name)}
          value={storedValue}
          style={inputFieldStyle}
        />
      );
    }

    if (field.label === "Interditado") {
      return (
        <Input {...commonProps} select={true} options={optionsInterditado} style={inputFieldStyle} />
      );
    }

    if (field.label == "Processo") {
      return (
        <Input {...commonProps} disabled={"disabled"} style={inputFieldStyle}/>
      );
    }

    return <Input {...commonProps} />;
  };

  async function handleProcessChange(event) {
    const selectedName = event.target.value;
    const selectedProcess = optionsProcesso.find(
      (item) => item.Name === selectedName
    );

    if (selectedProcess) {
      localStorage.setItem("Nome", selectedProcess.Name);
      localStorage.setItem("NomeId", selectedProcess.id);
      await getProcessById(selectedProcess.id);
      window.location.reload();
      localStorage.setItem("tab", "editar");
    }
  }

  return (
    <Card className={styles.card} style={cardStyle}>
      <CardBody className={styles.cardBody}>
        <div className={styles.cardTitle}>
          <CardTitle className={styles.title}>{titleEdit}</CardTitle>
        </div>
        <div className={titleEdit == "Registro" ? styles.inputs : ""}>
          {fieldsEdit.map((field, index) => {
            return <div key={index}>{renderInput(field)}</div>;
          })}
        </div>
        <div className={styles.btn}>
          {actionsEdit.map((action, index) => {
            if (action.label === "Cancelar") {
              return (
                <Button
                  key={index}
                  text={action.label}
                  type={action.type}
                  style={btnStyle}
                  onClick={() => navigate("/")}
                />
              );
            } else {
              return (
                <Button
                  key={index}
                  text={action.label}
                  style={btnStyle}
                  onClick={sendForm}
                />
              );
            }
          })}
        </div>
      </CardBody>
      <ModalComponent
        isOpened={showModal}
        onClose={handleCloseModal}
        data={modalData}
        confirmOnClick={modalFunc}
      />
    </Card>
  );
}

export default EditProcessForm;
