import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

import CardGraph from "../../components/CardGraph/CardGraph";

import { apiUrl } from "../../Api/apiUrl";

function RelatoriosPage() {
  const [data, setData] = useState({});

  const card1Data = {
    label: "Total de Peças",
    value: "100",
  };

  const card2Data = {
    label: "Peças em Refugo",
    value: "2",
  };

  const card3Data = {
    label: "Tempo Total Parado",
    value: "1",
  };

  useEffect(() => {
    apiUrl
      .get("poc/get")
      .then((response) => {
        console.log("response: ", response.data);
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
          <Col>
            <CardGraph data={card1Data} />
          </Col>
          <Col>
            <CardGraph data={card2Data} />
          </Col>
          <Col>
            <CardGraph data={card3Data} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RelatoriosPage;
