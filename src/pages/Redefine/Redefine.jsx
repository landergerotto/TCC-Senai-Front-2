import styles from "./Redefine.module.css";

import Formulario from "../../components/Formulario/formulario";

import { Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RedefinePage() {
  const navigate = useNavigate();

  const fields = [
    { label: "Senha", type: "password", name: "password" },
    {
      label: "Confirmar Nova Senha",
      type: "password",
      name: "confirmPassword",
    },
  ];

  const actions = [
    { label: "Redefinir", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];

  return (
    <Container className={styles.container}>
      <Col lg={6}>
        <Formulario
          title={"Redefinir Senha"}
          fields={fields}
          actions={actions}
          navigate={navigate}
          url={"auth/email"}
        />
      </Col>
    </Container>
  );
}

export default RedefinePage;
