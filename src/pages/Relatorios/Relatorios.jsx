import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

import CardGraph from "../../components/CardGraph/CardGraph";

import { apiUrl } from "../../Api/apiUrl";
import LancamentoCard from "../../components/LancamentoCard/LancamentoCard";

function RelatoriosPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiUrl
      .get("poc/get")
      .then((response) => {
        console.log("pocs: ", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          {data.map((item, index) => {
            console.log("item ", item);
            return (
              <Col key={index} sm={10} md={4} style={{marginBottom: '1.5em'}}>
                <LancamentoCard item={item} />
              </Col>
            );
          })}
          <Col>{/* <CardGraph data={card2Data} /> */}</Col>
          <Col>{/* <CardGraph data={card3Data} /> */}</Col>
        </Row>
      </Container>
    </>
  );
}

export default RelatoriosPage;
