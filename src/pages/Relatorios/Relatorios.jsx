/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import Input from "../../components/Input/input";
import Loading from "../../components/Loading/Loading";
import CardGraph from "../../components/CardGraph/CardGraph";
import LancamentoCard from "../../components/LancamentoCard/LancamentoCard";

import { apiUrl } from "../../Api/apiUrl";
import { useLoading } from "../../contexts/LoadingContext";

import styles from "./Relatorios.module.css";
import TabelaRelatorio from "../../components/TabelaRelatorio/TabelaRelatorio";

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
            <Col>
              <TabelaRelatorio fields={fields} data={data} />
            </Col>
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
