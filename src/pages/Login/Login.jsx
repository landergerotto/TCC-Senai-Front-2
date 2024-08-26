import styles from "./Login.module.css";

import { Container, Col } from "react-bootstrap";

import Formulario from "../../components/Formulario/formulario";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  var recuperaSenha = () => navigate("/recupera");

  var underTextStyle = {
    marginLeft: "0.25em",
    marginTop: "0.15em",
    color: "#007BC0",
    cursor: "pointer",
    width: "fit-content"
  };

  const fields = [
    { label: "Email", type: "email", name: "email" },
    {
      label: "Senha",
      type: "password",
      name: "password",
      underText: "Esqueceu sua senha?",
      underTextAction: recuperaSenha,
      underTextStyle: underTextStyle,
    },
  ];

  const actions = [
    { label: "Entrar", type: "normal" },
    { label: "Registrar-se", type: "cancel" },
    { label: "Cancelar", type: "cancel" },
  ];

  return (
    <Container className={styles.container}>
      <Col lg={6}>
        <Formulario
          title={"Login"}
          fields={fields}
          actions={actions}
          target={""}
          navigate={navigate}
          labelStyle={{ marginTop: "0.5em" }}
          url={"auth/login"}
        />
      </Col>
    </Container>
  );
}

export default LoginPage;
