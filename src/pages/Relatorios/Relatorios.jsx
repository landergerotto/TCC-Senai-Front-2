/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as xlsx from "xlsx";
import { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import Input from "../../components/Input/input";
import Loading from "../../components/Loading/Loading";
import CardGraph from "../../components/CardGraph/CardGraph";
import LancamentoCard from "../../components/LancamentoCard/LancamentoCard";
import TabelaRelatorio from "../../components/TabelaRelatorio/TabelaRelatorio";

import { apiUrl } from "../../Api/apiUrl";
import { useLoading } from "../../contexts/LoadingContext";

import styles from "./Relatorios.module.css";

import excel from "../../assets/Img/excel.png";
import Graph from "../../components/Graph/Graph";

function RelatoriosPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [labels, setLabels] = useState([]);
  const [uniqueProcesses, setUniqueProcesses] = useState([]);
  const [filters, setFilters] = useState({
    BatchId: "",
    created_at: "",
    PartNumber: "",
  });
  const { isLoading, startLoading, stopLoading } = useLoading();

  const fields = [
    { label: "Processo" },
    { label: "WIP" },
    { label: "Interditado" },
    { label: "Refugo" },
    { label: "Data" },
  ];

  let tab = localStorage.getItem("tab");
  if (tab == "" || !tab) tab = "pocs";

  useEffect(() => {
    startLoading();

    getProcesses();

    apiUrl
      .get("poc/get")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        stopLoading();
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
        stopLoading();
      });
  }, []);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesLote = filters.BatchId
        ? item.BatchId.includes(filters.BatchId)
        : true;
      const matchesData = filters.created_at
        ? item.created_at.slice(0, 10) === filters.created_at
        : true;
      const matchesPartnumber = filters.PartNumber
        ? item.PartNumber.includes(filters.PartNumber)
        : true;

      return matchesLote && matchesData && matchesPartnumber;
    });

    const sortedData = filtered.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setFilteredData(filtered);
  }, [filters, data]);

  function handleSelect(key) {
    switch (key) {
      case "pocs":
        localStorage.setItem("tab", "pocs");
        break;

      case "dados":
        localStorage.setItem("tab", "dados");
        break;

      case "graficos":
        localStorage.setItem("tab", "graficos");
        break;
    }
  }

  async function loadExcelFile(event) {
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
          const workbook = xlsx.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = xlsx.utils.sheet_to_json(worksheet);

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  function getProcesses() {
    apiUrl
      .get("/process/get")
      .then((response) => {
        setProcesses(response.data);
      })
      .catch((error) => {
        console.error("Deu errado ai brother: ", error);
      });
  }

  async function handleImportExcel() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls";
    input.style = "display: none";

    input.onchange = async (event) => {
      try {
        const excelData = await loadExcelFile(event);

        const formattedData = excelData.map((row) => {
          const matchedProcess = processes.find(
            (process) => process.Name === row.Processo
          );

          const data = row.Data
            ? row.Data.split("/").reverse().join("-")
            : null;
          const hora = row.Hora ? row.Hora : "00:00:00";

          let createdAt = null;

          if (data) createdAt = new Date(`${data}T${hora}`);

          return {
            ProcessId: matchedProcess ? matchedProcess.id : null,
            BatchQnt: row["Quantidade Lote"],
            BatchId: row["ID Lote"],
            PartNumber: row.Partnumber,
            Movement: row.Movimentação,
            created_at: createdAt ? createdAt.toISOString() : null,
            OperatorEDV: row["EDV Operador"],
            ScrapQnt: row["Quantidade de Refugo"],
            Interditated: row.Interditado === "Sim",
          };
        });

        setData(formattedData);
        setFilteredData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Erro ao importar o arquivo Excel: ", error);
      }
    };

    document.body.appendChild(input);
    input.click();
  }

  useEffect(() => {
    startLoading();

    const fetchProcessNames = async () => {
      const uniqueProcess = [];

      for (const item of data) {
        try {
          const response = await apiUrl.get(`/process/get/${item.ProcessId}`);

          const exists = uniqueProcess.find(
            (process) => process.id === response.data.id
          );

          if (!exists) {
            uniqueProcess.push(response.data);
          }
        } catch (error) {
          console.error("Erro ao buscar processo: ", error);
        }
      }
      setLabels(uniqueProcess);
      setUniqueProcesses(uniqueProcess);
      stopLoading();
    };

    fetchProcessNames();
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}
      <Row>
        <Container className={styles.containerFlex}>
          <div className={styles.tooltip}>
            <img
              src={excel}
              className={styles.excelIcon}
              onClick={handleImportExcel}
            ></img>
            <span className={styles.tooltiptext}>Importar arquivo Excel</span>
          </div>
        </Container>
      </Row>
      <Row>
        <Container className={styles.container}>
          <Tabs
            defaultActiveKey={`${tab}`}
            id="justify-tab-example"
            justify
            onSelect={(eventKey) => handleSelect(eventKey)}
          >
            <Tab eventKey="pocs" title="Relatório" className={styles.tab}>
              <Row className={styles.center}>
                <Col className={styles.colCenter}>
                  <Input
                    name="BatchId"
                    type="number"
                    placeholder="Lote"
                    onChange={(e) => {
                      handleFilterChange(e);
                    }}
                  />
                </Col>
                <Col className={styles.colCenter}>
                  <Input
                    name="created_at"
                    type="date"
                    onChange={(e) => {
                      handleFilterChange(e);
                    }}
                  />
                </Col>
                <Col className={styles.colCenter}>
                  <Input
                    name="PartNumber"
                    type="text"
                    placeholder="Partnumber"
                    onChange={(e) => {
                      handleFilterChange(e);
                    }}
                  />
                </Col>
              </Row>
              <Row className={styles.center}>
                {filteredData.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      sm={10}
                      md={4}
                      style={{ marginBottom: "1.5em" }}
                    >
                      <LancamentoCard item={item} />
                    </Col>
                  );
                })}
              </Row>
            </Tab>
            <Tab eventKey="dados" title="WIP" className={styles.tab}>
              <Row style={{ marginTop: "1em" }}>
                <Col>
                  <TabelaRelatorio fields={fields} data={data} />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="graficos" title="Gráficos" className={styles.tab}>
              {!isLoading && filteredData.length > 0 ? (
                <Col>
                  <Row>
                    <h3>Peças por Processo</h3>
                  </Row>
                  <Row>
                    <Graph batchData={data} processList={uniqueProcesses} />
                  </Row>
                  <Row>
                    <h3>Tempo Médio por Operação</h3>
                  </Row>
                  <Row>
                    <Graph batchData={data} processList={uniqueProcesses} />
                  </Row>
                  <Row>
                    <h3>Total de peças nos últimos 30 dias</h3>
                  </Row>
                  <Row>
                    <Graph batchData={data} processList={uniqueProcesses} />
                  </Row>
                </Col>
              ) : (
                <></>
              )}
            </Tab>
          </Tabs>
        </Container>
      </Row>
    </>
  );
}

export default RelatoriosPage;
