/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as xlsx from "xlsx";

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
import cryptoService from "../../service/cryptoService";

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
          listOptions.push(resp);
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
          listOptions.push(resp);
        });
        setOptionsPartNumber(listOptions);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  function getValue(id) {
    const element = document.getElementById(id);
    const value = element.value;

    if (id == "ProcessName") {
      const selectedProcesso = optionsProcesso.find(
        (processo) => processo.Name === value
      );

      if (selectedProcesso) {
        localStorage.setItem("ProcessId", selectedProcesso.id);
      }
    }

    localStorage.setItem(`${id}`, value);
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

    const selectedIds = selectedItems.map((item) => item.BatchId);

    const updatedData = currData.filter(
      (item) => !selectedIds.includes(item.BatchId)
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

      if (field.name === "ProcessName") {
        const selectedProcessId = localStorage.getItem("ProcessId");
        if (selectedProcessId) informations["ProcessId"] = selectedProcessId;
      }
      if (field.name === "Interditated")
        informations[field.name] = info === "Sim" ? true : false;
      else informations[field.name] = info;
    }

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString("pt-BR");
    const time = currentDate.toLocaleTimeString("pt-BR");

    informations["Data"] = date;
    informations["Hora"] = time;

    setData((prevData) => {
      const updatedData = Array.isArray(prevData) ? prevData : [];
      return [...updatedData, informations];
    });

    localStorage.setItem("data", JSON.stringify([...data, informations]));

    setModalData({
      title: "Confirmação",
      text: `${title} realizado com sucesso.`,
      btnCancel: "Fechar",
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
            btnCancel: "Fechar",
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
            text: "Não há lançamentos disponíveis.",
            btnCancel: "Fechar",
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

  function getData() {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    console.log("227 - data: ", data);

    if (!data) {
      setModalData({
        title: "Erro",
        text: "Não há lançamentos disponíveis.",
        btnCancel: "Fechar",
      });
      setShowModal(true);
      return;
    }

    return data;
  }

  function saveOnCloud() {
    let data = getData();

    data.forEach((poc) => {
      const encryptedBody = cryptoService.encryptData(poc);
      apiUrl
        .post("poc/create", { EncryptedBody: encryptedBody })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          setModalData({
            title: "Erro",
            text: "Houve um erro com a sua solicitação.",
            btnCancel: "Fechar",
          });
          setShowModal(true);
          console.log("Erro ao salvar os dados: ", error);
          return;
        });
    });
    setModalData({
      title: "Sucesso",
      text: "Os lançamentos foram salvos na nuvem.",
      btnCancel: "Fechar",
    });
    setShowModal(true);
  }

  function saveOnExcel() {
    let data = getData();
    console.log("273 - data: ", data);

    let settings = {
      fileName: "POC Cicle.xlsx",
      extraLength: 5,
      writeMode: "writeFile",
      writeOptions: {},
    };

    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = xlsx.read(e.target.result, { type: "binary" });
      const worksheet =
        workbook.Sheets["Lançamentos"] || xlsx.utils.json_to_sheet([]);
    };

    let sheetData = [
      {
        sheet: "Lançamentos",
        columns: [
          {
            label: "Processo",
            value: "Processo",
          },
          {
            label: "ID_Lote",
            value: "ID_Lote",
          },
          {
            label: "Quantidade_Lote",
            value: "Quantidade_Lote",
          },
          {
            label: "Quantidade_Refugo",
            value: "Quantidade_Refugo",
          },
          {
            label: "PartNumber",
            value: "PartNumber",
          },
          {
            label: "Movimentação",
            value: "Movimentação",
          },
          {
            label: "EDV_Operador",
            value: "EDV_Operador",
          },
          {
            label: "Interditado",
            value: "Interditado",
          },
        ],
        content: [
          ...data.map((item) => ({
            Processo: item.ProcessName,
            ID_Lote: item.BatchId,
            Quantidade_Lote: item.BatchQnt,
            Quantidade_Refugo: item.ScrapQnt,
            PartNumber: item.PartNumber,
            Movimentação: item.Movement,
            EDV_Operador: item.OperatorEDV,
            Interditado: item.Interditated == true ? "Sim" : "Não",
          })),
        ],
      },
    ];

    xlsx(sheetData, settings);
  }

  function saveOnExcel() {
    let data = getData();
    console.log("273 - data: ", data);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      let settings = {
        fileName: "POC Cicle.xlsx",
      };

      const reader = new FileReader();

      reader.onload = (e) => {
        const workbook = xlsx.read(e.target.result, { type: "binary" });

        const worksheet =
          workbook.Sheets["Lançamentos"] || xlsx.utils.json_to_sheet([]);

        let existingData = xlsx.utils.sheet_to_json(worksheet);

        const newData = data.map((item) => ({
          Processo: item.ProcessName,
          Quantidade_Lote: item.BatchQnt,
          ID_Lote: item.BatchId,
          PartNumber: item.PartNumber,
          Movimentação: item.Movement,
          Data: item.Data,
          Hora: item.Hora,
          EDV_Operador: item.OperatorEDV,
          Quantidade_Refugo: item.ScrapQnt,
          Interditado: item.Interditated === true ? "Sim" : "Não",
        }));

        existingData = existingData.concat(newData);

        const newWorksheet = xlsx.utils.json_to_sheet(existingData);
        workbook.Sheets["Lançamentos"] = newWorksheet;

        const wbout = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "binary",
        });

        const blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = settings.fileName;
        a.click();

        window.URL.revokeObjectURL(url);
      };

      reader.readAsBinaryString(file);
    };

    input.click();
  }

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  const modalSave = () => {
    setModalData({
      title: "Confirmar",
      text: "Onde deseja salvar os lançamentos?",
      btnCancel: "Fechar",
      btnConfirm: "Nuvem",
      btnConfirm2: "Excel",
    });
    setModalFunc(() => saveOnCloud);
    setModalFunc2(() => saveOnExcel);
    setShowModal(true);
  };

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

    if (field.label == "Processo") {
      const processoOptions = optionsProcesso.map((item) => item.Name);
      return <Input {...commonProps} select={true} options={processoOptions} />;
    }

    if (field.label == "Interditado") {
      return (
        <Input {...commonProps} select={true} options={optionsInterditado} />
      );
    }

    if (field.label === "PartNumber") {
      const partnumberOptions = optionsPartNumber.map(
        (item) => item.PartNumber
      );
      return (
        <Input {...commonProps} select={true} options={partnumberOptions} />
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
            text={"Salvar"}
            onClick={() => modalSave()}
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
