import * as xlsx from "xlsx";
import { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import Loading from "../../components/Loading/Loading";
import CardGraph from "../../components/CardGraph/CardGraph";
import LancamentoCard from "../../components/LancamentoCard/LancamentoCard";
import TabelaRelatorio from "../../components/TabelaRelatorio/TabelaRelatorio";

import { apiUrl } from "../../Api/apiUrl";
import { useLoading } from "../../contexts/LoadingContext";

import styles from "./Relatorios.module.css";


function RelatoriosPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
          const loadedWorkbook = xlsx.read(data, { type: "array" });
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
      xlsx.utils.sheet_add_aoa(ws, [
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
      ]);

      data.forEach((info) => {
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
      });

      const wbout = xlsx.write(workbook, { bookType: "xlsx", type: "binary" });
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "POC Cicle.xlsx"
      );

      alert("Dados salvos no arquivo");
    } else {
      console.log("Por favor, selecione um arquivo Excel antes de salvar.");
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

  return (
    <>
      {isLoading && <Loading />}
      <Container style={{ marginBottom: "1em" }}>
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
            <Row>
              <Col>
                <Input
                  name="Process"
                  type="number"
                  placeholder="Processo"
                  onChange={(e) => {
                    handleFilterChange(e);
                  }}
                />
              </Col>
              <Col>
                <Input
                  name="WIP"
                  type="number"
                  placeholder="WIP"
                  onChange={(e) => {
                    handleFilterChange(e);
                  }}
                />
              </Col>
              <Col>
                <Button
                  style={styles.btn}
                  text={"Importar Excel"}
                  onClick={createFileInput}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "1em" }}>
              <Col>
                <TabelaRelatorio fields={fields} data={data} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="graficos" title="Gráficos" className={styles.tab}>
            <Col>
              <CardGraph data={data} />
            </Col>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default RelatoriosPage;
