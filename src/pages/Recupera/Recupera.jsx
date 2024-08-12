import styles from "./Recupera.module.css";

import { Container, Col } from "react-bootstrap";

import Formulario from "../../components/Formulario/formulario";

import { useNavigate } from "react-router-dom";

export function RecuperaPage() {
  const navigate = useNavigate();

  const fields = [
    {
      label: "EDV",
      type: "number",
      name: "EDV"
    },
    { label: "Email", type: "email", name: "Email" }
  ];

  const actions = [
    { label: "Enviar Código", type: "normal" },
    { label: "Cancelar", type: "cancel" }
  ];

  return (
    <Container className={styles.container}>
      <Col lg={6}>
        <Formulario
          title={"Recuperar Senha"}
          fields={fields}
          actions={actions}
          navigate={navigate}
          labelStyle={{ marginTop: "0.5em" }}
          url={"user/get"}
        />
      </Col>
    </Container>
  );
}
