import { useEffect, useState } from "react";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import CardGraph from "../../components/CardGraph/CardGraph";
import LancamentoCard from "../../components/LancamentoCard/LancamentoCard";

import { apiUrl } from "../../Api/apiUrl";

import styles from "./Relatorios.module.css";
import Input from "../../components/Input/input";

function RelatoriosPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    BatchId: "",
    created_at: "",
    PartNumber: "",
  });

  let tab = localStorage.getItem("tab");

  if (tab == "" || !tab) tab = "pocs";

  useEffect(() => {
    apiUrl
      .get("poc/get")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
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

      case "editar":
        localStorage.setItem("tab", "dados");
        console.log(tab);
        break;

      case "excluir":
        localStorage.setItem("tab", "graficos");
        console.log(tab);
        break;
    }
  }

  return (
    <>
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
                    console.log("filterLote: ", e.target.value);
                    handleFilterChange(e);
                  }}
                />
              </Col>
              <Col className={styles.colCenter}>
                <Input
                  name="created_at"
                  type="date"
                  onChange={(e) => {
                    console.log("filterData: ", e.target.value);
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
                    console.log("filterPartnumber: ", e.target.value);
                    handleFilterChange(e);
                  }}
                />
              </Col>
            </Row>
            <Row className={styles.center}>
              {filteredData.map((item, index) => {
                console.log("filteredData: ", filteredData);
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
          <Tab eventKey="dados" title="Dados" className={styles.tab}>
            <Col>
              <CardGraph data={data} />
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
