/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";

import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";
import Tabela from "../Tabela/Tabela";
import ModalComponent from "../Modal/ModalComponent";

import styles from "./Homeform.module.css";
import trash from "../../assets/Img/trash.png";

import { apiUrl } from "../../Api/apiUrl";
import cryptoService from "../../service/cryptoService";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "../../contexts/LoadingContext";
import Loading from "../Loading/Loading";

function HomeForm({ title, fields }) {
  const [data, setData] = useState([]);
  const [optionsProcesso, setOptionsProcesso] = useState([]);
  const [optionsPartNumber, setOptionsPartNumber] = useState([]);

  const [hasLoaded, setHasLoaded] = useState(false);
  localStorage.setItem("hasLoaded", false);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();
  const [modalFunc2, setModalFunc2] = useState();

  const [workbook, setWorkbook] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const optionsInterditado = ["Sim", "Não"];
  const optionsMovimentacao = ["Entrada", "Saída"];

  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();

    getUser();
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    Promise.all([
      apiUrl.get("process/get").then((response) => {
        const listOptionsProcesso = response.data.map((resp) => resp);
        setOptionsProcesso(listOptionsProcesso);
      }),
      apiUrl.get("partnr/get").then((response) => {
        const listOptionsPartNumber = response.data.map((resp) => resp);
        setOptionsPartNumber(listOptionsPartNumber);
      }),
    ])
      .then(() => {
        stopLoading();
      })
      .catch((error) => {
        console.log("Erro ao buscar dados: ", error);
        stopLoading();
      });
  }, []);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (hasReloaded === "false" || hasReloaded === null) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  function getUser() {
    let userEmail = sessionStorage.getItem("email");

    if (!userEmail) return;

    const user = jwtDecode(sessionStorage.getItem("token"));

    if (!user) return;

    localStorage.setItem("EDV", user.EDV);
    setHasLoaded(true);
  }

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
    const selectedLancamentos = JSON.parse(
      localStorage.getItem("selectedItems")
    );

    const updatedData = currData.filter(
      (item) =>
        !selectedLancamentos.some(
          (selected) => JSON.stringify(selected) === JSON.stringify(item)
        )
    );

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
          setModalData({
            title: "Sucesso",
            text: "Os lançamentos foram salvos na nuvem.",
            btnCancel: "Fechar",
          });
          setShowModal(true);
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
  }

  function loadExcelFile(event) {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (!file) {
        reject("Nenhum arquivo selecionado.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const loadedWorkbook = xlsx.read(data, { type: "array" });
          setWorkbook(loadedWorkbook);
          resolve(loadedWorkbook);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  async function saveExcelFile(workbook) {
    let data = getData();

    if (workbook) {
      const ws = workbook.Sheets[workbook.SheetNames[0]];

      const existingData = xlsx.utils.sheet_to_json(ws, { header: 1 });

      const existingRecords = new Set(existingData.map((row) => row.join("|")));

      xlsx.utils.sheet_add_aoa(
        ws,
        [
          [
            "Processo",
            "Quantidade Lote",
            "ID Lote",
            "Partnumber",
            "Movimentação",
            "Data",
            "Hora",
            "EDV Operador",
            "Quantidade de Refugo",
            "Interditado",
          ],
        ],
        { origin: 0 }
      );

      data.forEach((info) => {
        const recordString = [
          info.ProcessName,
          info.BatchQnt,
          info.BatchId,
          info.PartNumber,
          info.Movement,
          info.Data,
          info.Hora,
          info.OperatorEDV,
          info.ScrapQnt,
          info.Interditated === true ? "Sim" : "Não",
        ].join("|");

        if (!existingRecords.has(recordString)) {
          xlsx.utils.sheet_add_aoa(
            ws,
            [
              [
                info.ProcessName,
                info.BatchQnt,
                info.BatchId,
                info.PartNumber,
                info.Movement,
                info.Data,
                info.Hora,
                info.OperatorEDV,
                info.ScrapQnt,
                info.Interditated === true ? "Sim" : "Não",
              ],
            ],
            { origin: -1 }
          );
          existingRecords.add(recordString);
        }
      });

      const wbout = xlsx.write(workbook, { bookType: "xlsx", type: "binary" });
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "POC Cicle.xlsx"
      );

      setModalData({
        title: "Sucesso.",
        text: "Os arquivos foram salvos no Excel.",
        btnCancel: "Fechar",
      });
      setShowModal(true);
    } else {
      setModalData({
        title: "Erro.",
        text: "Selecione um arquivo Excel para salvar os dados.",
        btnCancel: "Fechar",
      });
    }
  }

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  async function createFileInput() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls";
    input.style = "display: none";

    input.onchange = async (event) => {
      try {
        const workbook = await loadExcelFile(event);
        saveExcelFile(workbook);
      } catch (error) {
        alert("Houve um problema ao salvar: " + error.message);
      }

      document.body.removeChild(input);
    };

    document.body.appendChild(input);

    input.click();
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
    setModalFunc2(() => createFileInput);
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

    if (field.label == "Movimentação") {
      return (
        <Input {...commonProps} select={true} options={optionsMovimentacao} />
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

    if (field.label === "EDV") {
      if (!hasLoaded) {
        getUser();
      }
      return (
        <Input
          {...commonProps}
          defaultValue={localStorage.getItem("EDV") || ""}
          disabled={!!localStorage.getItem("EDV")}
        />
      );
    }

    return <Input {...commonProps} />;
  };

  return (
    <Container className={styles.container}>
      {isLoading && <Loading />}
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
