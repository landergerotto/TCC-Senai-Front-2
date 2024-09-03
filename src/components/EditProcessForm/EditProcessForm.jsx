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
}) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [link, setLink] = useState(urlEdit);

  const [optionsProcesso, setOptionsProcesso] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    apiUrl
      .get("process/get")
      .then((response) => {
        const listOptions = [];
        response.data.map((resp) => {
          listOptions.push(resp);
        });
        setOptionsProcesso(listOptions);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  function getValue(id) {
    const element = document.getElementById(id);
    localStorage.setItem(`${id}`, element.value);
  }

  function sendForm() {
    let informations = {};

    for (let i = 0; i < fieldsEdit.length; i++) {
      const field = fieldsEdit[i];
      const info = localStorage.getItem(`${field.name}`);

      if (!info || info.trim().length < 1) {
        setModalData({
          title: "Erro",
          text: `É necessário preencher o campo ${field.label}`,
          btnCancel: "Fechar",
        });
        setShowModal(true);
        return;
      }
    }

    setData(informations);
    const EncryptedBody = cryptoService.encryptData(informations);

    console.log(EncryptedBody);
    console.log("data: ", cryptoService.decrypt(EncryptedBody));

    apiUrl
      .post(`/${link}`, { EncryptedBody: EncryptedBody })
      .then((response) => {
        console.log(response.data);
        setModalData({
          title: "Confirmação",
          text: `${title} realizado com sucesso`,
          btnConfirm: "Fechar",
        });
        setShowModal(true);
        setModalFunc(() => () => navigate(`/${target}`));
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

  const renderInput = (field) => {
    const commonProps = {
      label: field.label,
      type: field.type,
      name: field.name,
      id: field.name,
      onChange: () => getValue(field.name),
      style: { labelStyleEdit, bgStyleEdit },
    };

    if (field.label == "Nome") {
      const processoOptions = optionsProcesso.map((item) => item.Name);
      return <Input {...commonProps} select={true} options={processoOptions} />;
    }

    return <Input {...commonProps} />;
  };

  return (
    <Card className={styles.card}>
      <CardBody className={styles.cardBody}>
        <div className={styles.cardTitle}>
          <CardTitle className={styles.title}>{titleEdit}</CardTitle>
        </div>
        <div className={titleEdit == "Registro" ? styles.inputs : ""}>
          {fieldsEdit.map((field, index) => {
            return (
              <>
                <div>{renderInput(field)}</div>
              </>
            );
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
                  style={{ marginTop: "1em" }}
                  onClick={() => navigate("/")}
                />
              );
            } else {
              return (
                <Button
                  key={index}
                  text={action.label}
                  style={{ marginTop: "1em" }}
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
