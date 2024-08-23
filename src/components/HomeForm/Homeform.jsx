/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";
import Tabela from "../Tabela/Tabela";
import ModalComponent from "../Modal/ModalComponent";

import styles from "./Homeform.module.css";
import trash from "../../assets/Img/trash.png";

import { apiUrl } from "../../Api/apiUrl";
function HomeForm({
  title,
  fields,
  actions = [],
  target,
  type,
  labelStyle,
  url,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [link, setLink] = useState(url);
  const [optionsProcesso, setOptionsProcesso] = useState([]);
  const [optionsPartNumber, setOptionsPartNumber] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();
  const [modalFunc2, setModalFunc2] = useState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const optionsInterditado = ["Sim", "Não"];

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    apiUrl
      .get("process/get")
      .then((response) => {
        const listOptions = [];
        response.data.map((resp) => {
          listOptions.push(resp.Name);
        });
        setOptionsProcesso(listOptions);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });

    apiUrl
      .get("partnr/get")
      .then((response) => {
        const listOptions = [];
        response.data.map((resp) => {
          listOptions.push(resp.PartNumber);
        });
        setOptionsPartNumber(listOptions);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  function getValue(id) {
    const element = document.getElementById(id);
    localStorage.setItem(`${id}`, element.value);
  }

  const clearInputs = () => {
    fields.map((field) => {
      localStorage.setItem(field.name, "");
      document.getElementById(field.id).value = "";
    });
    setShowModal(false);
    window.location.reload();
  };

  const clearAllLancamentos = () => {
    localStorage.setItem("data", "");
    setShowModal(false);
    window.location.reload();
  };

  const clearSelectedLancamentos = () => {
    const currData = JSON.parse(localStorage.getItem("data"));
    console.log("currData: ", currData);

    const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    console.log("selected: ", selectedItems);

    const selectedIds = selectedItems.map(item => item.idLote);

    const updatedData = currData.filter(
      (item) => !selectedIds.includes(item.idLote)
    );
    console.log("updated: ", updatedData);

    localStorage.setItem("data", JSON.stringify(updatedData));
    localStorage.setItem("selectedItems", "");
    localStorage.removeItem("selectedItems");

    setData(updatedData);
    setShowModal(false);
    window.location.reload();
};

  function sendForm() {
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    let informations = {};

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const info = localStorage.getItem(`${field.name}`);

      if (!info || info.trim().length < 1) {
        setModalData({
          title: "Erro",
          text: `É necessário preencher o campo ${field.label}`,
          btnCancel: "Fechar"
        });
        setShowModal(true);
        return;
      }
      informations[field.name] = info;
    }

    setData((prevData) => {
      const updatedData = Array.isArray(prevData) ? prevData : [];
      return [...updatedData, informations];
    });

    localStorage.setItem("data", JSON.stringify([...data, informations]));

    setModalData({
      title: "Confirmação",
      text: `${title} realizado com sucesso.`,
      btnCancel: "Fechar"
    });
    setShowModal(true);    
  }

  function confirmClear(option) {
    switch (option) {
      case "Campos":
        const allFieldsEmpty = fields.every((field) => {
          return document.getElementById(field.id).value.length < 1;
        });
        if (allFieldsEmpty) {
          setModalData({
            title: "Alerta",
            text: "Campos já estão vazios.",
            btnCancel: "Fechar"
          });
          setShowModal(true);    
          return;
        }
        setModalData({
          title: "Confirmação",
          image: <img src={trash} alt="Trash Icon" />,
          text: "Deseja limpar os Campos?",
          btnCancel: "Cancelar",
          btnConfirm: "Limpar",
        });
        setShowModal(true);
        setModalFunc(() => clearInputs);

        break;
      case "Lançamentos":
        if (!localStorage.getItem("data")) {
          setModalData({
            title: "Erro",
            text: 'Não há lançamentos disponíveis.',
            btnCancel: "Fechar"
          });
          setShowModal(true);
          return;
        }
        setModalData({
          title: "Confirmação",
          image: <img src={trash} alt="Trash Icon" />,
          text: "Quais Lançamentos deseja limpar?",
          btnCancel: "Cancelar",
          btnConfirm: "Todos",
          btnConfirm2: "Selecionados",
        });
        setShowModal(true);
        setModalFunc(() => clearAllLancamentos);
        setModalFunc2(() => clearSelectedLancamentos);
        break;
    }
  }

  const renderInput = (field) => {
    const commonProps = {
      label: field.label,
      type: field.type,
      name: field.name,
      id: field.name,
      onChange: () => getValue(field.name),
      style: { marginInline: "0.5em", width: "100%", marginBottom: "2em" },
      labelStyle: { fontWeight: "600", fontSize: "1.3em", marginLeft: "0.6em" },
    };

    if (field.label === "Processo") {
      return <Input {...commonProps} select={true} options={optionsProcesso} />;
    }

    if (field.label === "Interditado") {
      return (
        <Input {...commonProps} select={true} options={optionsInterditado} />
      );
    }

    if (field.label === "PartNumber") {
      return (
        <Input {...commonProps} select={true} options={optionsPartNumber} />
      );
    }

    return <Input {...commonProps} />;
  };

  return (
    <Container className={styles.container}>
      <Row>
        <div className={styles.inputs}>
          {fields.map((field, index) => {
            return (
              <Col lg={3} key={index} className={styles.center}>
                <div style={{ width: "85%" }}>{renderInput(field)}</div>
              </Col>
            );
          })}
        </div>
      </Row>
      <Row>
        <Tabela title={"Últimos Lançamentos"} fields={fields} data={data} />
      </Row>
      <Row>
        <Col className={styles.col}>
          <Button
            text={"Confirmar"}
            onClick={() => sendForm()}
            style={styles.btn}
          />
        </Col>
        <Col className={styles.col}>
          <Button
            text={"Limpar Campos"}
            onClick={() => confirmClear("Campos")}
            style={styles.btn}
          />
        </Col>
        <Col className={styles.col}>
          <Button
            text={"Limpar Lançamentos"}
            onClick={() => confirmClear("Lançamentos")}
            style={styles.btn}
          />
        </Col>
        <Col className={styles.col}>
          <Button
            text={"Salvar na Nuvem"}
            onClick={() => console.log("ta fazendo ainda calma")}
            style={styles.btn}
          />
        </Col>
      </Row>
      <ModalComponent
        isOpened={showModal}
        onClose={handleCloseModal}
        data={modalData}
        confirmOnClick={modalFunc}
        confirmOnClick2={modalFunc2}
      />
    </Container>
  );
}

export default HomeForm;
